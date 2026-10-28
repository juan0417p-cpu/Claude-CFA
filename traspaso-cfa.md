# Traspaso CFA Nivel 1: estado del estudio (al 28-oct-2026)

Recuperado del historial de la sesión "App de monitoreo CFA Nivel 1" (session_011y4R44NJ9pXd617NMs94dJ).

## 1. Diagnóstico de los mocks Kaplan 2, 3 y 4

Promedio general: **48,9 %** (Mock 4: 89/180 = 49,4 %).
"Pts. perdidos" = puntos que se pierden en el examen real según el peso de cada materia. Es el mejor criterio para priorizar.

| Materia | Aciertos | Pts. perdidos |
|---|---|---|
| Equity Investments | 36,8 % | 13,9 |
| Ethics | 58,9 % | 12,6 |
| Financial Statement Analysis | 44,6 % | 12,2 |
| Fixed Income | 44,9 % | 12,1 |
| Alternative Investments | 40,4 % | 8,9 |
| Portfolio Management | 50,0 % | 8,8 |
| Derivatives | 33,3 % | 7,6 |
| Economics | 48,6 % | 6,8 |
| Quantitative Methods | 60,5 % | 5,2 |
| Corporate Issuers | 71,8 % | 3,7 |

### Subtemas con más fallos
| Materia | Subtema | Falladas / total | Aciertos |
|---|---|---|---|
| Ethics | Guidance for Standards I–VII | 33/82 | 60 % |
| Equity | Market Organization and Structure | 10/12 | 17 % |
| Equity | Security Market Indexes | 9/10 | 10 % |
| FSA | Financial Analysis Techniques | 7/9 | 22 % |
| PM | Portfolio Management: An Overview | 7/11 | 36 % |
| PM | Portfolio Risk and Return: Part II | 7/13 | 46 % |
| Alt | Features, Methods, and Structure | 7/13 | 46 % |
| Equity | Equity Valuation: Concepts and Basic Tools | 7/18 | 61 % |
| Equity | Overview of Equity Securities | 5/6 | 17 % |
| FI | Interest Rate Risk and Return | 5/6 | 17 % |
| FI | Bond Valuation: Prices and Yields | 5/6 | 17 % |
| Derivatives | Forward Commitment and Contingent Claim Features | 5/8 | 38 % |
| FI | Credit Risk | 5/8 | 38 % |
| FSA | Financial Reporting Quality | 5/9 | 44 % |
| FI | Term Structure of Interest Rates | 5/9 | 44 % |
| PM | Basics of Portfolio Planning and Construction | 5/11 | 55 % |
| Equity | Market Efficiency | 5/11 | 55 % |
| Alt | Real Estate and Infrastructure | 4/5 | 20 % |
| Alt | Natural Resources | 4/5 | 20 % |
| FSA | Analysis of Inventories | 4/6 | 33 % |
| Ethics | Introduction to GIPS | 4/6 | 33 % |
| Equity | Industry and Competitive Analysis | 4/6 | 33 % |
| Alt | Hedge Funds | 4/7 | 43 % |
| PM | Introduction to Risk Management | 4/7 | 43 % |
| Alt | Private Capital: Equity and Debt | 4/7 | 43 % |
| Corp | Investors and Other Stakeholders | 3/3 | 0 % |
| Econ | Introduction to Geopolitics | 3/3 | 0 % |
| Derivatives | Pricing and Valuation of Options | 3/3 | 0 % |
| Econ | Fiscal Policy | 3/4 | 25 % |
| FI | Floating-Rate Instruments | 3/4 | 25 % |

## 2. Repaso ya hecho

| Fecha | Tema | Resultado | En los mocks |
|---|---|---|---|
| 23-oct | Fixed Income (repaso mixto) | 16/20 = 80 % | 39 % |
| 27-oct | Equity, Bloque 1: órdenes, margen, mercados | 7/9 + refuerzos | 17 % |
| 27-oct | Ethics, patrones ①②③ | 23/28 = 82 % | 0/28 |
| 28-oct | Equity, Bloque 2: índices | 8/9 + 2/4 en refuerzos | 10 % |

## 3. Errores recurrentes que hay que vigilar

- **Yield to call:** N = número de cupones **hasta el call** (no restar años). Si es semestral, I/Y × 2.
- **Haircut:** se divide por el valor del **bono**, no por el préstamo.
- **Matrix pricing:** arma siempre la tabla para interpolar.
- **Órdenes:** la limit significa "a este precio o mejor". Una **sell limit** debajo del precio actual se ejecuta ya. "Comprar si sube" es una **stop buy**.
- **"Least accurate":** marca V/F en cada opción y lee cada una hasta el final.
- **Índices:** "same number of shares" → **price-weighted**. "Same amount of money" → equal-weighted. El market cap sobrepondera lo que subió; el fundamental no.
- **Ethics:**
  - Revelar antes que prohibir. Desconfía de *must / requires / never*.
  - Compensación condicionada ("if…") → **consentimiento escrito** del empleador.
  - I(A): solo eres responsable de lo que haces "knowingly".
  - IV(C): el supervisor tiene que **detectar** violaciones, no solo escribir reglas.

## 4. Pendiente

1. **Ethics, patrón ④:** GIPS, sanciones y Code of Ethics (9 preguntas falladas).
2. Repaso rápido de órdenes (sell limit) y de "same number of shares".
3. Siguientes prioridades por puntos perdidos: el resto de **Equity** (valuation, overview, market efficiency), **FSA** (analysis techniques, reporting quality, inventories) y **Fixed Income** (interest rate risk, valuation).
4. Registrar en la app las sesiones de repaso.

## 5. Archivos de los mocks

Los `Kaplan-Mock-Exam-2/3/4.json` (formato `cfa-mock-v1`, se importan en `/importar` de la app) se generaron a partir de los PDFs de Kaplan y de la hoja Excel de respuestas. Estaban en una carpeta temporal del contenedor anterior. El del Mock 4 se envió como archivo en esa conversación, así que se puede descargar desde ahí. Si falta alguno, se regenera subiendo de nuevo el PDF y el Excel.
