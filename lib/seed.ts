// Datos iniciales: los 10 temas del CFA Nivel 1 y sus subtemas.
//
// Para cambiar la lista, edita este arreglo y reinicia la app (npm run dev).
// El seed es "idempotente": se puede correr muchas veces sin duplicar nada,
// porque usa INSERT OR IGNORE y los nombres son únicos.
// Ojo: borrar un subtema de esta lista NO lo borra de la base de datos.

import type Database from "better-sqlite3";

type TopicSeed = {
  name: string;
  weightMin: number;
  weightMax: number;
  subtopics: string[];
};

export const TOPICS: TopicSeed[] = [
  {
    name: "Ethical and Professional Standards",
    weightMin: 15,
    weightMax: 20,
    subtopics: [
      "Ethics and Trust in the Investment Profession",
      "Code of Ethics and Standards of Professional Conduct",
      "Guidance for Standards I–VII",
      "Introduction to GIPS",
      "Ethics Application",
    ],
  },
  {
    name: "Quantitative Methods",
    weightMin: 6,
    weightMax: 9,
    subtopics: [
      "Rates and Returns",
      "Time Value of Money in Finance",
      "Statistical Measures of Asset Returns",
      "Probability Trees and Conditional Expectations",
      "Portfolio Mathematics",
      "Simulation Methods",
      "Estimation and Inference",
      "Hypothesis Testing",
      "Parametric and Non-Parametric Tests of Independence",
      "Simple Linear Regression",
      "Introduction to Big Data Techniques",
    ],
  },
  {
    name: "Economics",
    weightMin: 6,
    weightMax: 9,
    subtopics: [
      "Firms and Market Structures",
      "Understanding Business Cycles",
      "Fiscal Policy",
      "Monetary Policy",
      "Introduction to Geopolitics",
      "International Trade",
      "Capital Flows and the FX Market",
      "Exchange Rate Calculations",
    ],
  },
  {
    name: "Financial Statement Analysis",
    weightMin: 11,
    weightMax: 14,
    subtopics: [
      "Introduction to Financial Statement Analysis",
      "Analyzing Income Statements",
      "Analyzing Balance Sheets",
      "Analyzing Statements of Cash Flows I",
      "Analyzing Statements of Cash Flows II",
      "Analysis of Inventories",
      "Analysis of Long-Term Assets",
      "Topics in Long-Term Liabilities and Equity",
      "Analysis of Income Taxes",
      "Financial Reporting Quality",
      "Financial Analysis Techniques",
      "Introduction to Financial Statement Modeling",
    ],
  },
  {
    name: "Corporate Issuers",
    weightMin: 6,
    weightMax: 9,
    subtopics: [
      "Organizational Forms, Corporate Issuer Features, and Ownership",
      "Investors and Other Stakeholders",
      "Corporate Governance: Conflicts, Mechanisms, Risks, and Benefits",
      "Working Capital and Liquidity",
      "Capital Investments and Capital Allocation",
      "Capital Structure",
      "Business Models",
    ],
  },
  {
    name: "Equity Investments",
    weightMin: 11,
    weightMax: 14,
    subtopics: [
      "Market Organization and Structure",
      "Security Market Indexes",
      "Market Efficiency",
      "Overview of Equity Securities",
      "Company Analysis: Past and Present",
      "Industry and Competitive Analysis",
      "Company Analysis: Forecasting",
      "Equity Valuation: Concepts and Basic Tools",
    ],
  },
  {
    name: "Fixed Income",
    weightMin: 11,
    weightMax: 14,
    subtopics: [
      "Fixed-Income Instrument Features",
      "Fixed-Income Cash Flows and Types",
      "Fixed-Income Issuance and Trading",
      "Fixed-Income Markets for Corporate Issuers",
      "Fixed-Income Markets for Government Issuers",
      "Fixed-Income Bond Valuation: Prices and Yields",
      "Yield and Yield Spread Measures for Fixed-Rate Bonds",
      "Yield and Yield Spread Measures for Floating-Rate Instruments",
      "The Term Structure of Interest Rates",
      "Interest Rate Risk and Return",
      "Yield-Based Bond Duration Measures and Properties",
      "Yield-Based Bond Convexity and Portfolio Properties",
      "Curve-Based and Empirical Fixed-Income Risk Measures",
      "Credit Risk",
      "Credit Analysis for Government Issuers",
      "Credit Analysis for Corporate Issuers",
      "Fixed-Income Securitization",
      "Asset-Backed Security (ABS) Features",
      "Mortgage-Backed Security (MBS) Features",
    ],
  },
  {
    name: "Derivatives",
    weightMin: 5,
    weightMax: 8,
    subtopics: [
      "Derivative Instrument and Derivative Market Features",
      "Forward Commitment and Contingent Claim Features",
      "Derivative Benefits, Risks, and Uses",
      "Arbitrage, Replication, and the Cost of Carry",
      "Pricing and Valuation of Forward Contracts",
      "Pricing and Valuation of Futures Contracts",
      "Pricing and Valuation of Interest Rate and Other Swaps",
      "Pricing and Valuation of Options",
      "Option Replication Using Put–Call Parity",
      "Valuing a Derivative Using a One-Period Binomial Model",
    ],
  },
  {
    name: "Alternative Investments",
    weightMin: 7,
    weightMax: 10,
    subtopics: [
      "Alternative Investment Features, Methods, and Structures",
      "Alternative Investment Performance and Returns",
      "Investments in Private Capital: Equity and Debt",
      "Real Estate and Infrastructure",
      "Natural Resources",
      "Hedge Funds",
      "Introduction to Digital Assets",
    ],
  },
  {
    name: "Portfolio Management",
    weightMin: 8,
    weightMax: 12,
    subtopics: [
      "Portfolio Management: An Overview",
      "Portfolio Risk and Return: Part I",
      "Portfolio Risk and Return: Part II",
      "Basics of Portfolio Planning and Construction",
      "The Behavioral Biases of Individuals",
      "Introduction to Risk Management",
    ],
  },
];

// Inserta temas y subtemas que falten. Corre dentro de una transacción
// para que sea rápido y "todo o nada".
export function seed(db: Database.Database) {
  const insertTopic = db.prepare(
    `INSERT INTO topics (name, weight_min, weight_max, sort_order)
     VALUES (?, ?, ?, ?)
     ON CONFLICT (name) DO UPDATE SET
       weight_min = excluded.weight_min,
       weight_max = excluded.weight_max,
       sort_order = excluded.sort_order`
  );
  const getTopicId = db.prepare(`SELECT id FROM topics WHERE name = ?`);
  const insertSubtopic = db.prepare(
    `INSERT INTO subtopics (topic_id, name, sort_order)
     VALUES (?, ?, ?)
     ON CONFLICT (topic_id, name) DO UPDATE SET sort_order = excluded.sort_order`
  );

  const run = db.transaction(() => {
    TOPICS.forEach((topic, i) => {
      insertTopic.run(topic.name, topic.weightMin, topic.weightMax, i + 1);
      const { id } = getTopicId.get(topic.name) as { id: number };
      topic.subtopics.forEach((sub, j) => {
        insertSubtopic.run(id, sub, j + 1);
      });
    });
  });
  run();
}
