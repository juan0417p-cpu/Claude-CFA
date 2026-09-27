# CFA Nivel 1 — Monitor de estudio

App local (Next.js + SQLite) para seguir la preparación del CFA Nivel 1.
La visión y el plan por fases están en [`CLAUDE.md`](CLAUDE.md).

## Requisitos
- [Node.js](https://nodejs.org) 22.13 o superior (versión LTS recomendada).
  La base de datos usa el SQLite que viene con Node, así que no hay que instalar
  Python ni herramientas de compilación.

## Cómo abrirla
```bash
npm install     # solo la primera vez
npm run dev     # arranca la app
```
Luego abre **http://localhost:3000** en el navegador. Para detenerla: `Ctrl + C` en la terminal.

## Tutor con IA (clave de Anthropic)
1. Crea una clave en https://console.anthropic.com/settings/keys (necesita créditos).
2. En la carpeta del proyecto, copia la plantilla: `copy .env.example .env.local`
   (Mac/Linux: `cp .env.example .env.local`).
3. Abre `.env.local` y reemplaza `sk-ant-...` por tu clave.
4. Reinicia la app (`Ctrl + C` y `npm run dev`).

Al crear la clave, en **Alcance** elige un **espacio de trabajo** (por ejemplo "Default").
Si ya creaste una sin espacio de trabajo y ves el error "not scoped to a workspace",
crea otra eligiendo uno, o agrega `ANTHROPIC_WORKSPACE_ID=wrkspc_...` en `.env.local`.

`.env.local` no se sube a git y la clave solo se usa en el servidor: nunca llega al navegador.
Para gastar menos, agrega `ANTHROPIC_MODEL=claude-sonnet-5` en `.env.local`.

## Cómo actualizar cuando hay cambios nuevos
Con la app apagada (`Ctrl + C`), en la carpeta del proyecto:
```bash
git checkout -- package-lock.json   # descarta cambios automáticos de npm
git pull                            # descarga lo nuevo
npm install                         # instala piezas nuevas, si las hay
npm run dev
```
El orden importa: `git pull` va **antes** de `npm install`.

Tus datos quedan en `data/cfa.db` (se crea solo la primera vez). Haz copia de
ese archivo si quieres un respaldo.

## Estructura
- `app/page.tsx` — dashboard (cuenta regresiva + tarjetas de temas)
- `components/` — piezas visuales (`Countdown`, `TopicCard`)
- `lib/config.ts` — fecha del examen y meta (70 %)
- `lib/seed.ts` — lista de los 10 temas y sus subtemas (edítala aquí)
- `lib/schema.sql` — tablas de la base de datos
- `lib/db.ts` / `lib/data.ts` — conexión y consultas
