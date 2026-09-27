"use server";
// Server Actions: funciones que corren en el servidor cuando se envía un formulario.

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  MAX_IMAGES_PER_QUESTION,
} from "@/lib/image-limits";

// Lo que la acción le devuelve al formulario cuando algo está mal.
export type FormState = { errors: string[] };

// Convierte un campo del formulario a texto sin espacios sobrantes.
function text(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

// Convierte un campo a número entero (o NaN si no es válido).
function int(value: FormDataEntryValue | null) {
  const s = text(value);
  return /^\d+$/.test(s) ? Number(s) : NaN;
}

export async function createSession(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const db = getDb();
  const errors: string[] = [];

  // 1. Leer los campos principales
  const date = text(formData.get("date"));
  const topicId = int(formData.get("topicId"));
  const subtopicRaw = text(formData.get("subtopicId"));
  const subtopicId = subtopicRaw === "" ? null : int(subtopicRaw);
  const numQuestions = int(formData.get("numQuestions"));
  const numCorrect = int(formData.get("numCorrect"));
  const notes = text(formData.get("notes")) || null;

  // 2. Leer las preguntas falladas. Cada campo viene repetido una vez por
  //    pregunta, en el mismo orden (getAll devuelve la lista completa).
  const texts = formData.getAll("missedQuestion").map(text);
  const myAnswers = formData.getAll("missedMyAnswer").map(text);
  const correctAnswers = formData.getAll("missedCorrect").map(text);
  const missedNotes = formData.getAll("missedNote").map(text);

  const missed = texts.map((questionText, i) => ({
    questionText,
    myAnswer: myAnswers[i] ?? "",
    correctAnswer: correctAnswers[i] ?? "",
    note: missedNotes[i] || null,
    // Fotos de la pregunta i (el formulario las envía como "missedImages-i")
    images: formData
      .getAll(`missedImages-${i}`)
      .filter((v): v is File => v instanceof File && v.size > 0),
  }));

  // 3. Validar
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) errors.push("La fecha no es válida.");

  const topic = db.prepare("SELECT id FROM topics WHERE id = ?").get(topicId);
  if (!topic) errors.push("Elige un tema.");

  if (subtopicId !== null) {
    const sub = db
      .prepare("SELECT id FROM subtopics WHERE id = ? AND topic_id = ?")
      .get(subtopicId, topicId);
    if (!sub) errors.push("El subtema no pertenece al tema elegido.");
  }

  if (!(numQuestions >= 1)) errors.push("El número de preguntas debe ser 1 o más.");
  if (!(numCorrect >= 0)) errors.push("El número de aciertos debe ser 0 o más.");
  if (numCorrect > numQuestions)
    errors.push("No puedes tener más aciertos que preguntas.");

  missed.forEach((q, i) => {
    const n = i + 1;
    if (!q.questionText && q.images.length === 0)
      errors.push(`Pregunta fallada ${n}: escribe el enunciado o agrega una foto.`);
    if (!q.myAnswer || !q.correctAnswer)
      errors.push(`Pregunta fallada ${n}: completa tu respuesta y la correcta.`);
    if (q.images.length > MAX_IMAGES_PER_QUESTION)
      errors.push(`Pregunta fallada ${n}: máximo ${MAX_IMAGES_PER_QUESTION} fotos.`);
    for (const img of q.images) {
      if (!ALLOWED_IMAGE_TYPES.includes(img.type))
        errors.push(`Pregunta fallada ${n}: formato de foto no permitido (${img.type || "desconocido"}).`);
      else if (img.size > MAX_IMAGE_BYTES)
        errors.push(`Pregunta fallada ${n}: una foto pesa más de 5 MB.`);
    }
  });
  const numWrong = numQuestions - numCorrect;
  if (numWrong >= 0 && missed.length > numWrong)
    errors.push(
      `Agregaste ${missed.length} preguntas falladas, pero según tus números fallaste ${numWrong}.`
    );

  if (errors.length > 0) return { errors };

  // 4. Leer los bytes de las fotos (esto es asíncrono, así que va antes de
  //    abrir la transacción).
  const imageBytes = await Promise.all(
    missed.map((q) =>
      Promise.all(q.images.map(async (img) => new Uint8Array(await img.arrayBuffer())))
    )
  );

  // 5. Guardar la sesión, sus preguntas falladas y sus fotos en una sola
  //    transacción (si algo falla, no se guarda nada a medias).
  db.exec("BEGIN");
  try {
    const result = db
      .prepare(
        `INSERT INTO sessions (date, topic_id, subtopic_id, num_questions, num_correct, notes)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .run(date, topicId, subtopicId, numQuestions, numCorrect, notes);
    const sessionId = Number(result.lastInsertRowid);

    const insertMissed = db.prepare(
      `INSERT INTO missed_questions (session_id, question_text, my_answer, correct_answer, note)
       VALUES (?, ?, ?, ?, ?)`
    );
    const insertImage = db.prepare(
      `INSERT INTO missed_question_images (missed_question_id, media_type, data)
       VALUES (?, ?, ?)`
    );
    missed.forEach((q, i) => {
      const r = insertMissed.run(sessionId, q.questionText, q.myAnswer, q.correctAnswer, q.note);
      const missedId = Number(r.lastInsertRowid);
      q.images.forEach((img, j) => insertImage.run(missedId, img.type, imageBytes[i][j]));
    });
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    console.error(error);
    return { errors: ["No se pudo guardar la sesión. Revisa la terminal."] };
  }

  // 6. Actualizar el dashboard y llevarme al historial de ese tema
  revalidatePath("/");
  revalidatePath("/sesiones");
  redirect(`/sesiones?tema=${topicId}&guardada=1`);
}

export async function deleteSession(formData: FormData) {
  const id = int(formData.get("sessionId"));
  if (Number.isNaN(id)) return;
  // ON DELETE CASCADE borra también sus preguntas falladas y sus fotos
  getDb().prepare("DELETE FROM sessions WHERE id = ?").run(id);
  revalidatePath("/");
  revalidatePath("/sesiones");
}
