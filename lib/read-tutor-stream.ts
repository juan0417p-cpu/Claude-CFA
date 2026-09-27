// (Navegador) Llama a una ruta del tutor y va entregando el texto a medida
// que llega. Devuelve el texto completo, o lanza un Error con el mensaje.

import { ERROR_MARK } from "./tutor-shared";

export async function readTutorStream(
  url: string,
  body: unknown,
  onText: (textSoFar: string) => void
): Promise<string> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.body) throw new Error("Sin respuesta del servidor.");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let text = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    text += decoder.decode(value, { stream: true });
    const errorAt = text.indexOf(ERROR_MARK);
    if (errorAt !== -1) throw new Error(text.slice(errorAt + ERROR_MARK.length));
    onText(text);
  }
  return text;
}
