// Conexión única a la base de datos SQLite (archivo data/cfa.db).
//
// La primera vez que se usa: crea la carpeta data/, aplica el esquema
// (lib/schema.sql) y carga los temas/subtemas (lib/seed.ts).

// node:sqlite viene incluido en Node.js (22.13+): no hay que compilar nada,
// así que funciona igual en Windows, Mac, Intel o ARM.
import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import { seed } from "./seed";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "cfa.db");
const SCHEMA_PATH = path.join(process.cwd(), "lib", "schema.sql");

function openDatabase() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const db = new DatabaseSync(DB_PATH);
  db.exec("PRAGMA journal_mode = WAL"); // escrituras más seguras y rápidas
  db.exec("PRAGMA foreign_keys = ON"); // respeta las relaciones entre tablas
  db.exec(fs.readFileSync(SCHEMA_PATH, "utf-8"));
  migrate(db);
  seed(db);
  return db;
}

// Cambios al esquema para bases de datos que ya existían antes del cambio.
// "CREATE TABLE IF NOT EXISTS" no agrega columnas nuevas a una tabla existente,
// así que aquí se agregan si faltan (los datos existentes no se tocan).
function migrate(db: DatabaseSync) {
  const hasColumn = (table: string, column: string) =>
    (db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[]).some(
      (c) => c.name === column
    );
  if (!hasColumn("missed_questions", "lucky")) {
    db.exec("ALTER TABLE missed_questions ADD COLUMN lucky INTEGER NOT NULL DEFAULT 0");
  }
}

// En desarrollo Next.js recarga los módulos a cada cambio; guardamos la
// conexión en globalThis para no abrir una nueva cada vez.
const globalForDb = globalThis as unknown as { cfaDb?: DatabaseSync };

export function getDb() {
  if (!globalForDb.cfaDb) {
    globalForDb.cfaDb = openDatabase();
  }
  return globalForDb.cfaDb;
}

// node:sqlite devuelve cada fila como un objeto "sin prototipo". Next.js no
// deja pasar esos objetos a los Client Components (como el formulario), así
// que los copiamos a objetos normales con { ...fila }.
export function allRows<T>(
  sql: string,
  ...params: (string | number | null)[]
): T[] {
  return getDb()
    .prepare(sql)
    .all(...params)
    .map((row) => ({ ...row }) as T);
}
