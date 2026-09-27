"use client";
// Práctica generada por la IA: 5 preguntas sobre mis subtemas débiles.
// Respondo, reviso, y puedo guardar el resultado como sesión.

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { generateQuiz, saveQuizResults, type QuizQuestion } from "@/app/tutor/actions";
import Markdown from "./Markdown";

type Letter = "A" | "B" | "C";

export default function QuizRunner() {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<(Letter | undefined)[]>([]);
  const [checked, setChecked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [generating, startGenerating] = useTransition();
  const [saving, startSaving] = useTransition();

  function generate() {
    setError("");
    startGenerating(async () => {
      const result = await generateQuiz();
      if ("error" in result) return setError(result.error);
      setQuestions(result.questions);
      setAnswers(result.questions.map(() => undefined));
      setChecked(false);
      setSaved(false);
    });
  }

  function save() {
    startSaving(async () => {
      const result = await saveQuizResults(questions, answers as Letter[]);
      if ("error" in result) return setError(result.error);
      setSaved(true);
      router.refresh();
    });
  }

  const allAnswered = answers.length > 0 && answers.every(Boolean);
  const score = questions.filter((q, i) => answers[i] === q.correct).length;

  if (questions.length === 0) {
    return (
      <div>
        <button type="button" onClick={generate} disabled={generating}
          className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60">
          {generating ? "Generando preguntas… (puede tardar un minuto)" : "Generar 5 preguntas"}
        </button>
        {error && <p role="alert" className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((q, i) => {
        const answer = answers[i];
        return (
          <fieldset key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <legend className="sr-only">Pregunta {i + 1}</legend>
            <p className="text-xs text-slate-500">Pregunta {i + 1} · {q.subtopicName}</p>
            <p className="mt-1 whitespace-pre-wrap font-medium">{q.question}</p>
            <div className="mt-3 space-y-2">
              {(["A", "B", "C"] as const).map((letter) => {
                const isCorrect = checked && letter === q.correct;
                const isWrongPick = checked && answer === letter && letter !== q.correct;
                return (
                  <label key={letter}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2 text-sm ${
                      isCorrect ? "border-emerald-400 bg-emerald-50"
                        : isWrongPick ? "border-red-300 bg-red-50"
                        : answer === letter ? "border-slate-900 bg-slate-50" : "border-slate-200 hover:bg-slate-50"
                    }`}>
                    <input type="radio" name={`q${i}`} value={letter} checked={answer === letter}
                      disabled={checked} className="mt-0.5"
                      onChange={() => setAnswers((a) => a.map((x, j) => (j === i ? letter : x)))} />
                    <span><strong>{letter}.</strong> {q.options[letter]}</span>
                    {isCorrect && <span className="ml-auto text-emerald-700">✓ Correcta</span>}
                    {isWrongPick && <span className="ml-auto text-red-700">✕ Tu respuesta</span>}
                  </label>
                );
              })}
            </div>
            {checked && (
              <div className="mt-3 rounded-lg bg-slate-50 p-3">
                <Markdown>{q.explanation}</Markdown>
              </div>
            )}
          </fieldset>
        );
      })}

      {error && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

      <div className="flex flex-wrap items-center gap-3">
        {!checked ? (
          <button type="button" disabled={!allAnswered} onClick={() => setChecked(true)}
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50">
            Revisar respuestas
          </button>
        ) : (
          <>
            <p className="text-lg font-semibold">Resultado: {score}/{questions.length}</p>
            {saved ? (
              <span className="text-sm text-emerald-700">✓ Guardado en tu historial</span>
            ) : (
              <button type="button" onClick={save} disabled={saving}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60">
                {saving ? "Guardando…" : "Guardar como sesión"}
              </button>
            )}
            <button type="button" onClick={generate} disabled={generating}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-60">
              {generating ? "Generando…" : "Otras 5 preguntas"}
            </button>
          </>
        )}
      </div>
      {!checked && !allAnswered && <p className="text-xs text-slate-500">Responde las 5 para revisar.</p>}
    </div>
  );
}
