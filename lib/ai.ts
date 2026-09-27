// ÚNICO punto de contacto con la API de Anthropic.
//
// "server-only" hace que el build falle si algún componente del navegador
// importa este archivo: así la clave ANTHROPIC_API_KEY (que vive en .env.local)
// nunca puede terminar en el navegador.
import "server-only";
import Anthropic from "@anthropic-ai/sdk";

// Modelo configurable en .env.local (ANTHROPIC_MODEL). Por defecto, Claude Opus 5.
export const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-5";

export function hasApiKey() {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

let client: Anthropic | null = null;
export function getClient() {
  if (!hasApiKey()) throw new MissingKeyError();
  // El SDK lee ANTHROPIC_API_KEY del entorno por su cuenta.
  // Si la clave no está asociada a un espacio de trabajo (workspace), hay que
  // decir en cada solicitud cuál usar: ANTHROPIC_WORKSPACE_ID en .env.local.
  const workspaceId = process.env.ANTHROPIC_WORKSPACE_ID?.trim();
  client ??= new Anthropic({
    defaultHeaders: workspaceId ? { "anthropic-workspace-id": workspaceId } : undefined,
  });
  return client;
}

export class MissingKeyError extends Error {
  constructor() {
    super("Falta ANTHROPIC_API_KEY en el archivo .env.local (ver README).");
  }
}

// Si el modelo se niega a responder (filtro de seguridad), la API reintenta
// sola con otro modelo recomendado. Solo aplica a Claude Opus 5.
export function fallbackParams() {
  return MODEL.startsWith("claude-opus-5") && !MODEL.startsWith("claude-opus-5-5")
    ? { fallbacks: "default" as const, betas: ["server-side-fallback-2026-07-01"] }
    : {};
}

// Traduce cualquier error a un mensaje en español para mostrar en pantalla.
export function friendlyError(error: unknown): string {
  if (error instanceof MissingKeyError) return error.message;
  if (error instanceof Anthropic.AuthenticationError)
    return "La clave de la API no es válida. Revisa ANTHROPIC_API_KEY en .env.local.";
  if (error instanceof Anthropic.PermissionDeniedError)
    return "Tu clave no tiene permiso para esto (¿créditos o modelo disponible?).";
  if (error instanceof Anthropic.RateLimitError)
    return "Demasiadas solicitudes seguidas. Espera un momento y vuelve a intentar.";
  if (error instanceof Anthropic.BadRequestError && /workspace/i.test(error.message))
    return "Tu clave no está asociada a un espacio de trabajo (workspace). Crea una clave nueva eligiendo un espacio de trabajo en “Alcance”, o agrega ANTHROPIC_WORKSPACE_ID=wrkspc_… en .env.local (ver README).";
  if (error instanceof Anthropic.BadRequestError)
    return `La API rechazó la solicitud: ${error.message}. Si usaste un PDF muy grande (más de ~600 páginas), divídelo en partes.`;
  if (error instanceof Anthropic.APIConnectionError)
    return "No hay conexión con la API de Anthropic. Revisa tu internet.";
  if (error instanceof Anthropic.APIError)
    return `Error de la API (${error.status}): ${error.message}`;
  console.error(error);
  return "Ocurrió un error inesperado. Revisa la terminal.";
}

// Instrucciones base del tutor (fijas: así se aprovecha el caché de la API).
export const TUTOR_SYSTEM = `Eres un tutor experto del examen CFA Level I (currículo 2026) que ayuda a un estudiante hispanohablante.

Reglas:
- Responde en español. Mantén en inglés los términos técnicos del currículo (p. ej. "duration", "free cash flow to equity") y, si ayuda, da su traducción entre paréntesis la primera vez.
- Sé claro y didáctico: primero la intuición, luego la fórmula o regla, luego un ejemplo numérico corto cuando aplique.
- Escribe las fórmulas en texto plano legible (p. ej. "PV = FV / (1 + r)^n"), nunca en LaTeX.
- Usa Markdown simple: títulos cortos, listas y **negritas**. Nada de tablas enormes.
- Si te dan lecturas (PDF), básate en ellas y di en qué parte de la lectura está el concepto cuando puedas.
- Si no estás seguro de un dato del currículo, dilo en vez de inventarlo.`;
