// Valores fijos de la app. Si cambia la fecha o la meta, se cambia solo aquí.

// Fecha del examen (año, mes 1-12, día).
export const EXAM_DATE = { year: 2026, month: 11, day: 17 };

// Meta de aciertos por tema, en porcentaje.
export const TARGET_PCT = 70;

// "Nivel actual": cada sesión pesa menos a medida que envejece.
// Con 14 días, una sesión de hace 2 semanas cuenta la mitad que una de hoy,
// una de hace 4 semanas cuenta un cuarto, etc.
export const RECENCY_HALF_LIFE_DAYS = 14;

// Con menos preguntas que esto, el % todavía no es confiable.
export const MIN_QUESTIONS_RELIABLE = 20;
