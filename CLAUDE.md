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
| Base de datos | **SQLite** vía **`better-sqlite3`** | Un solo archivo local, sin servidor, síncrono y simple |
| Acceso a datos | SQL plano en `lib/db.ts` (sin ORM) | Menos magia, fácil de entender para quien empieza |
| Mutaciones | **Server Actions** | Formularios sin escribir API REST a mano |
| Estilos | **Tailwind CSS** | Viene con `create-next-app` |
| Gráficas (fase 3) | **Recharts** | Simple para líneas y barras |
| IA (fase 4) | **`@anthropic-ai/sdk`** | SDK oficial; se usa solo en el servidor |

### Convenciones
- Archivo de BD: `data/cfa.db` (en `.gitignore`). El esquema vive en `lib/schema.sql`
  y se aplica automáticamente al arrancar (`CREATE TABLE IF NOT EXISTS`).
- Los 10 temas/subtemas se cargan con un *seed* idempotente (`lib/seed.ts`).
- Porcentajes se **calculan** con SQL (`SUM(aciertos)/SUM(preguntas)`), nunca se guardan.
- La API key va en `.env.local` como `ANTHROPIC_API_KEY` (nunca en git). El modelo se
  configura con `ANTHROPIC_MODEL`.
- La IA solo se llama desde código de servidor (Server Actions / Route Handlers).
- Nivel de programación del usuario: principiante/intermedio → preferir código
  explícito y comentado sobre abstracciones ingeniosas. Explicar cada paso.
- Idioma de la UI: español. Nombres de temas/subtemas en inglés (como el currículo oficial).
- Comandos: `npm run dev` (desarrollo), `npm run build` (verificar), `npm run lint`.

## Modelo de datos

```sql
topics      (id, name, weight_min, weight_max, sort_order)
subtopics   (id, topic_id → topics, name, sort_order)
sessions    (id, date, topic_id → topics, subtopic_id → subtopics NULL,
             num_questions, num_correct, notes, created_at)
             -- CHECK (num_correct BETWEEN 0 AND num_questions)
missed_questions (id, session_id → sessions ON DELETE CASCADE,
             question_text, my_answer, correct_answer, explanation NULL,
             created_at)                                   -- fase 2
ai_messages (id, missed_question_id NULL, kind, prompt, response, created_at)
                                                            -- fase 4 (cache de respuestas IA)
```

`subtopic_id` es opcional: permite registrar un mock/examen mixto a nivel de tema.

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

### Fase 1 — Lo mínimo útil (1 tarde) 🟨
Objetivo: empezar a registrar sesiones **hoy mismo**.
- [x] `create-next-app` con TypeScript + Tailwind; instalar `better-sqlite3`.
- [x] `lib/db.ts`: abre `data/cfa.db`, aplica `schema.sql` (topics, subtopics, sessions), corre el seed.
- [x] Página `/` (dashboard):
  - Cuenta regresiva: "Faltan N días" hasta 2026-11-17 (`components/Countdown.tsx`).
  - 10 tarjetas de temas (`components/TopicCard.tsx`): peso, aciertos, % y semáforo
    (verde ≥ 70 %, amarillo 60–69 %, rojo < 60 %, gris sin datos) + subtemas desplegables.
- [ ] Página `/sesiones/nueva`: formulario (fecha, tema, subtema dependiente del tema,
      nº preguntas, aciertos) → Server Action que valida e inserta.
- [ ] Página `/sesiones`: lista de sesiones con opción de borrar.

**Fuera de la fase 1 a propósito:** preguntas falladas, gráficas, IA, autenticación.

### Fase 2 — Preguntas falladas ⬜
- [ ] Tabla `missed_questions`.
- [ ] En el formulario de sesión, agregar N preguntas falladas (texto, mi respuesta, correcta).
- [ ] Página `/falladas`: listado filtrable por tema/subtema, con buscador de texto.
- [ ] Página de detalle de cada tema: subtemas con su % y sus preguntas falladas.

### Fase 3 — Análisis ⬜
- [ ] % por subtema con comparación contra 70 % (barra + línea de meta).
- [ ] Tendencia en el tiempo por tema (línea semanal, Recharts).
- [ ] Clasificación: **Dominado** (≥ 70 % con ≥ 20 preguntas), **En riesgo** (60–69 %),
      **Débil** (< 60 %), **Sin datos suficientes** (< 20 preguntas).
- [ ] "Prioridad de estudio" = brecha a 70 % × peso del tema en el examen.
- [ ] Ritmo: preguntas por semana vs. días restantes.

### Fase 4 — Tutor con IA ⬜
- [ ] `.env.local` con `ANTHROPIC_API_KEY` y `ANTHROPIC_MODEL`; `lib/ai.ts` como único punto de llamada.
- [ ] **Explicar** una pregunta fallada (por qué mi respuesta es incorrecta y la correcta sí).
- [ ] **Generar preguntas similares** (formato CFA: 3 opciones A/B/C) y poder responderlas
      en la app; los resultados se registran como una sesión más.
- [ ] **Plan de estudio**: enviar las métricas de la fase 3 y los días restantes; recibir
      un plan semanal priorizado por temas débiles.
- [ ] Guardar respuestas en `ai_messages` para no pagar dos veces la misma explicación.

### Fase 5 — Pulido (opcional, solo si sobra tiempo) ⬜
- [ ] Exportar/importar datos (CSV/JSON) y respaldo del archivo `cfa.db`.
- [ ] Repaso espaciado de preguntas falladas (volver a mostrarlas en 1, 3, 7 días).
- [ ] Registro de mocks completos con desglose por tema.

## Cómo trabajar en este repo (para Claude)
- Next.js 16: leer `AGENTS.md` y la guía en `node_modules/next/dist/docs/` antes de usar APIs de Next.
- Consultas con `better-sqlite3` deben llamar `await connection()` (de `next/server`) para
  no quedar congeladas en tiempo de compilación (ver `lib/data.ts`).
- Una fase a la vez; no adelantar funciones de fases futuras.
- Al terminar una tarea, marcar su checkbox aquí y actualizar el estado de la fase.
- Antes de dar algo por terminado: `npm run build` y `npm run lint` sin errores.
- Explicar los cambios en lenguaje sencillo (el usuario está aprendiendo).
