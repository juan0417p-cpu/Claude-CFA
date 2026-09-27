-- Esquema de la base de datos (SQLite).
-- Se ejecuta cada vez que arranca la app; "IF NOT EXISTS" evita borrar datos.

CREATE TABLE IF NOT EXISTS topics (
  id          INTEGER PRIMARY KEY,
  name        TEXT    NOT NULL UNIQUE,
  weight_min  INTEGER NOT NULL,   -- peso mínimo en el examen (%)
  weight_max  INTEGER NOT NULL,   -- peso máximo en el examen (%)
  sort_order  INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS subtopics (
  id          INTEGER PRIMARY KEY,
  topic_id    INTEGER NOT NULL REFERENCES topics(id),
  name        TEXT    NOT NULL,
  sort_order  INTEGER NOT NULL,
  UNIQUE (topic_id, name)
);

CREATE TABLE IF NOT EXISTS sessions (
  id            INTEGER PRIMARY KEY,
  date          TEXT    NOT NULL,                     -- formato AAAA-MM-DD
  topic_id      INTEGER NOT NULL REFERENCES topics(id),
  subtopic_id   INTEGER REFERENCES subtopics(id),     -- opcional (mocks mixtos)
  num_questions INTEGER NOT NULL CHECK (num_questions > 0),
  num_correct   INTEGER NOT NULL,
  notes         TEXT,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  CHECK (num_correct BETWEEN 0 AND num_questions)
);

-- Preguntas falladas de cada sesión. Si se borra la sesión, se borran sus preguntas.
CREATE TABLE IF NOT EXISTS missed_questions (
  id             INTEGER PRIMARY KEY,
  session_id     INTEGER NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  question_text  TEXT    NOT NULL,   -- enunciado
  my_answer      TEXT    NOT NULL,   -- lo que respondí
  correct_answer TEXT    NOT NULL,   -- la respuesta correcta
  note           TEXT,               -- mi nota (por qué fallé, qué repasar)
  created_at     TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_sessions_topic ON sessions(topic_id, date);
CREATE INDEX IF NOT EXISTS idx_missed_session ON missed_questions(session_id);

-- Fotos de cada pregunta fallada (captura o foto del enunciado).
-- Se guardan dentro de la base de datos (BLOB), así el respaldo sigue siendo
-- un solo archivo. Ya vienen comprimidas a JPEG ≤ 1568 px desde el navegador,
-- que es el tamaño ideal para enviarlas a Claude en la fase 4.
CREATE TABLE IF NOT EXISTS missed_question_images (
  id                 INTEGER PRIMARY KEY,
  missed_question_id INTEGER NOT NULL REFERENCES missed_questions(id) ON DELETE CASCADE,
  media_type         TEXT    NOT NULL,   -- image/jpeg, image/png, image/webp o image/gif
  data               BLOB    NOT NULL,
  created_at         TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_images_missed ON missed_question_images(missed_question_id);
