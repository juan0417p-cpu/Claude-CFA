"use server";
// Server Actions: funciones que corren en el servidor cuando se envía un formulario.

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";

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
    if (!q.questionText || !q.myAnswer || !q.correctAnswer)
      errors.push(
        `Pregunta fallada ${i + 1}: completa enunciado, tu respuesta y la correcta.`
      );
  });
  const numWrong = numQuestions - numCorrect;
  if (numWrong >= 0 && missed.length > numWrong)
    errors.push(
      `Agregaste ${missed.length} preguntas falladas, pero según tus números fallaste ${numWrong}.`
    );

  if (errors.length > 0) return { errors };

  // 4. Guardar la sesión y sus preguntas falladas en una sola transacción
  //    (si algo falla, no se guarda nada a medias).
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
    for (const q of missed) {
      insertMissed.run(sessionId, q.questionText, q.myAnswer, q.correctAnswer, q.note);
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    console.error(error);
    return { errors: ["No se pudo guardar la sesión. Revisa la terminal."] };
  }

  // 5. Actualizar el dashboard y llevarme al historial de ese tema
  revalidatePath("/");
  revalidatePath("/sesiones");
  redirect(`/sesiones?tema=${topicId}&guardada=1`);
}

export async function deleteSession(formData: FormData) {
  const id = int(formData.get("sessionId"));
  if (Number.isNaN(id)) return;
  // ON DELETE CASCADE borra también sus preguntas falladas
  getDb().prepare("DELETE FROM sessions WHERE id = ?").run(id);
  revalidatePath("/");
  revalidatePath("/sesiones");
}
