// Conexión única a la base de datos SQLite (archivo data/cfa.db).
//
// La primera vez que se usa: crea la carpeta data/, aplica el esquema
// (lib/schema.sql) y carga los temas/subtemas (lib/seed.ts).

import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { seed } from "./seed";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "cfa.db");
const SCHEMA_PATH = path.join(process.cwd(), "lib", "schema.sql");

function openDatabase() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL"); // escrituras más seguras y rápidas
  db.pragma("foreign_keys = ON"); // respeta las relaciones entre tablas
  db.exec(fs.readFileSync(SCHEMA_PATH, "utf-8"));
  seed(db);
  return db;
}

// En desarrollo Next.js recarga los módulos a cada cambio; guardamos la
// conexión en globalThis para no abrir una nueva cada vez.
const globalForDb = globalThis as unknown as { cfaDb?: Database.Database };

export function getDb() {
  if (!globalForDb.cfaDb) {
    globalForDb.cfaDb = openDatabase();
  }
  return globalForDb.cfaDb;
}
