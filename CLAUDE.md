# CFA Nivel 1 — Monitor de Estudio

> Documento de referencia permanente. Léelo antes de cualquier cambio.
> Si una decisión cambia, **actualiza este archivo en el mismo commit**.

## Visión

App web **local** (corre en mi computador, sin nube) para monitorear mi preparación
del **CFA Nivel 1**.

- **Fecha del examen:** 17 de noviembre de 2026
- **Meta:** ≥ **70 %** de aciertos en **cada uno** de los 10 temas (no solo en el promedio).
- **Idea central:** registrar cada sesión de práctica, ver con números dónde estoy
  débil y usar un tutor con IA para cerrar esas brechas antes del examen.

### Funciones objetivo
1. Cuenta regresiva de días hasta el examen.
2. Dashboard con los 10 temas y sus subtemas.
3. Registro de sesiones de práctica: fecha, tema, subtema, nº de preguntas, aciertos,
   y cada pregunta fallada (texto, mi respuesta, respuesta correcta).
4. Análisis: % por tema y subtema, comparación contra 70 %, tendencia en el tiempo,
   subtemas dominados vs. débiles.
5. Tutor con IA (API de Anthropic): explicar preguntas falladas, generar preguntas
   similares y armar un plan de estudio para los temas débiles.

### Restricción de tiempo
Al 27-sep-2026 quedan ~51 días. **La app es una herramienta, no el objetivo**:
cada fase debe dejar algo usable ese mismo día para no robarle tiempo al estudio.

## Stack técnico

| Pieza | Elección | Por qué |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Front y back en un solo proyecto |
| Base de datos | **SQLite** vía **`node:sqlite`** (incluido en Node ≥ 22.13) | Un solo archivo local, sin servidor, síncrono y **sin compilar nada** (`better-sqlite3` falló en Windows ARM64) |
| Acceso a datos | SQL plano en `lib/db.ts` (sin ORM) | Menos magia, fácil de entender para quien empieza |
| Mutaciones | **Server Actions** | Formularios sin escribir API REST a mano |
| Estilos | **Tailwind CSS** | Viene con `create-next-app` |
| Gráficas (fase 3) | **Recharts** | Simple para líneas y barras |
| IA (fase 4) | **`@anthropic-ai/sdk`** | SDK oficial; se usa solo en el servidor |

### Convenciones
- Archivo de BD: `data/cfa.db` (en `.gitignore`). El esquema vive en `lib/schema.sql`
  y se aplica automáticamente al arrancar (`CREATE TABLE IF NOT EXISTS`).
- Los 10 temas/subtemas se cargan con un *seed* idempotente (`lib/seed.ts`).
- Porcentajes se **calculan** al vuelo (nunca se guardan): SQL para leer sesiones y
  `lib/stats.ts` (funciones puras) para el "nivel actual" y la evolución.
- **Nivel actual** = % ponderado por recencia: peso = 0,5^(días de antigüedad / 14)
  (`RECENCY_HALF_LIFE_DAYS` en `lib/config.ts`). Es el número que usa el semáforo.
  El "histórico" (promedio simple) se muestra como dato secundario.
- La API key va en `.env.local` como `ANTHROPIC_API_KEY` (nunca en git). El modelo se
  configura con `ANTHROPIC_MODEL`.
- La IA solo se llama desde código de servidor (Server Actions / Route Handlers).
- Nivel de programación del usuario: principiante/intermedio → preferir código
  explícito y comentado sobre abstracciones ingeniosas. Explicar cada paso.
- Idioma de la UI: español. Nombres de temas/subtemas en inglés (como el currículo oficial).
- No usar dependencias que se compilen (node-gyp): el computador del usuario es Windows ARM64.
- Comandos: `npm run dev` (desarrollo), `npm run build` (verificar), `npm run lint`.

## Modelo de datos

```sql
topics      (id, name, weight_min, weight_max, sort_order)
subtopics   (id, topic_id → topics, name, sort_order)
sessions    (id, date, topic_id → topics, subtopic_id → subtopics NULL,
             num_questions, num_correct, notes, created_at)
             -- CHECK (num_correct BETWEEN 0 AND num_questions)
missed_questions (id, session_id → sessions ON DELETE CASCADE,
             question_text, my_answer, correct_answer, note NULL,
             created_at)                                   -- fase 2 (note = mi nota)
missed_question_images (id, missed_question_id → missed_questions ON DELETE CASCADE,
             media_type, data BLOB, created_at)            -- fotos del enunciado
ai_explanations (missed_question_id PK → missed_questions, content, created_at)  -- fase 4
chat_messages (id, role user|assistant, content, created_at)                    -- fase 4
readings (id, topic_id NULL → topics, name, file_id UNIQUE, size_bytes, created_at) -- fase 4
```

`subtopic_id` es opcional: permite registrar un mock/examen mixto a nivel de tema.

**Fotos de preguntas:** se comprimen en el navegador (`lib/compress-image.ts`) a JPEG con
lado mayor ≤ 1568 px (tamaño óptimo para visión de Claude) y se guardan como BLOB en
`cfa.db` (respaldo = un solo archivo). Máx. 5 fotos por pregunta y 5 MB por foto
(`lib/image-limits.ts`). Se sirven en `/imagenes/<id>`. Una pregunta puede tener solo
foto (entonces `question_text` queda vacío).

## Temas del CFA Nivel 1 (currículo 2026) — datos del seed

> Verificar contra el currículo oficial de CFA Institute; los pesos son rangos del examen.

1. **Ethical and Professional Standards** (15–20 %) — Ethics and Trust in the Investment
   Profession; Code of Ethics and Standards of Professional Conduct; Guidance for
   Standards I–VII; Introduction to GIPS; Ethics Application.
2. **Quantitative Methods** (6–9 %) — Rates and Returns; Time Value of Money in Finance;
   Statistical Measures of Asset Returns; Probability Trees and Conditional Expectations;
   Portfolio Mathematics; Simulation Methods; Estimation and Inference; Hypothesis Testing;
   Parametric and Non-Parametric Tests of Independence; Simple Linear Regression;
   Introduction to Big Data Techniques.
3. **Economics** (6–9 %) — Firms and Market Structures; Understanding Business Cycles;
   Fiscal Policy; Monetary Policy; Introduction to Geopolitics; International Trade;
   Capital Flows and the FX Market; Exchange Rate Calculations.
4. **Financial Statement Analysis** (11–14 %) — Introduction to FSA; Analyzing Income
   Statements; Analyzing Balance Sheets; Analyzing Statements of Cash Flows I;
   Analyzing Statements of Cash Flows II; Analysis of Inventories; Analysis of Long-Term
   Assets; Topics in Long-Term Liabilities and Equity; Analysis of Income Taxes;
   Financial Reporting Quality; Financial Analysis Techniques; Introduction to Financial
   Statement Modeling.
5. **Corporate Issuers** (6–9 %) — Organizational Forms, Corporate Issuer Features, and
   Ownership; Investors and Other Stakeholders; Corporate Governance: Conflicts,
   Mechanisms, Risks, and Benefits; Working Capital and Liquidity; Capital Investments
   and Capital Allocation; Capital Structure; Business Models.
6. **Equity Investments** (11–14 %) — Market Organization and Structure; Security Market
   Indexes; Market Efficiency; Overview of Equity Securities; Company Analysis: Past and
   Present; Industry and Competitive Analysis; Company Analysis: Forecasting; Equity
   Valuation: Concepts and Basic Tools.
7. **Fixed Income** (11–14 %) — Fixed-Income Instrument Features; Fixed-Income Cash Flows
   and Types; Fixed-Income Issuance and Trading; Fixed-Income Markets for Corporate
   Issuers; Fixed-Income Markets for Government Issuers; Bond Valuation: Prices and
   Yields; Yield and Yield Spread Measures for Fixed-Rate Bonds; Yield and Yield Spread
   Measures for Floating-Rate Instruments; The Term Structure of Interest Rates;
   Interest Rate Risk and Return; Yield-Based Bond Duration Measures and Properties;
   Yield-Based Bond Convexity and Portfolio Properties; Curve-Based and Empirical
   Fixed-Income Risk Measures; Credit Risk; Credit Analysis for Government Issuers;
   Credit Analysis for Corporate Issuers; Fixed-Income Securitization; Asset-Backed
   Security (ABS) Features; Mortgage-Backed Security (MBS) Features.
8. **Derivatives** (5–8 %) — Derivative Instrument and Market Features; Forward
   Commitment and Contingent Claim Features; Derivative Benefits, Risks, and Uses;
   Arbitrage, Replication, and Cost of Carry; Pricing and Valuation of Forward Contracts;
   Pricing and Valuation of Futures Contracts; Pricing and Valuation of Swaps; Pricing
   and Valuation of Options; Option Replication Using Put–Call Parity; Valuing a
   Derivative Using a One-Period Binomial Model.
9. **Alternative Investments** (7–10 %) — Alternative Investment Features, Methods, and
   Structures; Alternative Investment Performance and Returns; Investments in Private
   Capital: Equity and Debt; Real Estate and Infrastructure; Natural Resources; Hedge
   Funds; Introduction to Digital Assets.
10. **Portfolio Management** (8–12 %) — Portfolio Management: An Overview; Portfolio Risk
    and Return: Part I; Portfolio Risk and Return: Part II; Basics of Portfolio Planning
    and Construction; The Behavioral Biases of Individuals; Introduction to Risk Management.

## Plan por fases

Estado: ⬜ pendiente · 🟨 en curso · ✅ hecho

### Fase 1 — Lo mínimo útil (1 tarde) ✅
Objetivo: empezar a registrar sesiones **hoy mismo**.
- [x] `create-next-app` con TypeScript + Tailwind; SQLite con `node:sqlite` (sin dependencias nativas).
- [x] `lib/db.ts`: abre `data/cfa.db`, aplica `schema.sql` (topics, subtopics, sessions), corre el seed.
- [x] Página `/` (dashboard):
  - Cuenta regresiva: "Faltan N días" hasta 2026-11-17 (`components/Countdown.tsx`).
  - 10 tarjetas de temas (`components/TopicCard.tsx`): peso, aciertos, % y semáforo
    (verde ≥ 70 %, amarillo 60–69 %, rojo < 60 %, gris sin datos) + subtemas desplegables.
- [x] Página `/sesiones/nueva`: formulario (fecha, tema, subtema dependiente del tema,
      nº preguntas, aciertos) → Server Action que valida e inserta (`app/sesiones/actions.ts`).
- [x] Página `/sesiones`: lista de sesiones con opción de borrar.

**Fuera de la fase 1 a propósito:** preguntas falladas, gráficas, IA, autenticación.

### Fase 2 — Preguntas falladas 🟨
- [x] Tabla `missed_questions`.
- [x] En el formulario de sesión, agregar N preguntas falladas (enunciado, mi respuesta,
      correcta, mi nota). Validación: no más falladas que (preguntas − aciertos).
- [x] Historial por tema: `/sesiones?tema=ID` con resumen, % por sesión y falladas desplegables.
- [x] Fotos por pregunta fallada: botón (o cámara en celular) y pegar captura con Ctrl+V;
      el enunciado pasa a ser opcional si hay foto. Miniaturas en el historial.
- [ ] Página `/falladas`: listado filtrable por tema/subtema, con buscador de texto.
- [ ] Página de detalle de cada tema: subtemas con su % y sus preguntas falladas.

### Fase 3 — Análisis 🟨
- [x] Semáforo por tema con el nivel actual (verde ≥ 70 %, amarillo 60–69 %, rojo < 60 %),
      siempre con ícono + texto (`components/StatusBadge.tsx`).
- [x] Página `/temas/[id]`: nivel actual, evolución y subtemas ordenados de peor a mejor
      (sin datos al final), con barra + marca de meta; aviso "pocos datos" si < 20 preguntas.
- [x] Evolución en el tiempo (Recharts, `components/EvolutionChart.tsx`): línea del nivel
      actual por día + puntos del resultado diario + línea de meta; eje X en tiempo real;
      tooltip y tabla alternativa. En el dashboard (general) y en cada tema.
- [ ] "Prioridad de estudio" = brecha a 70 % × peso del tema en el examen.
- [ ] Ritmo: preguntas por semana vs. días restantes.

### Fase 4 — Tutor con IA 🟨
- [x] `.env.local` con `ANTHROPIC_API_KEY` (y opcional `ANTHROPIC_MODEL`, por defecto
      `claude-opus-5`); plantilla en `.env.example`. `lib/ai.ts` (con `import "server-only"`)
      es el único punto de llamada. Verificado: la clave no aparece en `.next/static`.
- [x] **Explícame** en cada pregunta fallada (`/api/tutor/explicar`, streaming): envía fotos
      (`image` base64) + PDFs del tema + texto; se guarda en `ai_explanations` (regenerable).
- [x] **Practicar** (`/tutor/practica`): 5 preguntas A/B/C sobre los 3 subtemas más débiles
      (salida estructurada con Zod, `betaZodOutputFormat`); se responden en la app y se
      guardan como sesiones por subtema + falladas con su explicación.
- [x] **Chat** (`/tutor`, `/api/tutor/chat`, streaming): system = instrucciones fijas +
      resumen de estadísticas (`statsSummary()`); historial en `chat_messages`; PDFs elegidos.
- [x] **Lecturas** (`/tutor/lecturas`, `/api/lecturas`): PDFs a la Files API (`client.files`),
      asignados a un tema; se borran también en Anthropic.
- [ ] **Plan de estudio** semanal priorizado (con métricas y días restantes).

Notas de la API: `client.beta.messages` con `fallbacks: "default"` + beta
`server-side-fallback-2026-07-01` (solo Opus 5); revisar `stop_reason` (`refusal`,
`max_tokens`); `cache_control` automático; streaming vía `ReadableStream` con la marca
`ERROR_MARK` (`lib/tutor-shared.ts`) para errores. Pruebas sin clave real: servidor falso
+ `ANTHROPIC_BASE_URL`.

### Fase 5 — Pulido (opcional, solo si sobra tiempo) ⬜
- [ ] Exportar/importar datos (CSV/JSON) y respaldo del archivo `cfa.db`.
- [ ] Repaso espaciado de preguntas falladas (volver a mostrarlas en 1, 3, 7 días).
- [ ] Registro de mocks completos con desglose por tema.

## Cómo trabajar en este repo (para Claude)
- Next.js 16: leer `AGENTS.md` y la guía en `node_modules/next/dist/docs/` antes de usar APIs de Next.
- Consultas con `node:sqlite` deben llamar `await connection()` (de `next/server`) para
  no quedar congeladas en tiempo de compilación (ver `lib/data.ts`).
- Leer filas con `allRows()` de `lib/db.ts`: convierte las filas de `node:sqlite` (sin
  prototipo) en objetos normales; si no, Next.js no puede pasarlas a Client Components.
- Formularios con `useActionState`: enviar con `onSubmit` + `startTransition` (no
  `<form action>`), para que React no resetee los campos/selects cuando hay error.
- Una fase a la vez; no adelantar funciones de fases futuras.
- Al terminar una tarea, marcar su checkbox aquí y actualizar el estado de la fase.
- Antes de dar algo por terminado: `npm run build` y `npm run lint` sin errores.
- Explicar los cambios en lenguaje sencillo (el usuario está aprendiendo).
