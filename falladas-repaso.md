# Preguntas falladas en el repaso: para ver al final

Días 1 y 2 del plan (26 y 27 de octubre de 2026), más el repaso de Fixed Income del 26 en la mañana. Cada pregunta trae la respuesta escondida: intenta responderla antes de abrirla.

**Total: 149 preguntas** (Equity: 28 · Ethics: 21 · Fixed Income: 23 · Alternatives: 10 · Derivatives: 14 · Portfolio Mgmt: 27 · Corporate Issuers: 6 · FSA: 13 · Quant: 6 · Economics: 1)

---

## 📈 Equity: órdenes y posiciones (Día 1)

### 1. Buy limit encima del precio *(práctica)*
La acción está en **$40** y pones una **buy limit a $42**. ¿Qué pasa?

<details><summary>Ver respuesta</summary>

**Se ejecuta YA, a ~$40.** Buy limit = "compro a $42 **o menos**", y $40 ya cumple la condición.
Si quisieras comprar solo cuando suba a $42, la orden es una **stop buy**.
*(Tu respuesta: "se compra en corto cuando esté a 42". Además, "comprar en corto" no existe: short = vender.)*
</details>

### 2. Pérdida máxima *(práctica)*
¿Qué posición tiene **pérdida máxima ilimitada**: long o short?

<details><summary>Ver respuesta</summary>

**El short.** El precio no puede bajar de 0 (el long tiene un piso), pero sí puede subir sin límite (el short no tiene techo). *(Tu respuesta: long.)*
</details>

### 3. *(Mock 2 #151)*
Which of the following statements about types of orders is **least accurate**?
- A) Market orders are orders to buy or sell at the best price available.
- B) Limit orders are orders to buy or sell at or away from the market price.
- C) A stop buy order is typically used to protect a short position in a security and is placed below the current market price.

<details><summary>Ver respuesta</summary>

**C.** Protege un short ✅, pero va **encima** del precio, no debajo ❌. La primera mitad es verdadera y la segunda falsa: **lee hasta el final**. *(Tu respuesta: A.)*
</details>

### 4. *(Mock 3 #147)*
Kate Johnson owns shares of a stock that currently trades at $15. If Johnson wants to buy more shares if the price increases to $17, she should enter a:
- A) stop buy order at $17.
- B) limit order to buy at $17.
- C) market order to buy at $17.

<details><summary>Ver respuesta</summary>

**A.** "Comprar si **sube**" → **stop buy**. Una buy limit a $17 se ejecutaría ya, a $15. *(Tu respuesta: B. La fallaste en el mock y otra vez en el repaso.)*
</details>

### 5. Sell limit encima del precio *(refuerzo)*
An investor owns a stock that trades at $50. He wants to **sell if the price rises to $58**. He should place a:
- A) limit order to sell at $58.
- B) stop sell order at $58.
- C) stop buy order at $58.

<details><summary>Ver respuesta</summary>

**A.** Vender **más caro** que hoy = precio **mejor** → **limit**. La stop sell va **debajo**, para protegerte si cae.
</details>

### 6. Sell limit debajo del precio *(refuerzo)*
A stock trades at $30. An investor places a **limit order to sell at $27**. The order will most likely:
- A) execute immediately at about $30.
- B) execute only if the price falls to $27.
- C) never execute.

<details><summary>Ver respuesta</summary>

**A.** Sell limit = "vendo a $27 **o más**" (es un **piso**). Hoy te pagan $30, así que se ejecuta **ya**.
</details>

---

## 📊 Equity: índices (Día 2)

### 7. Sobreponderar lo sobrevalorado *(práctica)*
¿Qué método tiende a **sobreponderar las acciones sobrevaloradas**: market cap o fundamental?

<details><summary>Ver respuesta</summary>

**Market cap.** Si una acción sube por moda, su cap sube y **pesa más** (sesgo momentum). El fundamental pondera por ventas, utilidades o dividendos, que no cambian con el precio. *(Tu respuesta: fundamental.)*
</details>

### 8. *(Mock 4 #114)*
Which type of equity index would have price returns mirroring a portfolio that held the **same number of shares** of each constituent security?
- A) Price-weighted.
- B) Equal-weighted.
- C) Market cap-weighted.

<details><summary>Ver respuesta</summary>

**A.** Con 1 acción de cada una, tu portafolio vale **la suma de los precios** = price-weighted. "Equal" se refiere a **igual dinero**. *(Tu respuesta: B, en el mock y en el repaso.)*
</details>

### 9. *(Refuerzo)*
Un índice tiene 2 acciones: A pasa de $10 a $15 y B se queda en $90. Un inversionista compra **1 acción de A y 1 de B**. Su retorno es +5 %. ¿Con qué índice coincide: price-weighted o equal-weighted?

<details><summary>Ver respuesta</summary>

**Price-weighted:** (15 + 90) / (10 + 90) − 1 = +5 %. El equal-weighted daría (50 % + 0 %) / 2 = +25 %. *(Tu respuesta: equal-weighted.)*
</details>

### 10. *(Refuerzo)*
Which index's return would be matched by a portfolio holding **100 shares** of each constituent stock?
- A) Price-weighted.
- B) Equal-weighted.
- C) Market-capitalization weighted.

<details><summary>Ver respuesta</summary>

**A.** 100 acciones de cada una = mismo **número de acciones** → los pesos dependen del **precio** → price-weighted. *(Tu respuesta: B.)*
🧠 Cadena: **Dow Jones → price-weighted → mismo nº de acciones.**
</details>

---

## ⚖️ Ethics: preguntas del mock (Días 1 y 2)

### 11. *(Mock 2 #47)*
Christopher Kim, CFA, is a banker with Batts Brothers, an investment banking firm. Kim follows the energy industry and has frequent contact with industry executives. Kim is contacted by the CEO of a large oil and gas corporation who wants Batts Brothers to underwrite a secondary offering of the company's stock. The CEO offers Kim the opportunity to fly on his private jet to his ranch in Texas for an exotic game hunting expedition **if Kim's firm can complete the underwriting within 90 days**. According to CFA Institute Standards of Conduct, Kim:
- A) may accept the offer as long as he discloses the offer to Batts Brothers.
- B) may not accept the offer because it is considered lavish entertainment.
- C) must obtain written consent from Batts Brothers before accepting the offer.

<details><summary>Ver respuesta</summary>

**C.** El "**if**" lo convierte en **compensación adicional condicionada** a un resultado futuro → IV(B) → **consentimiento ESCRITO** del empleador. Revelarlo (A) no basta, y prohibirlo (B) es exceso de rigor. *(Mock: B. Repaso: A.)*
</details>

### 12. *(Mock 3 #22)*
Which of the following statements is most accurate about the Standard concerning knowledge of the law? Members and candidates are responsible for violations:
- A) that are proven by a regulatory authority.
- B) of which they are aware or should be aware.
- C) in which they knowingly participate or assist.

<details><summary>Ver respuesta</summary>

**C.** Frase textual de I(A): "**knowingly participate or assist**". A es demasiado laxa y B demasiado estricta. *(Tu respuesta: B.)*
</details>

### 13. *(Mock 2 #74)*
Judy Dudley, CFA, is an analyst and plans to visit a company that she is analyzing in order to prepare a research report. The Standard related to independence and objectivity:
- A) requires Dudley to pay for her own transportation costs and not to accept any gifts or compensation for writing the report, but allows her to accept accommodations and meals that are not lavish.
- B) requires Dudley not to accept any compensation for writing a research report, but allows her to accept company paid transportation, lodging, and meals.
- C) allows Dudley to accept transportation, lodging, expenses, and compensation for writing a research report, but requires that she disclose such an arrangement in her report.

<details><summary>Ver respuesta</summary>

**C.** El research pagado por el emisor **está permitido**, con pago fijo y **revelado**. La A mezcla una buena práctica (pagar tu viaje) con una prohibición falsa. 🚨 Desconfía de "requires… not to accept any". *(Tu respuesta: A, en el mock y en el repaso.)*
</details>

### 14. *(Mock 3 #20)*
Ray Brown, CFA, gives prospects his firm's marketing materials, not prepared by him, that indicate he has a graduate degree from State University, when in fact he did graduate work there but did not receive a degree. Brown informed the marketing department of this error when he first saw it. Brown has:
- A) violated the Standards by misrepresenting his qualifications.
- B) not violated the Standards because he has informed his firm of the mistake.
- C) not violated the Standards because he did not prepare the marketing materials or misrepresent his credentials to his firm.

<details><summary>Ver respuesta</summary>

**A.** Sigue **entregando** un material que **sabe** que es falso. Avisar del error no basta: tiene que **dejar de usarlo**. *(Tu respuesta: B, en el mock y en el repaso.)*
</details>

### 15. *(Mock 2 #32)*
Russell Finley, CFA, is a managing director at Wilson Brothers and is responsible for the supervision of all trading and sales operations. Finley receives information indicating that a sales assistant made personal trades on a restricted security. According to the Standard regarding responsibilities of supervisors, the **least appropriate** action for Finley to take is to:
- A) begin an investigation to determine the extent of the wrongdoing.
- B) restrict and increase the monitoring of the employee's activities at the firm.
- C) speak directly to the employee and attain assurance that the violation will not be repeated.

<details><summary>Ver respuesta</summary>

**C.** Una promesa **no basta**: el supervisor tiene que **investigar** (A) y **restringir o vigilar** (B). Ojo con el "**least**": marca V/F en cada opción y busca la F. *(Tu respuesta: A, en el mock y en el repaso.)*
</details>

### 16. *(Mock 2 #84)*
Lunar Wealth, a subsidiary of Galaxy Financial, has prepared GIPS-compliant performance data and asks Galaxy's president about his interest in presenting GIPS-compliant performance data, but he does not believe it is a priority. Lunar may:
- A) claim partial compliance with GIPS if Lunar's performance presentations are in compliance.
- B) not claim compliance with GIPS because compliance must be made on a company-wide basis.
- C) claim compliance with GIPS as long as Lunar is presented to the public as a distinct business entity.

<details><summary>Ver respuesta</summary>

**C.** "La firma" = la entidad distinta que **se presenta a los clientes**. Si Lunar se presenta como un negocio propio, **Lunar es la firma** y puede cumplir sin Galaxy. La B confunde "toda la **firma**" con "toda la **compañía**". *(Mock: A. Repaso: B.)*
</details>

### 17. *(Mock 3 #67)*
Recommended procedures for compliance with the Standard concerning misconduct suggest that firms in the investment industry should:
- A) periodically test their employees' knowledge of applicable laws, regulations, and the firm's code of ethics.
- B) periodically inform employees of violations that have occurred and the disciplinary actions that the firm took against the employees involved.
- C) check references of potential employees to verify that they are of good character and eligible for employment in the investment industry.

<details><summary>Ver respuesta</summary>

**C.** La lista de I(D) tiene 3 puntos: ① código de ética, ② lista de violaciones **POSIBLES** y sus sanciones, ③ revisar **referencias**. La B habla de violaciones que **ya ocurrieron** ("have occurred"). *(Tu respuesta: B, en el mock y en el repaso.)*
</details>

---

## ⚖️ Ethics: práctica (Día 2)

### 18. Code o Standards
*"Obedecer todas las leyes y regulaciones aplicables"*: ¿está en el **Code of Ethics** o en los **Standards**?

<details><summary>Ver respuesta</summary>

**Standards, en el I(A) Knowledge of the Law.** El Code son 6 actitudes (integridad, cuidado razonable, juicio independiente, animar a otros, integridad de los mercados, competencia propia y de otros). *(Tu respuesta: Code.)*
</details>

### 19. Definición de firma (GIPS)
Una firma tiene oficinas en **Lima** y **Bogotá**, y todas las decisiones se toman en Lima. ¿Puede definir "la firma" solo como la oficina de Lima?

<details><summary>Ver respuesta</summary>

**No.** La firma incluye **todas sus oficinas**. Lo que la define es cómo se presenta a los clientes, no dónde se decide. *(Tu respuesta: sí.)*
</details>

### 20. Las 4 partes de la IPS
Nombra las 4 partes de una IPS (Suitability, III(C)).

<details><summary>Ver respuesta</summary>

**① Identificación** del cliente → **② Objetivos** (retorno y riesgo) → **③ Restricciones** (liquidez, horizonte, impuestos, legales y regulatorias, circunstancias únicas) → **④ Benchmarks**.
🧠 ¿Quién es? → ¿Qué quiere? → ¿Qué lo limita? → ¿Cómo lo medimos?
*(Tu respuesta: horizonte, restricciones, liquidez, aversión al riesgo. Te faltaron Identificación y Benchmarks.)*
</details>

---

## 📉 Fixed Income: falladas del Mock 4 (repaso del 26-oct)

### 21. *(Mock 4 #150)*
Based on the following interest rates:

| | |
|---|---|
| 1-year spot rate | 3.0% |
| 1-year forward rate one year from now | 5.0% |
| 2-year forward rate one year from now | 6.5% |

The 3-year spot rate is closest to:
- A) 5.0%.
- B) 5.3%.
- C) 9.3%.

<details><summary>Ver respuesta</summary>

**B.** (1 + S₃)³ = 1,03 × 1,065² → S₃ = (1,1682)^(1/3) − 1 = **5,32 %**.
- Las tasas se encadenan como **piezas de un tren** 🚂: el 1y2y empieza donde termina el spot de 1 año. El 5 % (1y1y) **se pisa** con el 6,5 %: es un distractor.
- **Anualiza** (raíz cúbica). Prueba de rango: el resultado tiene que quedar entre 3 % y 6,5 %, así que 9,3 % es imposible.
*(Mock: C. En el repaso necesitaste ayuda con la anualización.)*
</details>

### 22. *(Mock 4 #153)*
An analyst collects the following spot rates, stated as annual bond-equivalent yields: 6-month spot rate = 6%, 12-month spot rate = 6.5%, 18-month spot rate = 7%, 24-month spot rate = 7.5%. Given only this information, the price of a 2-year, semiannual-pay, 10% coupon bond with a face value of $1,000 is closest to:
- A) $918.30.
- B) $1,000.00.
- C) $1,046.77.

<details><summary>Ver respuesta</summary>

**C.** Sin calcular: cupón 10 % > todas las spot rates → **prima** → precio > 1.000, así que solo queda la C.
Calculándolo: tasas **÷ 2** (3 %, 3,25 %, 3,5 %, 3,75 %), cupón 50 → 48,54 + 46,90 + 45,10 + 906,23 = 1.046,77.
*(Mock: A. En el repaso volvió a darte 918: usaste las tasas sin dividir por 2.)*
</details>

### 23. *(Mock 4 #100)*
The quoted add-on rate for a 120-day certificate of deposit is 0.25%, assuming a 365-day year. Given an initial principal amount of EUR 100 million, the redemption amount is closest to:
- A) 99.75 million.
- B) 100.08 million.
- C) 100.25 million.

<details><summary>Ver respuesta</summary>

**B.** FV = 100 × (1 + 120/365 × 0,0025) = 100,08 M. **Add-on suma** (CD) y **discount resta** (T-bill). La A usa lógica de discount, y la C aplica el 0,25 % anual completo a 120 días.
*(Mock: A. En el repaso preguntaste cómo se hacía.)*
</details>

### 24. *(Mock 4 #134)*
Recent economic data suggest an increasing likelihood that the economy will soon enter a recessionary phase. What is the most likely effect on the yields of lower-quality corporate bonds and on credit spreads of lower-quality versus higher-quality corporate bonds?
- A) Both will increase.
- B) Both will decrease.
- C) One will increase and one will decrease.

<details><summary>Ver respuesta</summary>

**A.** Yield = tasa del gobierno + spread. En recesión, la tasa del gobierno baja **un poco**, pero el spread de los bonos de baja calidad sube **mucho**. El spread domina → **el yield sube**, y **el spread también**. *(Tu respuesta: C, en el mock y en el repaso.)*
</details>

### 25. *(Mock 4 #149)*
Four non-convertible bonds have the indicated yield spreads to Treasury securities:

| Bond | Maturity | Government spread | Zero-volatility spread | Option-adjusted spread |
|---|---|---|---|---|
| W | 2 years | 156 bp | 155 bp | 130 bp |
| X | 3 years | 173 bp | 174 bp | 199 bp |
| Y | 5 years | 188 bp | 189 bp | 164 bp |
| Z | 10 years | 202 bp | 201 bp | 226 bp |

Based on these spreads, it is most likely that:
- A) Bond X is callable, and Bond Y is putable.
- B) Bond W is callable, and Bond Z is putable.
- C) Bond Z is callable, and the spot yield curve is inverted.

<details><summary>Ver respuesta</summary>

**B.** **C**allable → OAS más **C**hico que el Z-spread (W e Y). Putable → OAS más grande (X y Z). El G-spread ≈ el Z-spread indica una curva **plana**, no invertida.
*(Tu respuesta: A en el repaso, la regla aplicada al revés. Mock: C.)*
</details>

### 26. *(Mock 4 #175)*
In what way is approximate convexity different from effective convexity?
- A) Effective convexity takes embedded options into account, while approximate convexity does not.
- B) Effective convexity results in a more accurate estimate of an option-free bond's change in price than approximate convexity.
- C) Approximate convexity can be used with an unequal increase and decrease in yield, while effective convexity can only be used with an equal increase or decrease in yield.

<details><summary>Ver respuesta</summary>

**A.** En un bono **sin opciones** (option-free) las dos dan **lo mismo**. La effective solo marca la diferencia cuando el bono **tiene opciones**. 🚨 Si una opción dice "option-free", pregúntate si la diferencia existe sin opciones.
*(Tu respuesta: B en el repaso. Mock: C.)*
</details>

---

## 🧠 Equity: eficiencia de mercado (Día 3)

### 27. Insiders y la EMH *(práctica)*
Un estudio muestra que los **gerentes** que compran acciones de su propia empresa obtienen retornos anormales. ¿Qué forma de la EMH **contradice**?

<details><summary>Ver respuesta</summary>

**La strong.** Los gerentes usan **información privada**, y la strong es la única forma que dice que ni la información privada da retornos anormales. Pregúntate **qué información usó** quien ganó: precios pasados → weak, información pública → semi-strong, información privada → strong. *(Tu respuesta: weak.)*
</details>

### 28. Efecto value *(práctica)*
Las acciones con **P/B bajo** rinden más que las de P/B alto. ¿Cómo se llama esta anomalía? ¿Qué explicación **sin** ineficiencia podría tener?

<details><summary>Ver respuesta</summary>

**Efecto value.** Explicación sin ineficiencia: es una **compensación por riesgo**. Muchas empresas con P/B bajo tienen problemas (deudas, ventas cayendo), así que los inversionistas exigen más retorno. Ante cualquier anomalía, piensa primero en **riesgo** y después en **data mining**. *(Describiste qué pasa, pero te faltaron el nombre y la explicación.)*
</details>

---

## 🏦 Equity: acciones y depository receipts (Bloque 4)

### 29. ADR para levantar capital *(práctica)*
Una empresa brasileña quiere **emitir acciones nuevas** en la **Bolsa de Nueva York** para levantar capital. ¿Qué tipo de DR usa?

<details><summary>Ver respuesta</summary>

**ADR Level III.** Es el único que cumple las dos condiciones: se negocia en **bolsa** (Level II y III) **y** levanta capital (Level III y 144A). El GDR se negocia **fuera** de EE. UU. *(Tu respuesta: GDR.)*
</details>

### 30. DR y tipo de cambio *(práctica)*
Un DR de una empresa europea se negocia en dólares en EE. UU. Si el **euro se debilita** frente al dólar y la acción no se mueve en euros, ¿qué le pasa al precio del DR?

<details><summary>Ver respuesta</summary>

**Baja.** €100 × 1,20 = US$120 → €100 × 1,10 = US$110. Si la moneda de la empresa se debilita, el DR baja: el DR **no** elimina el riesgo cambiario. *(Tu respuesta: sube.)*
</details>

### 31. GDR vs. Global Registered Shares *(práctica)*
¿Qué diferencia hay entre un GDR y las Global Registered Shares?

<details><summary>Ver respuesta</summary>

El **GDR** es un **certificado** emitido por un **banco** (depository) que representa acciones, y se negocia fuera de EE. UU. Las **GRS** son **la acción ordinaria misma**, negociada en varias bolsas y monedas, **sin banco intermediario**. *(Dijiste dónde se negocia cada uno, pero te faltó lo del certificado y el banco.)*
</details>

---

## 🏭 Equity: análisis de industria y proyecciones (Bloque 5)

### 32. Tamaño de una industria *(práctica)*
¿Cómo se mide el **tamaño** de una industria?

<details><summary>Ver respuesta</summary>

Con **las ventas totales de TODAS las empresas** de la industria. Sumar las participaciones de las más grandes (concentration ratio) o elevarlas al cuadrado (HHI) mide la **concentración**, no el tamaño. *(Tu respuesta: "suma de sus participaciones, normal o al cuadrado".)*
</details>

### 33. Enfoque de proyección *(práctica)*
El analista proyecta que las ventas crecerán **20 % más rápido que el PIB nominal**. ¿Qué enfoque es?

<details><summary>Ver respuesta</summary>

**Crecimiento relativo al PIB** (*growth relative to GDP growth*), que es un enfoque top-down. El otro top-down es **mercado y participación**. Elige siempre el nombre **más específico**. Además, el cálculo es multiplicativo: 5 % × 1,20 = 6 %. *(Tu respuesta: "top-down".)*
</details>

---

## 💰 Equity: valoración (Bloque 6)

### 34. Último día para comprar con dividendo *(práctica)*
La holder-of-record date es el **jueves 10** (liquidación T+1). ¿Cuál es la ex-dividend date? ¿Hasta qué día tienes que comprar para recibir el dividendo?

<details><summary>Ver respuesta</summary>

Ex-dividend date: **miércoles 9** (un día hábil antes del record date). Para recibir el dividendo hay que comprar **a más tardar el martes 8**: **en** la ex-date ya no lo recibes. *(Respondiste "un día antes", pero te faltó el último día para comprar.)*
</details>

### 35. DDM multietapa *(práctica)*
No paga dividendos en los años 1 y 2. En el año 3 paga **US$ 3**, y después crece **4 %** para siempre. r = **12 %**. ¿Cuánto vale hoy?

<details><summary>Ver respuesta</summary>

**US$ 29,89.** V₂ = 3 / (0,12 − 0,04) = 37,50 → V₀ = 37,50 / 1,12² = 29,89. El **r − g** va solo en el denominador de Gordon; para **descontar** siempre se usa **r**. *(Tu respuesta: 32,15, descontando al 8 %.)*
</details>

### 36. Enterprise value *(práctica)*
Acciones a valor de mercado = US$ 800 M, deuda = US$ 300 M, caja = US$ 100 M. ¿Cuál es el EV?

<details><summary>Ver respuesta</summary>

**US$ 1.000 M** = 800 + 300 − 100. Lo que **heredas** (la deuda) suma y lo que te **llevas** (la caja) resta. *(Tu respuesta: 600, con los signos invertidos.)*
</details>

### 37. Gordon con D₀ *(Basada en tu M3 #144)*
An analyst develops the following information to value a common stock: last year's earnings per share = $4.00, dividend payout ratio = 50%, return on equity = 12%, required return = 10%. Using the Gordon growth model, the value of the stock is closest to:
- A) $50.00.
- B) $53.00.
- C) $106.00.

<details><summary>Ver respuesta</summary>

**B.** D₀ = 4 × 0,50 = 2,00 · g = 0,50 × 12 % = 6 % · **D₁ = 2,00 × 1,06 = 2,12** · V = 2,12 / 0,04 = 53,00. *"Last year"* = D₀ → **multiplica por (1 + g)**. *(Tu respuesta: A, usando D₀.)*
</details>

### 38. Preferente con crecimiento de utilidades *(práctica)*
Una preferente paga **US$ 5** fijos al año y r = 8 %. ¿Cuánto vale? Si las utilidades de la empresa empiezan a crecer 10 %, ¿cambia su valor?

<details><summary>Ver respuesta</summary>

**US$ 62,50** = 5 / 0,08. **No cambia**: el dividendo de una preferente es **fijo**, así que el crecimiento de las utilidades es un distractor. *(Calculaste bien el valor, pero no respondiste la segunda parte.)*
</details>

---

## 📉 Fixed Income: repaso del Mock A de CFA Institute (2-nov)

### 39. Convexidad en el cambio de precio *(Mock A #34)*
Duración modificada **5**, convexidad **30**. Si el rendimiento **sube 100 pb**, ¿cuál es el cambio porcentual aproximado del precio?

<details><summary>Ver respuesta</summary>

**−4,85 %** = (−5 × 0,01) + (½ × 30 × 0,01²) = −5,00 % + 0,15 %. La convexidad **siempre suma**, y Δy va **en decimal y al cuadrado**: (0,01)² = 0,0001. Si usas "1" en vez de 0,01, la convexidad te da 15 % en vez de 0,15 %. *(En el mock restaste la convexidad. En el repaso te dio 0,1.)*
</details>

### 40. Convexidad aproximada *(Mock A #20)*
YTM 1,35 % → precio 97,5 · YTM 1,50 % → 97,0 (actual) · YTM 1,65 % → 96,8. ¿Convexidad aproximada?

<details><summary>Ver respuesta</summary>

**1.375** = (97,5 + 96,8 − 2 × 97) / (0,0015² × 97) = 0,3 / 0,00021825. Convexidad: **suma** en el numerador, **sin el 2** y con Δy **al cuadrado** en el denominador. Duración: (PV₋ − PV₊) / (2 × Δy × PV₀). En la BA II Plus, usa paréntesis y calcula 2 × 97 = 194 aparte (modo Chain). *(En el mock usaste la fórmula de la duración: 2,4.)*
</details>

### 41. Conversión de frecuencias *(Mock A #13)*
Un bono semestral tiene YTM de 6,00 %. ¿Cuál es su equivalente con capitalización trimestral?

<details><summary>Ver respuesta</summary>

**5,96 %**: (1,03)² = (1 + APR/4)⁴ → APR = 4 × (1,03^0,5 − 1). Con ICONV: NOM 6, C/Y 2 → CPT EFF; C/Y 4 → CPT NOM. **Más** capitalizaciones → tasa nominal **más baja**. *(En el mock lo trataste como tasa anual. En el repaso no sabías cómo hacerlo.)*
</details>

### 42. Spreads y resultado del bono *(Mock A #3)*
¿Qué favorece el resultado de un bono con riesgo de crédito durante el período de tenencia: spreads que se amplían, una demanda fuerte que estrecha los spreads, o un deterioro de la economía?

<details><summary>Ver respuesta</summary>

**La demanda fuerte que estrecha los spreads.** Spread ↓ → rendimiento ↓ → precio ↑. Un deterioro económico **amplía** los spreads y baja el precio. El spread es el "precio del miedo". *(Mock: spreads que se amplían. Repaso: deterioro de la economía.)*
</details>

### 43. Riesgo de prepago *(Mock A #4)*
¿Qué tiene mayor riesgo de prepago: un covered bond, un pass-through hipotecario o un ABS de tarjetas en su período de lockout?

<details><summary>Ver respuesta</summary>

**El pass-through hipotecario**: el prepago **pasa directo** al inversionista. En el covered bond el emisor **reemplaza** los préstamos prepagados, y en el lockout el capital **se reinvierte**. *(Mock: covered bond. Repaso: lockout.)*
</details>

### 44. Bono de una ciudad *(Mock A #81)*
¿Cómo se clasifica un bono emitido por una ciudad: supranacional, no soberano o de agencia?

<details><summary>Ver respuesta</summary>

**No soberano** (gobiernos locales o regionales). **Supranacional** = organismo de **varios países** (Banco Mundial, FMI). **Agencia** = entidad creada por el gobierno (Fannie Mae). *(Respondiste supranacional en el mock **y** en el repaso.)*
</details>

### 45. Duración con bonos callable y ABS *(Mock A #74, acertada al azar 🎲)*
Un portafolio tiene bonos fijos, callable y ABS. ¿Qué duración usas?

<details><summary>Ver respuesta</summary>

**Efectiva.** Con flujos inciertos (opciones o prepagos) no hay un YTM bien definido, así que Macaulay y modificada no sirven. La efectiva usa cambios en la **curva de referencia** y un modelo. *(Repaso: modificada.)*
</details>

### 46. Notching *(Mock A #90, acertada al azar 🎲)*
El notching de la deuda subordinada de emisores **especulativos**, frente al de emisores con grado de inversión, es: ¿menor, igual o mayor?

<details><summary>Ver respuesta</summary>

**Mayor.** Con más probabilidad de default, el orden de cobro importa más. **Peor calificación senior → mayor notching.** *(Repaso: menor.)*
</details>

---

## 📈 Equity: repaso del Mock A de CFA Institute (2-nov)

### 47. Clasificación de una orden limitada *(Mock A #10)*
Mejor ask $72, mejor bid $69. Entra una **orden limitada de venta a $73**. ¿Toma el mercado, hace el mercado o está detrás del mercado?

<details><summary>Ver respuesta</summary>

**Detrás del mercado**: hay vendedores más baratos ($72). Venta ≤ bid → **toma** el mercado · entre bid y ask → **hace** un nuevo mercado · por encima del ask → **detrás**. Para compras, al revés. Pregúntate: ¿mi orden cruza al otro lado (toma), es la mejor de su lado (hace) o hay otras mejores (detrás)? *(Mock: toma. Repaso: hace.)*
</details>

### 48. Estructura de mercado *(Mock A #14)*
Una gestora debe vender un **bloque muy grande** de una acción **poco negociada**. ¿Dónde lo ejecuta: order-driven, quote-driven o brokered?

<details><summary>Ver respuesta</summary>

**Brokered market**: un corredor busca un comprador para activos únicos o poco líquidos (inmuebles, arte, bloques grandes). En **order-driven** casi no hay órdenes del otro lado, y en **quote-driven** ningún dealer quiere ese inventario. *(Respondiste order-driven en el mock **y** en el repaso.)*
</details>

### 49. DDM con precio futuro *(Mock A #52)*
D₀ = $2, crecimiento histórico 3 %, crecimiento esperado 6 % durante 3 años, precio esperado en el año 3 = $40, r = 12 %. ¿Valor intrínseco?

<details><summary>Ver respuesta</summary>

**$33,85.** D₁ = 2,12 · D₂ = 2,2472 · D₃ = 2,382 → PV de D₁, D₂ y (D₃ + 40). Con el worksheet CF: C01 = 2,12 · C02 = 2,2472 · C03 = 42,382 · I = 12 · NPV. Si te dan el **precio futuro**, ese es el valor terminal: **no** uses Gordon. El crecimiento histórico es un distractor. *(Mock: Gordon con el histórico, 22,89. Repaso: 21,09, y en la práctica volviste a usar Gordon.)*
</details>

### 50. Índice de precio vs. retorno total *(Mock A #27, acertada al azar 🎲)*
En el **lanzamiento**, ¿el índice de precio vale menos, igual o más que el de retorno total?

<details><summary>Ver respuesta</summary>

**Igual.** Parten en el mismo valor. Con el tiempo, el de retorno total queda por encima porque suma los dividendos reinvertidos. *(Repaso: menor.)*
</details>

### 51. Función de los dealers *(Mock A #61, acertada al azar 🎲)*
¿Qué hacen principalmente los dealers: organizar IPOs, dar liquidez o titularizar activos?

<details><summary>Ver respuesta</summary>

**Dar liquidez**: compran y venden por cuenta propia desde su inventario. Los IPOs son de los **bancos de inversión**, y la titularización es de los **securitizers**. Dealer = "yo te compro". Broker = "yo te busco quién compre". *(Repaso: titularizar.)*
</details>

### 52. Preferente retractable *(Mock A #89, acertada al azar 🎲)*
Preferente 8 % sobre par $50, dividendos trimestrales, precio $35, retractable a la par en 3 años, r nominal 12 %, crecimiento de las utilidades 4 %. ¿Valor?

<details><summary>Ver respuesta</summary>

**$45,02.** Como cotiza muy por debajo de la par, la retracción es probable: valórala como un **bono**. N = 12, I/Y = 3, PMT = 1, FV = 50 → PV = 45,02. $4 / 0,12 = 33,33 la trata como perpetua, y 52,00 aplica Gordon (el 4 % es un distractor). *(Repaso: no sabías cómo hacerla.)*
</details>

---

## ⚖️ Ethics: repaso del Mock A de CFA Institute (2-nov)

### 53. Afirmaciones sobre GIPS *(Mock A #5)*
¿Cuál es compatible con GIPS: "todos nuestros portafolios domésticos cumplen GIPS", "nuestros consultores respaldan GIPS" o "al cumplir GIPS, los clientes ya no necesitan debida diligencia"?

<details><summary>Ver respuesta</summary>

**"Nuestros consultores respaldan GIPS."** Los consultores no pueden declarar cumplimiento, pero sí pueden respaldar los estándares. Limitar el cumplimiento a una parte de la firma ("portafolios domésticos") es **cumplimiento parcial**, y GIPS es todo o nada. GIPS tampoco reemplaza la debida diligencia. *(Respondiste "portafolios domésticos" en el mock **y** en el repaso.)*
</details>

### 54. Cómo redactar el código de ética *(Mock A #12)*
¿Qué conviene recomendar sobre la redacción del código de ética de una firma?

<details><summary>Ver respuesta</summary>

**Lenguaje simple, sin procedimientos detallados.** Los procedimientos van en **otro documento**. Integrarlos produce un lenguaje legalista e incomprensible. Es la misma lógica del Code (principios) vs. los Standards (reglas). *(Mock: integrarlo con los procedimientos. Repaso: incluir todas las leyes.)*
</details>

### 55. Compensación adicional sin permiso *(Mock A #27)*
Una CFA asesora a una amiga en su tiempo libre a cambio de una donación a su causa favorita, y solo le **avisa** a su firma por email. ¿Hay violación?

<details><summary>Ver respuesta</summary>

**Sí, IV(B) Additional Compensation.** Se necesita el **permiso escrito** del empleador **antes** de aceptar. Avisar no es lo mismo que obtener permiso, y la donación también cuenta como compensación. Compáralo con Brenner (M3 #56): avisó por email **y** le dieron permiso → no viola. *(Mock: no. Repaso: no, porque avisó por email.)*
</details>

---

## 🏗️ Alternatives (repaso de los Mocks 2, 3 y 4, 3-nov)
*(Enunciados resumidos.)*

### 56. Características de las alternativas *(Kaplan M3 #139)*
Frente a las inversiones tradicionales, ¿qué es **menos** probable en las alternativas: comisiones más altas, **menos** especialización del gestor o portafolios más concentrados?

<details><summary>Ver respuesta</summary>

**Menos especialización del gestor** (en realidad tienen **más**). Es un "least likely": marca V/F en cada opción y busca la F. La trampa estaba en la palabra **"less"**. *(Repaso: portafolios concentrados.)*
</details>

### 57. Comisiones con hard hurdle *(Kaplan M3 #174)*
Fondo de $100 M al inicio, gestión 2 % sobre el inicio, incentivo 20 % neto de gestión con **hard hurdle de 5 %**. Valor final antes de comisiones: $110 M. ¿Retorno neto?

<details><summary>Ver respuesta</summary>

**7,4 %.** Gestión 2 → ganancia neta 8 → hurdle 5 → exceso 3 → incentivo 0,6 → comisiones 2,6 → 107,4. El hurdle **no se le resta al inversionista**: solo define sobre qué parte cobra el gestor. *(Repaso: 5,6 %.)*
</details>

### 58. Comisiones con soft hurdle y high-water mark *(Kaplan M4 #127, acertada al azar 🎲 en el mock)*
AUM $250 M al cierre del año anterior, gestión 2 % sobre el valor de **fin** de año, incentivo 20 % neto de gestión, **soft hurdle 4 %**, **high-water mark $275 M**. Retorno bruto: 20 %. ¿Retorno neto?

<details><summary>Ver respuesta</summary>

**16,1 %.** 300 → gestión 6 (sobre el **fin**) → 294 (17,6 % > 4 %) → incentivo 20 % × (294 − 275) = 3,8 → comisiones 9,8 → 290,2 / 250 − 1. *(Repaso: 17,3 %.)*
</details>

### 59. High-water mark: ¿bruto o neto? *(práctica)*
Inicio $180 M, high-water mark $200 M, gestión 1 % sobre el inicio, incentivo 20 % neto de gestión, soft hurdle 5 %. Valor final bruto: $220 M. ¿Retorno neto?

<details><summary>Ver respuesta</summary>

**19,2 %.** 220 − 1,8 = 218,2 → incentivo 20 % × (218,2 − 200) = 3,64 → 214,56 / 180 − 1. Si el incentivo es **neto de gestión**, el high-water mark se compara contra el valor **después** de la comisión de gestión (218,2), no contra el bruto (220). *(Repaso: 19,0 %, usando el bruto.)*
</details>

### 60. Etapas del venture capital *(Kaplan M3 #121)*
¿En qué etapa del desarrollo de una empresa le da capital un fondo de venture capital para **prepararla para la IPO**: formativa, later stage o mezzanine?

<details><summary>Ver respuesta</summary>

**Mezzanine stage**: el último paso antes de salir a bolsa ("entrepiso" entre privada y pública). Later stage = ya vende y financia la **expansión**. Formativa = idea y primer producto. No confundir con la **deuda** mezzanine (deuda subordinada). *(Repaso: later stage.)*
</details>

---

## ⚖️ Ethics: las más difíciles de los Mocks 2, 3 y 4 (2-nov)

### 61. Market maker con información privilegiada *(Kaplan M3 #13, acertada al azar 🎲 en el mock)*
Un broker-dealer lidera una oferta secundaria de una acción en la que hace mercado hace 5 años, y tiene MNPI sobre la oferta. ¿Qué debe hacer: dejar de ser underwriter, seguir como market maker tomando solo el lado contrario de órdenes no solicitadas, o dejar de hacer mercado durante la oferta?

<details><summary>Ver respuesta</summary>

**Seguir como market maker, de forma pasiva** (solo el lado contrario de órdenes **no solicitadas** de clientes). Retirarse por completo sería una **señal** al mercado de que algo pasa. Ser underwriter y market maker a la vez sí está permitido. *(Repaso: retirarse durante la oferta.)*
</details>

### 62. Viaje condicionado a un resultado *(Kaplan M2 #47)* ⚠️ fallada 3 veces
A un banquero le ofrecen un viaje en jet privado y una cacería **si** su firma completa una emisión en 90 días. ¿Puede aceptar si lo revela, no puede porque es lujoso, o necesita el consentimiento escrito de su firma?

<details><summary>Ver respuesta</summary>

**Consentimiento escrito de su firma** (IV(B) Additional Compensation). El **"if"** lo condiciona a un resultado futuro → es compensación adicional, no un regalo. Lo que importa **no es si es lujoso**, sino **si está condicionado**. 🌳 ¿Hay un "IF"? → permiso ESCRITO. *(Mock: no puede, por lujoso. Repaso: puede si lo revela. 2-nov: no puede, por lujoso.)*
</details>

---

## 🌾 Alternatives: recursos naturales (3-nov)

### 63. Derivados vs. commodity física *(Kaplan M4 #126)* ⚠️ fallada 2 veces
¿Cuál es la razón **menos** probable para invertir en **derivados** de commodities en vez de en la commodity física: convenience yield, mayor transparencia de precios o correlación positiva con la inflación?

<details><summary>Ver respuesta</summary>

**El convenience yield**: solo lo recibe quien tiene la commodity **física**. Los futuros cotizan en bolsa (más transparencia) y siguen a la inflación. "Least likely reason" = algo que el derivado **no** te da, no la razón "menos importante". *(Respondiste transparencia en el mock **y** en el repaso.)*
</details>

### 64. Inversión directa en criptomonedas *(Kaplan M3 #2)*
¿Cuándo hay una inversión **directa** en una criptomoneda: cuando la transacción queda registrada en la blockchain, cuando se liquida la compra de una acción cripto o cuando se toma un futuro sobre cripto?

<details><summary>Ver respuesta</summary>

**Cuando la transacción queda registrada en la blockchain**: tienes la criptomoneda misma. Las acciones de empresas cripto, los futuros y los ETFs son **indirectas**. *(Repaso: la acción cripto.)*
</details>

---

## 🧪 Alternatives: examen de comprobación (4-nov, 22/25)

### 65. MOIC vs. TIR *(Mock A #64)*
Dos fondos de private equity duplican el capital, pero A lo logra más rápido. ¿Cómo se compara su MOIC?

<details><summary>Ver respuesta</summary>

**Es igual** (2,0× los dos). El MOIC solo mide cuántas veces multiplicaste el dinero, **sin considerar el tiempo**. La que premia la velocidad es la **TIR**. *(Repaso: A tiene menor MOIC.)*
</details>

### 66. ¿Cuándo se activa el clawback? *(Mock A #65)* ⚠️ fallada 2 veces
¿Malas salidas al inicio y ganancias después, éxitos al inicio y más éxitos, o éxitos al inicio y pérdidas después?

<details><summary>Ver respuesta</summary>

**Éxitos al inicio y pérdidas después**: el GP cobró incentivo sobre ganancias que después se perdieron, y tiene que devolverlo. Si al inicio no hay ganancias, el GP nunca cobró de más. *(Respondiste "malas al inicio y ganancias después" en el mock **y** en el repaso.)*
</details>

### 67. High-water mark = máximo histórico *(Mock A #37)* ⚠️ fallada 2 veces
Fondo de $200 M, 2 y 20, las dos sobre el valor de **fin** de período, con high-water mark. Después de comisiones: año 1 = $227,2 M, año 2 = $215,6 M. El año 3 cierra en $250 M antes de comisiones. ¿Comisiones totales del año 3?

<details><summary>Ver respuesta</summary>

**$9,56 M** = gestión 2 % × 250 = 5 + incentivo 20 % × (250 − **227,2**) = 4,56. El high-water mark es el **máximo histórico** después de comisiones (227,2), **no** el valor del año anterior (215,6). *(Respondiste 11,88, usando 215,6, en el mock **y** en el repaso.)*
</details>

---

## 🔀 Derivatives (repaso de los Mocks 2, 3, 4 y A, 4-nov)

### 68. Clearing central obligatorio *(Kaplan M3 #97)*
¿Qué resulta más probablemente de un mandato de clearing central: más revelación de operaciones, dispersión del riesgo de contraparte o estandarización de los contratos?

<details><summary>Ver respuesta</summary>

**Más revelación de operaciones.** El riesgo de contraparte se **concentra** en la CCP (no se dispersa), y los contratos OTC siguen siendo **personalizables**. *(Repaso: dispersión del riesgo.)*
</details>

### 69. Payoff del vendedor de una put *(Kaplan M4 #144)* ⚠️ fallada 2 veces
Al vencimiento la acción vale $43. ¿Qué resultado tiene el **vendedor** (writer) de una put con strike $45 (sin considerar la prima)?

<details><summary>Ver respuesta</summary>

**Pierde $2.** El comprador ejerce: el vendedor tiene que **comprar a 45** algo que vale 43. Primero calcula el payoff del **comprador** (max(0, 45 − 43) = 2) y, si preguntan por el vendedor, **cámbiale el signo**. Subraya siempre *buyer* o *writer*. *(Respondiste "gana $2" en el mock **y** en el repaso.)*
</details>

### 70. Valor vs. ganancia de una call *(Mock A #55)* ⚠️ fallada 2 veces
Compraste una call por $7, strike $60, cuando el subyacente estaba en $58. Al vencimiento vale $69. ¿Cuál es el **valor** de la call?

<details><summary>Ver respuesta</summary>

**$9** = max(0, 69 − 60). La **ganancia** sería 9 − 7 = $2. "Value / payoff / worth" → **sin** restar la prima. "Profit / gain / loss" → **con** la prima. El $58 es un distractor. *(Mock: $2, la ganancia. Repaso: no sabías cómo hacerla.)*
</details>

### 71. Arbitraje de un forward mal valorado *(Kaplan M4 #154)*
Por un error, un forward se emitió **ignorando el convenience yield**. Para arbitrarlo, ¿en qué tendrías una posición **larga**: el forward, el subyacente o el activo libre de riesgo?

<details><summary>Ver respuesta</summary>

**En el subyacente.** El convenience yield **resta** en el precio del forward: si se ignora, el forward queda **caro** → vender el forward, **comprar el subyacente** y pedir prestado (corto en el activo libre de riesgo). Olvidar un beneficio → forward caro. Olvidar un costo → forward barato. *(Repaso: el activo libre de riesgo.)*
</details>

### 72. Precio de un forward *(Kaplan M3 #165)*
Para un activo sin costos ni beneficios de tenencia, el precio forward de no-arbitraje es: ¿el spot, el valor futuro del spot o cero al inicio?

<details><summary>Ver respuesta</summary>

**El valor futuro del spot:** F₀ = S₀ × (1 + r)^T. "Cero al inicio" es el **valor** del contrato, no su **precio**. *(Repaso: cero al inicio.)*
</details>

### 73. FRAs que replican un swap *(Kaplan M2 #130)*
Si se replica un swap con FRAs, cada FRA tiene una tasa igual a: ¿la fija del swap y valor cero, la flotante y valor cero, o la fija pero con un valor que puede no ser cero?

<details><summary>Ver respuesta</summary>

**La tasa fija del swap, pero cada FRA puede valer distinto de cero** (off-market). Solo **la suma** vale cero al inicio. *(Repaso: la flotante y valor cero.)*
</details>

### 74. Precio de un swap *(Mock A #40)* ⚠️ fallada 2 veces
¿Qué es el **precio** de un swap de pagar fijo y recibir flotante?

<details><summary>Ver respuesta</summary>

**La tasa fija que hace que el swap valga cero al inicio.** "PV de flotantes − PV de fijos" es el **valor** del swap, no su precio. **Precio** = lo que se pacta (un precio o una tasa). **Valor** = cuánto gana o pierde cada parte. *(Respondiste "PV de flotantes − PV de fijos" en el mock **y** en el repaso.)*
</details>

> 📝 **Nota sobre Kaplan M4 #113 (net cost of carry = −2):** Kaplan usa el signo de forma inconsistente (en M3 #154 y M4 #94 lo define como costos − beneficios, y aquí como beneficios − costos). Usa siempre F₀ = (S₀ − PV beneficios + PV costos) × (1 + r)^T y fíjate en qué significa el signo en cada enunciado. Lo que siempre está mal es **no capitalizar** el carry (35 × 1,03 + 2 = 38,05).

### 75. Valor temporal de una put *(Kaplan M3 #138)*
¿Qué aumenta el **valor temporal** de una put: subir el strike, subir la volatilidad o bajar el precio del subyacente?

<details><summary>Ver respuesta</summary>

**Subir la volatilidad.** Cambios en S o en X afectan el valor **intrínseco**. Cambios en σ o en T afectan el valor **temporal**. *(Repaso: bajar el precio del subyacente.)*
</details>

### 76. Prima de una put in the money con tiempo *(Kaplan M3 #162)*
Vendes una put a 6 meses, strike 23, con el subyacente en 20. ¿La prima es igual, menor o mayor que 3?

<details><summary>Ver respuesta</summary>

**Mayor que 3**: intrínseco (23 − 20 = 3) **+ valor temporal positivo**, porque quedan 6 meses. Solo al vencimiento prima = intrínseco. *(Repaso: menor que 3.)*
</details>

### 77. Binomial: promedio ponderado vs. valor de hoy *(Kaplan M4 #160)* ⚠️ fallada 2 veces
En un binomial neutral al riesgo, el promedio ponderado de los valores de la opción después de subir y de bajar es: ¿igual, menor o mayor que el valor de hoy?

<details><summary>Ver respuesta</summary>

**Mayor.** El promedio es el valor **dentro de un período**: hay que **descontarlo** con (1 + r) para tener el valor de hoy, que es más chico. *(Mock: menor. Repaso: igual.)*
</details>

### 78. Bono corto sintético *(Kaplan M3 #146)*
Con put-call parity, ¿qué se **compra** para crear un bono libre de riesgo **corto** sintético: una put, una call o la acción?

<details><summary>Ver respuesta</summary>

**Una call.** S + p = c + PV(X) → −PV(X) = c − S − p → **comprar la call**, vender en corto la acción y vender la put. Método: despeja, invierte los signos si lo piden corto, y lee + = compras, − = vendes. *(Repaso: la acción.)*
</details>

### 79. Forward corto sintético *(Kaplan M2 #148)*
¿Con qué se replica un forward **corto** (sin costos ni beneficios)?

<details><summary>Ver respuesta</summary>

**Short call + long put + short bono.** PV(F₀) + p = c + PV(X) → forward **largo** = long call + short put + long bono → para el **corto**, se invierten todos los signos. *(Repaso: la versión larga.)*
</details>

### 80. Put-call-forward parity: p − c *(Kaplan M4 #121 y Mock A #23)* ⚠️ fallada 4 veces
Según la paridad put-call-forward, ¿a qué es igual **p − c**?

<details><summary>Ver respuesta</summary>

**PV(X − F₀)** = "put menos call = strike menos forward", **los dos descontados**. Sale de PV(F₀) + p = c + PV(X). No aparece S₀. *(M4 #121: mock A y repaso B. Mock A #23: mock "PV(F − S)" y repaso igual.)*
</details>

### 81. Precio mínimo de una call europea *(Mock A #30)* ⚠️ fallada 2 veces
Spot €50, strike €45, r = 2 % anual, 6 meses. ¿Precio mínimo de la call?

<details><summary>Ver respuesta</summary>

**€5,44** = 50 − 45 / 1,02^0,5. El strike se **descuenta** (se divide), nunca se capitaliza. Prueba de sentido común: pagar el strike más tarde favorece al comprador → la call vale **más** que S − X = 5. *(Respondiste 4,55, capitalizando el strike, en el mock **y** en el repaso.)*
</details>

> 🧠 **Truco de las paridades (sin fórmula):** algo que **gana si sube** (acción o forward largo) = **long call + short put** (+ bono largo). El **corto** = todo al revés. Y **p − c = PV(X − F₀)**: "put menos call = strike menos forward", todo descontado y sin S₀.

---

## 🧺 Portfolio Management: falladas de los mocks (7-nov, 6/16)

### 82. Riesgo que no se diversifica *(Kaplan M4 #125)* ⚠️ fallada 2 veces
¿Qué riesgo es el **menos** probable de reducirse diversificando: el de mercado, el específico de la empresa o el no sistemático?

<details><summary>Ver respuesta</summary>

**El de mercado** (sistemático). "Firm-specific" y "unsystematic" son lo mismo y se eliminan diversificando. Como ese riesgo se elimina gratis, el mercado **solo paga por el sistemático** (beta). *(Mock: A? → repaso: no sistemático.)*
</details>

### 83. Desviación estándar con correlación −1 *(Mock A #42)* ⚠️ fallada 2 veces
50 % con σ = 6 % y 50 % con σ = 10 %, ρ = −1. ¿σ del portafolio?

<details><summary>Ver respuesta</summary>

**2 %** = |0,5 × 6 − 0,5 × 10|. Con la fórmula completa: 9 + 25 − **2** × 0,5 × 0,5 × 6 × 10 = 4 → √4 = 2. Si olvidas el **2** del término de covarianza da 4,4 %. Con ρ = ±1 usa el atajo. *(Respondiste 4,4 % en el mock **y** en el repaso.)*
</details>

### 84. CAPM: ¿sobre o subvalorada? *(Kaplan M4 #168)* ⚠️ fallada 2 veces
β = 0,9, retorno estimado 10 %, Rf = 7 %, Rm = 11 %. ¿La acción está sobrevalorada, subvalorada o bien valorada?

<details><summary>Ver respuesta</summary>

**Sobrevalorada.** Requerido = 7 + 0,9 × 4 = 10,6 % > estimado 10 %. Rinde **menos** de lo que debería por su riesgo → estás pagando **caro** → por **debajo** de la SML. Precio y retorno van al revés. *(Respondiste subvalorada en el mock **y** en el repaso.)*
</details>

### 85. Retorno anormal con el market model *(Mock A #36, acertada al azar 🎲)*
Retorno real 10,5 %, β = 0,8, Rm = 12 %, Rf = 2 %. ¿Retorno anormal?

<details><summary>Ver respuesta</summary>

**0,5 %** = 10,5 − [2 + 0,8 × (12 − 2)]. El CAPM lleva el **Rf dos veces**: sumando adelante y restando dentro del paréntesis. Sin el de adelante da 2,5 %. *(Repaso: 2,5 %.)*
</details>

### 86. Pendiente de la CAL *(Mock A #72, acertada al azar 🎲)*
¿La pendiente de la CAL es la beta del mercado, el precio de mercado del riesgo o la prima de riesgo de mercado?

<details><summary>Ver respuesta</summary>

**El precio de mercado del riesgo** (el ratio de Sharpe: (E(Rp) − Rf) / σ). La prima de riesgo de mercado (Rm − Rf) es la pendiente de la **SML**. CAL va con **σ**, SML va con **β**. *(Repaso: prima de riesgo de mercado.)*
</details>

### 87. Objetivo de riesgo relativo *(Mock A #32)* ⚠️ fallada 2 veces
Un cliente quiere quedar dentro de ±3 % del benchmark con 95 % de probabilidad. ¿Qué tipo de objetivo es?

<details><summary>Ver respuesta</summary>

**De riesgo relativo** (tracking risk). No pide **ganarle** al benchmark (eso sería retorno relativo), sino **no alejarse** de él. Banda ± y probabilidad = riesgo. *(Respondiste retorno relativo en el mock **y** en el repaso.)*
</details>

### 88. Asignación estratégica *(Mock A #29)* ⚠️ fallada 2 veces
¿Qué resulta de combinar las expectativas de **largo plazo** del mercado con la IPS?

<details><summary>Ver respuesta</summary>

**La asignación estratégica de activos** (la política de largo plazo). La **táctica** son desviaciones de **corto** plazo según pronósticos. El presupuesto de riesgo reparte el riesgo total. *(Mock: táctica. Repaso: presupuesto de riesgo.)*
</details>

### 89. Aseguradoras de propiedad y accidentes *(Kaplan M4 #107, acertada al azar 🎲)*
¿Cómo son el horizonte y la tolerancia al riesgo de una aseguradora de propiedad y accidentes?

<details><summary>Ver respuesta</summary>

**Horizonte corto y baja tolerancia al riesgo**: los reclamos llegan pronto y de forma impredecible. Las aseguradoras de **vida** son las de horizonte **largo**. Pregúntate **cuándo tiene que pagar**. *(Repaso: largo y alta.)*
</details>

### 90. Endowments vs. fundaciones *(Mock A #46)* ⚠️ fallada 2 veces
¿Es correcto que los endowments suelen invertir mucho en alternativas? ¿Y que las fundaciones sostienen los servicios de instituciones sin ánimo de lucro?

<details><summary>Ver respuesta</summary>

**Sí** a lo primero (horizonte muy largo, alta tolerancia al riesgo). **No** a lo segundo: eso describe a un **endowment** (sostiene a UNA institución). Las **fundaciones** dan **donaciones** a otros. *(Elegiste la definición cambiada en el mock **y** en el repaso.)*
</details>

### 91. Riesgos no financieros *(Kaplan M4 #155)* ⚠️ fallada 2 veces
¿Cuál es un riesgo **no financiero**: de crédito, de liquidez o de solvencia?

<details><summary>Ver respuesta</summary>

**De solvencia.** Los **financieros** son solo 3: **mercado, crédito y liquidez**. Todo lo demás (operacional, solvencia, legal, regulatorio, de modelo, de liquidación, reputacional) es no financiero. *(Respondiste crédito en el mock **y** en el repaso.)*
</details>

<!-- Portfolio Mgmt: diagnóstico Kaplan M2 + M3 (7-nov-2026, 21/36) -->

### 92. Cómo se estima el beta *(Kaplan M2 #93)*
El beta se estima mejor con la pendiente de: ¿la CML, la SML o la characteristic line del título?

<details><summary>Ver respuesta</summary>

**La characteristic line**: es la **regresión** de los retornos del título contra los del mercado, y su pendiente es el beta. En la SML el beta ya es el **eje X** (su pendiente es Rm − Rf). En la CML el eje es σ. *(Respondiste CML.)*
</details>

### 93. Correlaciones: ¿cuál prefiere MENOS el averso al riesgo? *(Kaplan M2 #102)*
Pares: W–Y = +0,6 · X–Y = −0,1 · X–Z = −0,3. ¿Cuál portafolio **least prefer** un inversor averso al riesgo?

<details><summary>Ver respuesta</summary>

**W–Y (+0,6)**: la correlación **más alta** es la que menos reduce el riesgo. X–Z (−0,3) es la **más** preferida. *(Elegiste X–Z: no leíste el "least").*
</details>

### 94. Smart beta *(Kaplan M2 #116 y M3 #103)*
¿Qué estilo es el smart beta? ¿Y qué participación de mercado crece, la activa o la pasiva?

<details><summary>Ver respuesta</summary>

Si las opciones son **active / passive / fundamental**, es **passive** (sigue reglas fijas). Si una opción dice **"blend of active and passive"**, esa es la correcta (sigue un índice pero se inclina a factores). La que **crece** es la **pasiva** (≈ 1/5 de los activos, no la mitad). *(Respondiste "fundamental" y "la activa crece".)*
</details>

### 95. Diversification ratio *(Kaplan M2 #134 y M3 #178)*
¿Qué portafolio tiene el **menor** diversification ratio? ¿Y qué pasa con el ratio si agregas un título con σ igual al promedio?

<details><summary>Ver respuesta</summary>

**DR = σ del portafolio / promedio de las σ individuales.** Mientras más diversificado, **más bajo**. El menor es el de **30 acciones de industrias distintas**. Agregar un título con ρ < 1 **disminuye** el DR (el promedio no cambia y la σ del portafolio baja). *(Respondiste "30 de la misma industria" y "no cambia".)*
</details>

### 96. Ability < willingness *(Kaplan M2 #178)*
La **capacidad** de asumir riesgo del cliente es mucho **menor** que su **disposición**. ¿Qué hace el asesor?

<details><summary>Ver respuesta</summary>

**Basa la tolerancia al riesgo del IPS en la capacidad** (ability). Siempre manda **la más baja**. Solo se **educa** al cliente cuando la baja es la **willingness** (puede, pero no quiere). *(Respondiste educar al cliente.)*
</details>

### 97. Riesgo no sistemático en el CAPM *(Kaplan M3 #93 y #119)*
X y Y tienen el **mismo beta**, pero X tiene más riesgo no sistemático. ¿Y con qué supuesto el riesgo no sistemático no da retorno extra?

<details><summary>Ver respuesta</summary>

X tiene **más σ** pero el **mismo retorno esperado**: en el CAPM solo el **beta** paga. El riesgo no sistemático no se premia **si diversificar no cuesta nada** (supuesto), no "bajo cualquier circunstancia". *(Respondiste "más retorno y más σ" y "under any circumstances".)*
</details>

### 98. Retornos reales vs. distribución normal *(Kaplan M3 #98)*
Frente a una normal, ¿cómo han sido los retornos históricos de las grandes clases de activos?

<details><summary>Ver respuesta</summary>

**Más desviaciones grandes negativas** de lo esperado: **asimetría negativa** y **colas gordas** (exceso de curtosis positivo). *(Respondiste "menos desviaciones grandes positivas".)*
</details>

### 99. Menos averso al riesgo *(Kaplan M3 #104 y M6 #113)* ⚠️ fallada 3 veces
Boswell es **menos** averso que Johnson, con la misma CAL. ¿Qué tiene Boswell?

<details><summary>Ver respuesta</summary>

**Un portafolio óptimo con mayor retorno esperado** (más a la derecha en la CAL). También tiene curvas de indiferencia **más planas** y un coeficiente de aversión **más bajo**. Curva **empinada** = miedoso (**"EMPINADA = ASUSTADO"**: exige mucho retorno por cada pizca de riesgo). *(M3 #104: "curvas más empinadas". M6 #113: "Smith, con curva más empinada, es menos averso".)*
</details>

### 100. Quedarse sin caja *(Kaplan M3 #108)* ⚠️ mismo tema que la #91
Una organización teme **no poder seguir operando porque se quedó sin caja**. ¿Qué riesgo es?

<details><summary>Ver respuesta</summary>

**Solvency risk** (no financiero). **Liquidity risk** = vender un **activo** por debajo de su valor justo por condiciones del mercado. **Credit** = la contraparte no paga. *(Respondiste liquidez.)*
</details>

### 101. Gestores que se cancelan entre sí *(Kaplan M3 #155)* ⚠️ fallada 2 veces
¿Qué resuelve el problema de gestores con **posiciones activas que se compensan**?

<details><summary>Ver respuesta</summary>

**Core-satellite**: la mayoría del dinero **pasivo** (core) y una parte pequeña con pocos gestores **activos** (satélites). Menos apuestas que se anulan y menos rotación. La **táctica** no tiene nada que ver: es desviarse de la estratégica por pronósticos de corto plazo. *(Respondiste asignación táctica en el mock **y** en el repaso.)*
</details>

### 102. Vendería a $58, pero no compraría a más de $53 *(Kaplan M3 #163)*
¿Qué sesgo muestra este inversor?

<details><summary>Ver respuesta</summary>

**Endowment bias** (emocional): valora más lo que **ya tiene**. Status quo = no hacer nada por comodidad. Conservatism = no actualizar una **opinión** con información nueva (cognitivo). Emocionales = **LOSSER**: Loss aversion, Overconfidence, Self-control, Status quo, Endowment, Regret aversion. *(Respondiste conservatism.)*
</details>

### 103. El menor mínimo de inversión *(Kaplan M3 #169)*
¿Cuál requiere el menor mínimo: wrap fee account, market neutral fund o closed-end fund?

<details><summary>Ver respuesta</summary>

**Closed-end fund**: cotiza en bolsa, compras una acción al precio de mercado. Las wrap accounts (cuentas separadas) y los hedge funds (market neutral) exigen montos **altos**. *(Respondiste wrap fee account.)*
</details>

### 104. Portafolio en la CML con menos riesgo que el mercado *(Kaplan M4 #93)*
Un portafolio **sobre la CML** con **menos riesgo y menos retorno** que el portafolio de mercado es: ¿lending, leveraged o ineficiente?

<details><summary>Ver respuesta</summary>

**Lending portfolio**: está a la **izquierda** de M, con parte del dinero en Rf (comprar T-bills = **prestar**). A la **derecha** de M es **borrowing/leveraged**. Todo lo que está **sobre** la CML es eficiente. *(Respondiste leveraged.)*
</details>

### 105. Covarianza a partir del beta *(Kaplan M4 #120)*
β = 1,2 · σ de la acción = 28 % · σ del mercado = 14 %. ¿Cuál es la covarianza con el mercado?

<details><summary>Ver respuesta</summary>

**Cov = β × σm² = 1,2 × 0,14² = 1,2 × 0,0196 = 0,0235.** El denominador del beta es la **varianza** (si te la dan ya como varianza, se usa directo). El 28 % sobra: solo serviría para la **correlación** (β = ρ × σi / σm). *(Respondiste 0,168 = 1,2 × 0,14, sin elevar al cuadrado.)*
</details>

<!-- Corporate Issuers, Bloque 1 (7-nov-2026, 9/13) -->

### 106. Limitada para algunos y sin impuesto de entidad *(Mock A #65)* ⚠️ fallada 2 veces
¿Qué forma jurídica da responsabilidad limitada a **algunos** dueños y **no tributa a nivel de la entidad**?

<details><summary>Ver respuesta</summary>

**Limited partnership**: los **LPs** son limitados y el **GP** ilimitado ("algunos"), y es **pass-through** (tributan los socios). La **corporation** limita a **todos** pero **sí tributa** como entidad (doble tributación). Piensa en un fondo de private equity: GP + LPs. *(Respondiste corporation en el mock **y** en el repaso.)*
</details>

### 107. Stakeholder theory *(Kaplan M2 #7)*
Según la **stakeholder** theory, ¿qué debe manejar el gobierno corporativo?

<details><summary>Ver respuesta</summary>

**Los conflictos entre todos los grupos** con interés en la empresa (accionistas, acreedores, empleados, clientes, gobierno). Servir solo a los dueños es la **share**holder theory. Share = acción; stake = tener algo en juego. *(Respondiste la de shareholder.)*
</details>

### 108. ¿Qué hace un miembro independiente del board? *(Kaplan M4 #68)*
Opciones: manejar el presupuesto del año, fijar los bonos de la alta gerencia, definir metas operativas.

<details><summary>Ver respuesta</summary>

**Fijar la remuneración (bonos) de la alta gerencia.** El board: estrategia, vigilancia, contratar/despedir al CEO y remuneración. La **gerencia**: presupuesto, operación y metas **operativas** (la palabra "operational" apunta a la gerencia). Mismo patrón del Mock A #64. *(Respondiste metas operativas.)*
</details>

### 109. Lo que un activista NO inicia *(Kaplan M4 #5)*
¿Qué es **least likely** que inicie un accionista activista: poison pill, tender offer o proxy contest?

<details><summary>Ver respuesta</summary>

**Poison pill**: es una **defensa** de la empresa contra adquisiciones (diluye al comprador). El activista **ataca** con proxy contests (votos para cambiar el board), tender offers, propuestas y demandas. *(Respondiste tender offer.)*
</details>

### 110. Capital de trabajo "menos conservador" *(Kaplan M2 #75)*
Una empresa que quiere un enfoque **menos conservador** (agresivo) de capital de trabajo, ¿qué hace?

<details><summary>Ver respuesta</summary>

**Menos activos de corto plazo (relativamente más de largo plazo) y más financiamiento de corto plazo.** El conservador se protege por los dos lados (mucho colchón + financiamiento de largo plazo); el agresivo quita las dos protecciones. *(Respondiste "más activos de corto plazo + financiamiento de corto plazo".)*
</details>

### 111. EPS de corto plazo y "gástalo o piérdelo" *(Kaplan M3 #41)*
¿Es válido considerar que un proyecto baja el EPS de este año, o que si no lo haces te recortan el presupuesto?

<details><summary>Ver respuesta</summary>

**Ninguno de los dos.** Son errores típicos de la asignación de capital: el **cortoplacismo** del EPS y el **"use it or lose it"**. La única pregunta válida es si el **VPN > 0**. *(Respondiste "solo uno es apropiado".)*
</details>

<!-- Ethics: repaso de las falladas del Kaplan Mock 6 (10-nov-2026, 9/16) -->

### 112. Investigación pagada por el emisor con bono *(Kaplan M6 #3)* ⚠️ fallada 2 veces
Te pagan un informe sobre una empresa con tarifa fija **+ un bono si sus acciones pasan a estar más ampliamente en manos del público**. ¿Basta con revelarlo?

<details><summary>Ver respuesta</summary>

**No: es violación del I(B) aunque reveles la fuente y la compensación.** El issuer-paid research se permite solo con pago **fijo** que no dependa del resultado. Un bono ligado al resultado destruye la objetividad: revelarlo no lo arregla. *(Respondiste "basta con revelar fuente y compensación", en el mock y en el repaso.)*
</details>

### 113. Supervisar sin un buen sistema de compliance *(Kaplan M6 #6)* ⚠️ fallada 2 veces
Te ofrecen ser supervisor de una sucursal que no tiene procedimientos de compliance adecuados. ¿Qué haces?

<details><summary>Ver respuesta</summary>

**Rechazar el cargo POR ESCRITO hasta que la firma adopte procedimientos adecuados** (IV(C)). No basta con "conversarlo y pedir autoridad sobre el compliance". Busca "decline in writing". *(Respondiste "conversar y no aceptar hasta tener autoridad", en el mock y en el repaso.)*
</details>

### 114. Code vs. Standards *(Kaplan M6 #22 y #45)* ⚠️ fallada 2 veces cada una
¿Cuál es un **Standard**: "Integrity of the Investment Profession", "Maintaining and Improving Competence" o "Investment Analysis, Recommendations, and Actions"? ¿Y qué exige el **Code**: alentar a otros a actuar profesionalmente, evaluar la suitability en el portafolio total o revelar el proceso de inversión?

<details><summary>Ver respuesta</summary>

**Standard V = Investment Analysis, Recommendations, and Actions.** Las otras dos son frases del **Code** (el Standard II es "Integrity of **Capital Markets**"). El **Code** exige "**practice and encourage others** to practice…"; suitability es III(C) y el proceso de inversión es V(B).
**7 Standards:** I Professionalism · II Integrity of Capital Markets · III Duties to Clients · IV Duties to Employers · V Investment Analysis, Recommendations and Actions · VI Conflicts of Interest · VII Responsibilities as a Member/Candidate.
**Code (6):** integridad y ética · profesión y clientes antes que uno mismo · reasonable care e independencia · practicar y **alentar a otros** · integridad de los mercados · **mantener y mejorar** la competencia. *(Respondiste "Integrity of the Investment Profession" y "revelar el proceso".)*
</details>

### 115. Información NO material no pública *(Kaplan M6 #44)* ⚠️ fallada 2 veces
Con información **no material** no pública del trabajo, ¿qué es violación: contársela a tu esposo, al club de inversión o usarla en un informe?

<details><summary>Ver respuesta</summary>

**Contársela al esposo** (VI(B) Priority of Transactions: no compartir información no pública con quien tenga cuentas de las que eres beneficial owner). Usarla en un informe **está permitido** (mosaic theory). *(Respondiste "usarla en un informe", en el mock y en el repaso.)*
</details>

### 116. MNPI en la firma: firewall *(Kaplan M6 #65)* ⚠️ fallada 2 veces
Banca de inversión recibe MNPI seguido. ¿Qué debe hacer la firma?

<details><summary>Ver respuesta</summary>

**Restringir el proprietary trading** (operaciones de la propia firma) en esas acciones. **No** restringir a los clientes (da una señal; se aceptan órdenes unsolicited). Debe haber un **firewall** entre banca de inversión y corretaje/research. *(Respondiste "pedir que publiquen y restringir a los clientes", en el mock y en el repaso.)*
</details>

### 117. Opinión presentada como hecho *(Kaplan M6 #89)* ⚠️ fallada 2 veces
Un congresista le dice a una analista que está "seguro" de que no pasará un arancel, y ella escribe: "las utilidades estarán dentro de la guía **porque** el arancel no se aprobará". ¿Qué Standard violó?

<details><summary>Ver respuesta</summary>

**V(B) Communication with Clients:** no distinguió **hecho de opinión**. La "certeza" del congresista es una **opinión**, no MNPI (no es información material de la empresa, y una predicción no es un hecho). *(Respondiste MNPI, en el mock y en el repaso.)*
</details>

<!-- Portfolio Mgmt: repaso de las falladas del Kaplan Mock 6 (10-nov-2026, 7/11) -->

### 118. Interacción entre riesgos *(Kaplan M6 #98)* ⚠️ fallada 2 veces
¿Cuál es falsa: "los riesgos financieros vienen de la exposición al mercado", "las interacciones entre riesgos son poco frecuentes" o "los riesgos no financieros vienen de fuentes externas"?

<details><summary>Ver respuesta</summary>

**"Las interacciones son poco frecuentes" es falsa**: los riesgos interactúan **seguido** (en una crisis aparecen mercado, crédito y liquidez a la vez). Las otras dos son verdaderas: los no financieros vienen de la operación **y** de fuentes externas. *(Respondiste la primera, en el mock y en el repaso.)*
</details>

### 119. Bono en acciones, sueldo en bonos *(Kaplan M6 #130)* ⚠️ fallada 2 veces
Invierte su bono anual en acciones de crecimiento y sus ahorros del sueldo en bonos del gobierno. ¿Qué sesgo es?

<details><summary>Ver respuesta</summary>

**Mental accounting** (cognitivo): trata el dinero distinto **según de dónde viene**, en "cajones". Framing = decidir distinto según cómo te presentan la información. Conservatism = no actualizar una opinión. *(Respondiste framing en el mock y conservatism en el repaso.)*
</details>

### 120. Objetivo absoluto vs. relativo *(Kaplan M6 #163)* ⚠️ fallada 2 veces · ver también la #87
¿Cuál es un objetivo **absoluto**: "≥ 5 % al año con 95 % de probabilidad", "≥ la tasa libre de riesgo" o "más que el S&P 500 con 90 % de probabilidad"?

<details><summary>Ver respuesta</summary>

**"≥ 5 % con 95 % de probabilidad"**: un número **fijo**. "≥ Rf" es **relativo** (la Rf es un benchmark que cambia), igual que "más que el S&P 500". Pregúntate: ¿se compara con algo? *(Respondiste "≥ Rf", en el mock y en el repaso.)*
</details>

<!-- FSA: inventarios (10-nov-2026, 4/8) -->

### 121. FIFO con precios subiendo *(Kaplan M3 #40 y M3 #77)*
Con precios **subiendo**, ¿FIFO tiene más o menos utilidad, impuestos e inventario que LIFO? ¿Qué método elige quien quiere **más utilidad**?

<details><summary>Ver respuesta</summary>

**"Precios SUBEN → FIFO GANA":** más utilidad, más impuestos, **más inventario** y más patrimonio (rotaciones más bajas). Quien quiere más utilidad elige **FIFO**; quien quiere pagar menos impuestos, LIFO.
Dos preguntas: **¿qué VENDE?** (FIFO vende lo viejo = barato → COGS ↓) y **¿qué QUEDA?** (lo nuevo = caro → inventario ↑). *(Respondiste "menos inventario" y "LIFO para más utilidad".)*
</details>

### 122. FIFO con precios bajando: patrimonio y ROE *(Kaplan M6 #56)* ⚠️ fallada 2 veces
Con costos **bajando**, si una empresa con costo promedio usara FIFO, ¿su patrimonio y su ROE serían mayores o menores?

<details><summary>Ver respuesta</summary>

**Los dos menores.** FIFO vende lo viejo, que ahora es **caro** → COGS ↑ → utilidad ↓ → patrimonio ↓. El ROE baja porque la utilidad cae **más en proporción** que el patrimonio (10/100 = 10 % → 8/98 = 8,2 %). *(Respondiste "patrimonio mayor, ROE menor", en el mock y en el repaso.)*
</details>

### 123. LIFO reserve que baja con unidades que suben *(Kaplan M4 #65)*
Unidades 500 → 510 y LIFO reserve 50.000 → 48.000. ¿Qué indica?

<details><summary>Ver respuesta</summary>

**Precios bajando.** No es LIFO liquidation: para eso las **unidades** tienen que **bajar**. La reserva (FIFO − LIFO) se achica porque el inventario FIFO (compras recientes) se abarata. Reserva ↑ = precios ↑. *(Respondiste LIFO liquidation.)*
</details>

<!-- FSA: impuestos diferidos (10-nov-2026, 6/8) -->

### 124. ¿Cuál tasa es la más alta? *(Kaplan M2 #88)*
Tasa legal 23 %, utilidad antes de impuestos 500.000, utilidad neta 372.000, impuestos pagados 114.000. ¿Cuál es mayor: la cash tax rate, la efectiva o la estatutaria?

<details><summary>Ver respuesta</summary>

**La efectiva (25,6 %).** Tax expense = 500.000 − 372.000 = **128.000** → 128/500 = 25,6 %. Cash rate = **pagados** / utilidad antes de impuestos = 114/500 = 22,8 %. Estatutaria = 23 %. El gasto (contable) ≠ lo pagado (caja): la diferencia es un aumento del DTL. **Calcula siempre las tres.** *(Respondiste la estatutaria.)*
</details>

### 125. Valuation allowance que sube *(Kaplan M3 #34)*
El DTA bruto sube de 10.500 a 11.250 y la valuation allowance sube de 2.700 a 3.900. ¿Qué se espera de las utilidades futuras?

<details><summary>Ver respuesta</summary>

**Que bajen.** La allowance es la parte del DTA que la gerencia cree que **no podrá usar** por falta de utilidades futuras: **allowance ↑ = pesimismo**. Fíjate en la allowance, no en el DTA bruto (el DTA neto bajó de 7.800 a 7.350). *(Respondiste "aumentarán".)*
</details>

<!-- FSA: activos de largo plazo y pasivos (10/11-nov-2026, 8/11) -->

### 126. Deterioro: impuestos, caja y dónde se registra *(Kaplan M2 #78 y M4 #78)*
Un deterioro de $10 millones en 20X3: ¿baja la utilidad **y los impuestos por pagar** de 20X3? ¿Dónde se registra la pérdida?

<details><summary>Ver respuesta</summary>

Baja la utilidad de 20X3, pero **no** los impuestos por pagar ni la caja (no es deducible hasta vender el activo). En 20X4 la depreciación es menor → **utilidad ↑** (y rotación ↑); el CFO no cambia. La pérdida va al **estado de resultados como pérdida operativa** (operaciones continuas), **no al OCI**: al OCI va la **revaluación hacia arriba** (IFRS). Ojo con las opciones de dos partes. *(Respondiste "baja la utilidad y los impuestos" y "pérdida no operativa en OCI".)*
</details>

### 127. Opciones para empleados *(Kaplan M3 #12)*
Al otorgar opciones a empleados, ¿qué se exige: valorarlas con Black-Scholes, revelar su efecto en los estados, o gastar todo su valor en el periodo del otorgamiento?

<details><summary>Ver respuesta</summary>

**Revelar** cómo afectan el estado de resultados y el balance. El **valor** se fija en la fecha de otorgamiento, pero el **gasto se reparte durante el vesting period** (300 en 3 años = 100 por año). Black-Scholes es un modelo posible, no obligatorio. *(Respondiste "gastar todo en el periodo del otorgamiento".)*
</details>

<!-- FSA: auditoría, EPS y calidad del reporte (11-nov-2026) -->

### 128. Opiniones del auditor *(Kaplan M6 #69)* ⚠️ fallada 2 veces
¿Qué significa un **disclaimer of opinion**?

<details><summary>Ver respuesta</summary>

**El auditor no puede emitir una opinión** ("unable"). Unqualified = limpia · **Qualified = "except for"** (excepciones, pero razonable) · **Adverse = "not fairly"** · **Disclaimer = "unable"**. *(Respondiste "excepciones" (qualified) en el repaso y "no razonables" (adverse) en el mock.)*
</details>

### 129. Opciones antidilutivas: precio PROMEDIO *(Kaplan M6 #34)* ⚠️ fallada 2 veces
Opciones con strike $40; precio al cierre $42 y precio promedio del año $38. Todavía no se pueden ejercer. ¿Se incluyen en el EPS diluido?

<details><summary>Ver respuesta</summary>

**No, son antidilutivas.** El treasury stock method usa el precio **PROMEDIO** ($38 < strike $40 → no diluyen). El precio de cierre es un distractor, y que no se puedan ejercer todavía **no importa**. *(Respondiste "no, porque no se pueden ejercer" en el mock e "incluirlas" en el repaso.)*
</details>

### 130. EPS diluido con warrants *(Kaplan M2 #73)*
UN 5.000, div. preferentes 500, div. comunes 600, 1.000 acciones, 100 warrants a $50, precio promedio $60. ¿EPS diluido?

<details><summary>Ver respuesta</summary>

**$4,42.** Numerador = 5.000 − **500 preferentes** = 4.500 (los comunes no se restan). Warrants (TSM): (60 − 50)/60 × 100 = **16,7** acciones netas. 4.500 / 1.016,7 = 4,43. *(Respondiste $4,55 = 5.000 / 1.100: sin restar los preferentes y sumando los 100 warrants completos.)*
</details>

### 131. Espectro de calidad del reporte *(Kaplan M3 #36 y M3 #78)*
¿Qué queda más alto en el espectro: utilidades no sostenibles, smoothing o estados que reflejan bien la economía pero **no cumplen la norma**? Y "utilidades sostenibles pero con rentabilidad inadecuada", ¿es problema de los resultados, del reporte o de ambos?

<details><summary>Ver respuesta</summary>

**Utilidades no sostenibles** (cumple la norma: solo es un problema de resultados). **Cumplir la norma es la primera línea**: todo lo que cumple está por encima de lo que no cumple. "Sustainable / adequate" = **calidad de los resultados únicamente**; "relevant / faithful / compliance" = calidad del reporte. *(Respondiste "no cumple la norma" y "ambos".)*
</details>

### 132. Triángulo del fraude *(Kaplan M4 #23)*
"La alta rotación del personal de sistemas y contabilidad hizo ineficaces los controles internos." ¿Qué condición es?

<details><summary>Ver respuesta</summary>

**Opportunity**: controles débiles = la puerta abierta. **Motivation** = por qué (bonos, presión, covenants). **Rationalization** = la excusa ("es temporal"). Controles → oportunidad; dinero o presión → motivo; excusas → racionalización. *(Respondiste rationalization.)*
</details>

### 133. Poco poder de fijación de precios *(Kaplan M6 #2)* ⚠️ fallada 2 veces
¿Qué genera poco pricing power: costos fijos y barreras de salida altos, muchos proveedores con bajo costo de cambio, o pocos clientes con costos de cambio altos?

<details><summary>Ver respuesta</summary>

**Costos fijos altos + barreras de salida altas**: más **rivalidad** (todos necesitan volumen y nadie se va) → guerra de precios (piensa en las aerolíneas). Muchos proveedores es **bueno** para la empresa. Pocos clientes con **altos costos de cambio** se compensa: los clientes quedan atrapados. *(Respondiste "muchos proveedores" en el mock y "pocos clientes con costos de cambio altos" en el repaso.)*
</details>

<!-- Fixed Income, Bloque 1: estructura de tasas, riesgo de tasa y duración (11-nov-2026, 5/10) -->

### 134. Par curve *(Kaplan M6 #176)* ⚠️ fallada 2 veces
¿Con qué se construye la par yield curve: bonos hipotéticos, bonos del gobierno a la par o corporativos cerca del nominal?

<details><summary>Ver respuesta</summary>

**Bonos hipotéticos** que cotizarían a la par con las spot rates actuales (casi ningún bono real cotiza exactamente a 100). Spot = cero cupón · forward = tasas futuras implícitas · par = hipotéticos a la par: las tres se derivan de las spot. *(Respondiste "bonos del gobierno a la par", en el mock y en el repaso.)*
</details>

### 135. Ganancia o pérdida de capital vs. carrying value *(Kaplan M6 #135)* ⚠️ fallada 2 veces
Bono de 12 años, cupón 3 %, comprado con YTM 4,6 % (semestral). Lo vende a los 7 años en 91,41. ¿Ganancia o pérdida de capital?

<details><summary>Ver respuesta</summary>

**Pérdida de 1,52.** Se compara contra el **carrying value** (precio al YTM **original** con el plazo que queda): N = 10, I/Y = 2,3, PMT = 1,5, FV = 100 → **92,93**. 91,41 < 92,93 → pérdida. **No** se compara con el precio de compra (85,37): la subida hacia 100 (pull to par) es parte del rendimiento. *(Respondiste ganancia, en el mock y en el repaso.)*
</details>

### 136. Duración sola y signo de la convexidad *(Kaplan M6 #122 y #101)* 🎲 al azar en el mock
Con la duración modificada sola, ¿las estimaciones de precio de un bono sin opciones quedan altas o bajas? Con ModDur 5,6, convexidad 28 y una baja de 54 pb, ¿%ΔP?

<details><summary>Ver respuesta</summary>

**Demasiado bajas en los dos casos** (la recta de la duración queda siempre debajo de la curva convexa). Por eso la convexidad **suma**: (Δy)² es siempre positivo. −5,6 × (−0,0054) + ½ × 28 × 0,0054² = 3,024 % + 0,041 % = **3,07 %**. Duración: signo contrario a Δy; convexidad: **mismo signo que la convexidad**, siempre. *(#122: no sabías. #101: restaste la convexidad → 2,98 %.)*
</details>

### 137. Duración efectiva: el cambio real puede ser mayor o menor *(Kaplan M6 #109)* 🎲 al azar en el mock
Bono con descuento y **duración efectiva** de 8,5. ¿El cambio real de precio por 1 % de cambio en el YTM es menor, mayor o puede ser cualquiera de los dos?

<details><summary>Ver respuesta</summary>

**Puede ser mayor o menor.** "Efectiva" = bono **con opciones**: la convexidad puede ser positiva (sin opciones o putable) o **negativa** (callable), y no se sabe si la tasa sube o baja. El "descuento" es un distractor. *(Respondiste "menor que 8,5 %".)*
</details>

<!-- Fixed Income, Bloque 2: mercados, crédito y securitización (11-nov-2026, 3/8) -->

### 138. Factura mayor que el precio cotizado *(Kaplan M6 #134)* ⚠️ fallada 2 veces
Precio cotizado 105,19 por $100.000 de nominal; la factura llega por $107.390. ¿Qué es la diferencia?

<details><summary>Ver respuesta</summary>

**Interés acumulado** ($2.200): precio **full** = **flat** (cotizado) + interés acumulado desde el último cupón. El vendedor se ganó esa parte del cupón. No es comisión (los dealers ganan con el spread). *(Respondiste comisión, en el mock y en el repaso.)*
</details>

### 139. Oferta no competitiva en una subasta soberana *(Kaplan M6 #96)* ⚠️ fallada 2 veces
¿Quien presenta una oferta **no competitiva** recibe títulos?

<details><summary>Ver respuesta</summary>

**Siempre**, sea cual sea el resultado: acepta el precio que salga (como una orden de mercado). La **competitiva** especifica precio y cantidad y puede quedarse sin nada (como una orden límite). No compite = no arriesga quedarse sin títulos. *(Respondiste "puede o no recibir", en el mock y en el repaso.)*
</details>

### 140. Mejora crediticia en MBS *(Kaplan M6 #143)* ⚠️ fallada 2 veces
¿Qué estructura da **mejora crediticia**: sequential-pay, PAC + support o senior/subordinated?

<details><summary>Ver respuesta</summary>

**Senior/subordinated**: redistribuye el riesgo de **default** (las subordinadas pierden primero). Sequential-pay y PAC + support redistribuyen el riesgo de **prepago**, no el de crédito. *(Respondiste PAC + support, en el mock y en el repaso.)*
</details>

### 141. Gestión activa: CDO *(Kaplan M6 #166)* ⚠️ fallada 2 veces
¿Qué título depende de la **gestión activa** de sus activos para generar los flujos: ABS de autos, CDO o CMO?

<details><summary>Ver respuesta</summary>

**CDO**: un **collateral manager** compra y vende bonos y préstamos (es como un fondo apalancado). ABS y CMO son pools pasivos ("ponlo y olvídalo"). *(Respondiste ABS de autos, en el mock y en el repaso.)*
</details>

### 142. G-spread: anualizar ×2 *(Kaplan M6 #117)* 🎲 al azar en el mock
Corporativo: 1 año, cupón 2 % semestral, precio 99,73. Gobierno: 1 año, 0,90 % semestral, precio 100,12. ¿G-spread?

<details><summary>Ver respuesta</summary>

**150 pb.** Corporativo: N = 2, PV = −99,73, PMT = 1, FV = 100 → I/Y = 1,137 × **2** = 2,27 %. Gobierno: N = 2, PV = −100,12, PMT = 0,45, FV = 100 → 0,390 × **2** = 0,78 %. 2,27 − 0,78 ≈ 1,50 %. Si no multiplicas por 2 sale 75 pb (la trampa). *(Respondiste 75 pb.)*
</details>

<!-- Quant: falladas del Kaplan Mock 6 (11-nov-2026). Intuición de la prueba de hipótesis: H0 = 'inocente'; t = evidencia; el % = qué tan exigente es el juez (menor % = más difícil rechazar) -->

### 143. Mediana y "least accurate" *(Kaplan M6 #20)* ⚠️ fallada 2 veces
Datos: 28, 36, 32, 30, 34, 32. ¿Cuál es **falsa**: rango = 8, mediana = 31 o MAD = 2?

<details><summary>Ver respuesta</summary>

**"Mediana = 31" es falsa.** Ordena: 28, 30, **32, 32**, 34, 36 → mediana = 32. Rango = 8 ✅. MAD = (4 + 2 + 0 + 0 + 2 + 4)/6 = 2 ✅. Con "least" o "NOT": marca V/F en cada opción y elige la F. *(Elegiste "rango = 8", una verdadera, en el mock y en el repaso.)*
</details>

### 144. Asimetría: orden de moda, mediana y media *(Kaplan M6 #68)* ⚠️ fallada 2 veces
¿Qué orden tienen moda, mediana y media con asimetría positiva? ¿Y negativa?

<details><summary>Ver respuesta</summary>

**"La media persigue a la cola."** Positiva (cola a la derecha): **moda < mediana < media**. Negativa (cola a la izquierda): **media < mediana < moda**. La mediana siempre en el medio. *(Elegiste "negativa: moda < mediana < media", en el mock y en el repaso.)*
</details>

### 145. Prueba t de una correlación *(Kaplan M6 #39)* ⚠️ fallada 2 veces
r = 0,1452 con n = 150; críticos ±1,65 (10 %) y ±1,96 (5 %). ¿Se rechaza H₀: ρ = 0?

<details><summary>Ver respuesta</summary>

**Se rechaza al 10 %, no al 5 %.** t = r√(n − 2)/√(1 − r²) = 0,1452 × 12,166 / 0,9894 = **1,785** (entre 1,65 y 1,96). Con muestras grandes, una correlación chica puede ser significativa: **siempre calcula la t**. *(Respondiste "no rechazar al 10 %", en el mock y en el repaso.)*
</details>

### 146. Prueba t de una cola *(Kaplan M6 #73)* ⚠️ fallada 2 veces
¿Los retornos anormales son **positivos**? Media 1,1 %, σ 4,75 %, n = 60. ¿Se rechaza al 5 %? ¿Y al 2,5 %?

<details><summary>Ver respuesta</summary>

**Al 5 % sí, al 2,5 % no.** t = 0,011 / (0,0475/√60) = **1,79**. "Are positive" = **una cola**: críticos 1,645 (5 %) y 1,96 (2,5 %). *(Respondiste "en ambos", en el mock y en el repaso.)*
</details>

### 147. Bayes: P(A dado B) *(Kaplan M6 #90)* 🎲 al azar en el mock
P(earnings > 10 %) = 45 %; P(sube div. | earnings > 10 %) = 70 %; P(sube div. | earnings ≤ 10 %) = 30 %. ¿P(earnings > 10 % | sube div.)?

<details><summary>Ver respuesta</summary>

**≈ 66 %.** Árbol: rama ① = 0,45 × 0,70 = **0,315** · rama ② = 0,55 × 0,30 = **0,165** → ① / (① + ②) = 0,315 / 0,480 = **0,656**. El 31,5 % es P(A **y** B); "dado B" = solo el mundo donde pasó B → **dividir**. Pista: "a stock **which increases** its dividend…". *(Te quedaste en 31,5 %.)*
</details>

### 148. Covarianza desde una tabla de probabilidades conjuntas *(Kaplan M6 #57)* ⚠️ fallada 2 veces
Con una tabla de probabilidades conjuntas de los retornos de A y B, ¿qué más se necesita para la covarianza: nada, los pesos o las varianzas?

<details><summary>Ver respuesta</summary>

**Nada más**: Cov = Σ P × (R_A − E(R_A)) × (R_B − E(R_B)) y las E(R) salen de la misma tabla. **Pesos** → solo para el **portafolio**. **σ** → para pasar a **correlación**. *(Respondiste las varianzas en el mock y los pesos en el repaso.)*
</details>

<!-- Economics: falladas del Kaplan Mock 6 (11-nov-2026, 5/6) -->

### 149. % de cambio de la moneda que NO es la base *(Kaplan M6 #23)* ⚠️ fallada 2 veces
USD/CAD pasa de 0,85 a 0,89. ¿Cuánto cambió el **USD**?

<details><summary>Ver respuesta</summary>

**Se depreció 4,5 %.** En USD/CAD la **base es el CAD**: 0,89/0,85 − 1 = +4,7 % es lo que se apreció el **CAD**. Para el USD **invierte**: 1/0,85 = 1,1765 y 1/0,89 = 1,1236 → 1,1236/1,1765 − 1 = **−4,5 %**. Atajo: 1/1,047 − 1. *(Respondiste "se depreció 4,7 %": la dirección estaba bien, el número no.)*
</details>
