// Reglas para las fotos de preguntas. Se usan en el navegador y en el servidor.

// Formatos que acepta la API de Claude para imágenes.
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

// Lado más largo recomendado por Claude: imágenes más grandes se reducen
// igual en su servidor, así que achicarlas antes ahorra espacio y dinero.
export const MAX_IMAGE_SIDE = 1568;

export const MAX_IMAGES_PER_QUESTION = 5;
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB por imagen (límite de la API)
