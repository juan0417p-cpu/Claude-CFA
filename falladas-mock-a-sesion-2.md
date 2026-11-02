# Mock A (CFA Institute), Sesión 2: las 90 preguntas para practicar

**Resultado: 54 de 90 (60 %).** Hubo bastantes respuestas al azar, así que aquí están **las 90**: primero las **36 falladas** y después las **54 acertadas** (algunas pueden haber sido suerte).

⚠️ Las preguntas están redactadas de nuevo sobre los mismos conceptos del mock, y las de cálculo usan cifras nuevas. No son el texto oficial de CFA Institute. Las opciones están en orden alfabético para no delatar la correcta.

| Tema | Aciertos | % |
|---|---|---|
| Derivatives | 6/14 | 43 % |
| Fixed Income | 12/22 | 55 % |
| Portfolio Management | 10/17 | 59 % |
| Alternative Investments | 9/14 | 64 % |
| Equity | 17/23 | 74 % |
| **Total** | **54/90** | **60 %** |

---

# Parte 1: las 36 falladas

## 🔀 Derivatives (6/14 = 43 %)

### Pregunta 1
Dos posiciones tienen el mismo subyacente y plazo: un forward sin colateral y un futuro. ¿Cuál tiene mayor riesgo de contraparte?

- Ambas por igual
- El forward
- El futuro

<details><summary>Ver respuesta</summary>

**Correcta:** El forward · *(En el mock: Ambas por igual)*

**Por qué:** El valor del forward se acumula hasta el vencimiento. El futuro liquida ganancias y pérdidas cada día con margen de variación, lo que devuelve su valor a cero.

</details>

### Pregunta 23
Según la paridad put-call-forward, ¿a qué es igual p₀ − c₀?

- Valor presente de (F₀ − S₀)
- Valor presente de (S₀ − X)
- Valor presente de (X − F₀)

<details><summary>Ver respuesta</summary>

**Correcta:** Valor presente de (X − F₀) · *(En el mock: Valor presente de la diferencia entre forward y spot)*

**Por qué:** p₀ − c₀ = (X − F₀) / (1 + r)^T. La fórmula compara el strike con el precio forward.

</details>

### Pregunta 30
Spot €50, strike €45, tasa libre de riesgo 2 % anual, 6 meses. ¿Cuál es el precio mínimo de una call europea?

- €4,55
- €5,00
- €5,44

<details><summary>Ver respuesta</summary>

**Correcta:** €5,44 · *(En el mock: Capitalizaste el strike en lugar de descontarlo)*

**Por qué:** 50 − 45 / 1,02^0,5 = 5,44. El strike se descuenta. Si lo capitalizas obtienes 4,55, y si no lo ajustas obtienes 5,00.

</details>

### Pregunta 40
¿Qué es el precio de un swap de pagar fijo y recibir flotante?

- El valor presente de flotantes menos el de fijos
- La suma de pagos fijos menos la suma de flotantes
- La tasa fija que hace cero su valor de mercado al inicio

<details><summary>Ver respuesta</summary>

**Correcta:** La tasa fija que hace cero su valor de mercado al inicio · *(En el mock: El valor presente de flotantes menos el de fijos)*

**Por qué:** El precio es una tasa, fijada al inicio. La diferencia entre valores presentes es el valor del swap para una de las partes.

</details>

### Pregunta 55
Compraste una call por $7 con strike de $60 cuando el subyacente estaba en $58. Al vencimiento vale $69. ¿Cuál es el valor de la call para ti?

- $2
- $4
- $9

<details><summary>Ver respuesta</summary>

**Correcta:** $9 · *(En el mock: Calculaste la ganancia, no el valor)*

**Por qué:** Valor al vencimiento = máx(0; 69 − 60) = $9. La ganancia sería 9 − 7 = $2. Pregunta por valor, no por ganancia.

</details>

### Pregunta 58
Una call cuesta $9, el subyacente vale $52 y el strike es $45. ¿Cuál es su valor temporal?

- $2
- $7
- −$7

<details><summary>Ver respuesta</summary>

**Correcta:** $2 · *(En el mock: Restaste el subyacente del strike)*

**Por qué:** Valor intrínseco: 52 − 45 = 7. Valor temporal: precio menos intrínseco, 9 − 7 = 2.

</details>

### Pregunta 62
¿De qué instrumento se obtiene la volatilidad implícita?

- Futuros
- Opciones
- Swaps

<details><summary>Ver respuesta</summary>

**Correcta:** Opciones · *(En el mock: Swaps)*

**Por qué:** Se despeja del precio de la opción, que refleja el riesgo esperado del subyacente.

</details>

### Pregunta 84
¿Qué posición forma una put protectora?

- Comprar el activo y comprar una put
- Vender el activo y comprar una put
- Vender una call y comprar una put

<details><summary>Ver respuesta</summary>

**Correcta:** Comprar el activo y comprar una put · *(En el mock: Vender el activo y comprar una put)*

**Por qué:** Mantienes el activo y la put limita la caída de su valor.

</details>

## 📉 Fixed Income (12/22 = 55 %)

### Pregunta 3
En igualdad de lo demás, ¿qué favorece el resultado de un bono con riesgo de crédito durante el período de tenencia?

- Un deterioro de la economía que eleva las primas de riesgo
- Una ampliación de los spreads
- Una demanda fuerte que estrecha los spreads

<details><summary>Ver respuesta</summary>

**Correcta:** Una demanda fuerte que estrecha los spreads · *(En el mock: La ampliación de los spreads)*

**Por qué:** Spreads más estrechos suben el precio del bono. Spreads más amplios y un peor entorno económico lo bajan.

</details>

### Pregunta 4
¿Cuál instrumento tiene normalmente mayor riesgo de prepago?

- Un ABS de tarjetas durante su período de lockout
- Un covered bond
- Un pass-through hipotecario

<details><summary>Ver respuesta</summary>

**Correcta:** Un pass-through hipotecario · *(En el mock: Covered bond)*

**Por qué:** En un pass-through, los deudores pueden prepagar y ese flujo llega al inversionista. El covered bond reemplaza los activos prepagados, y el lockout reinvierte los pagos de principal.

</details>

### Pregunta 13
Un bono semestral tiene un YTM de 6,00 %. ¿Cuál es su equivalente con capitalización trimestral?

- 5,87 %
- 5,96 %
- 6,05 %

<details><summary>Ver respuesta</summary>

**Correcta:** 5,96 % · *(En el mock: Convertiste como si la tasa fuera anual)*

**Por qué:** (1 + 0,06/2)² = (1 + APR/4)⁴, entonces APR = 4 × (1,03^0,5 − 1) = 5,96 %. Más períodos al año implican una tasa nominal menor.

</details>

### Pregunta 20
Precio inicial 100,0; si el rendimiento baja 10 pb vale 100,9, y si sube 10 pb vale 99,2. ¿Cuál es la convexidad aproximada?

- 1.000
- 500
- 8,5

<details><summary>Ver respuesta</summary>

**Correcta:** 1.000 · *(En el mock: Aplicaste la fórmula de duración)*

**Por qué:** (100,9 + 99,2 − 2 × 100) / (0,001² × 100) = 0,1 / 0,0001 = 1.000. El resultado 8,5 es la duración aproximada, y 500 duplica el denominador por error.

</details>

### Pregunta 34
Duración modificada 5, convexidad 30. Si el rendimiento sube 100 pb, ¿cuál es el cambio porcentual aproximado del precio?

- −2,20 %
- −4,85 %
- −5,15 %

<details><summary>Ver respuesta</summary>

**Correcta:** −4,85 % · *(En el mock: Restaste el efecto de convexidad)*

**Por qué:** (−5 × 0,01) + (½ × 30 × 0,01²) = −5,00 % + 0,15 %. La convexidad se suma, y por eso amortigua la caída.

</details>

### Pregunta 63
Tasas spot: 2 % a 1 año, 3 % a 2 años, 4 % a 3 años. ¿Cuál es el precio de un bono a 3 años con cupón anual de 5 %?

- 102,96
- 105,24
- 110,72

<details><summary>Ver respuesta</summary>

**Correcta:** 102,96 · *(En el mock: No elevaste las tasas a su plazo)*

**Por qué:** 5/1,02 + 5/1,03² + 105/1,04³ = 102,96. Cada flujo se descuenta con su spot y elevado a su plazo.

</details>

### Pregunta 67
Tu horizonte es menor que la duración Macaulay del bono. ¿Qué riesgo domina?

- El riesgo de precio de mercado
- El riesgo de reinversión de cupones
- Ninguno; se compensan

<details><summary>Ver respuesta</summary>

**Correcta:** El riesgo de precio de mercado · *(En el mock: Reinversión de cupones)*

**Por qué:** Horizonte corto: precio. Horizonte largo: reinversión. Se compensan cuando el horizonte es igual a la duración.

</details>

### Pregunta 71
Soberano a 2 años: cupón 2 %, precio 100. Corporativo a 2 años: cupón 6 %, precio 103. Ambos anuales. ¿Cuál es el spread G?

- 200 pb
- 240 pb
- 400 pb

<details><summary>Ver respuesta</summary>

**Correcta:** 240 pb · *(En el mock: Restaste los cupones)*

**Por qué:** Rendimientos: 2,00 % y 4,40 %. El spread se calcula entre rendimientos, no entre cupones.

</details>

### Pregunta 81
¿Cómo se clasifica un bono emitido por una ciudad?

- De agencia
- No soberano
- Supranacional

<details><summary>Ver respuesta</summary>

**Correcta:** No soberano · *(En el mock: Supranacional)*

**Por qué:** Los gobiernos locales y regionales son no soberanos. Los supranacionales son organismos como el Banco Mundial.

</details>

### Pregunta 87
Tu horizonte de inversión es más largo que el plazo del bono. ¿Cómo pesa el riesgo de reinversión frente al de mercado?

- Igual
- Menos
- Más

<details><summary>Ver respuesta</summary>

**Correcta:** Más · *(En el mock: Menos)*

**Por qué:** Un inversionista de largo plazo depende más de reinvertir los cupones. El de corto plazo sufre más por el precio.

</details>

## 🧺 Portfolio Management (10/17 = 59 %)

### Pregunta 11
¿Dónde se aplica el presupuesto de riesgo?

- En la gestión de portafolios y en la gestión del negocio
- Solo en la gestión de portafolios
- Solo en la gestión del negocio

<details><summary>Ver respuesta</summary>

**Correcta:** En la gestión de portafolios y en la gestión del negocio · *(En el mock: Solo en la gestión del negocio)*

**Por qué:** Ambas actividades combinan riesgos distintos que se pueden asignar y medir en conjunto.

</details>

### Pregunta 17
Tasa libre de riesgo 3 %, prima de riesgo de mercado 6 %, beta 1,2 y correlación con el mercado 0,4. Según el CAPM, ¿cuál es el retorno esperado?

- 10,2 %
- 5,4 %
- 6,6 %

<details><summary>Ver respuesta</summary>

**Correcta:** 10,2 % · *(En el mock: Restaste otra vez la tasa libre de la prima de mercado)*

**Por qué:** 3 % + 1,2 × 6 % = 10,2 %. La prima ya es retorno de mercado menos tasa libre, y la correlación no se usa directamente.

</details>

### Pregunta 29
¿Qué resulta directamente de combinar las expectativas de largo plazo del mercado de capitales con los objetivos y restricciones del IPS?

- El presupuesto de riesgo
- La asignación estratégica de activos
- Una decisión de asignación táctica

<details><summary>Ver respuesta</summary>

**Correcta:** La asignación estratégica de activos · *(En el mock: Una decisión de asignación táctica)*

**Por qué:** La asignación estratégica es la política de largo plazo. La táctica se desvía de ella después, a partir de pronósticos de corto plazo.

</details>

### Pregunta 32
Un cliente quiere que su retorno quede dentro de ±3 % del benchmark, con 95 % de probabilidad en 12 meses. ¿Qué tipo de objetivo es?

- De retorno relativo
- De riesgo relativo
- De valor en riesgo

<details><summary>Ver respuesta</summary>

**Correcta:** De riesgo relativo · *(En el mock: De retorno relativo)*

**Por qué:** Una banda alrededor del benchmark, con una probabilidad, mide riesgo frente a esa referencia. Un objetivo de retorno relativo sería superar al índice.

</details>

### Pregunta 42
Portafolio 50/50 con desviaciones de 6 % y 10 %, y correlación de −1. ¿Cuál es su desviación estándar?

- 0 %
- 2,0 %
- 4,4 %

<details><summary>Ver respuesta</summary>

**Correcta:** 2,0 % · *(En el mock: Omitiste el 2 en el término de covarianza)*

**Por qué:** Con correlación −1: |0,5 × 6 % − 0,5 × 10 %| = 2 %. Llegar a cero requeriría otros pesos.

</details>

### Pregunta 44
¿Qué es una firma de gestión multi-boutique?

- Un holding dueño de varias gestoras especializadas
- Una gestora con una amplia gama de activos y estilos
- Una gestora enfocada en una clase de activo o estilo

<details><summary>Ver respuesta</summary>

**Correcta:** Un holding dueño de varias gestoras especializadas · *(En el mock: Una gestora enfocada en una clase de activo o estilo)*

**Por qué:** Las otras dos opciones describen a la gestora especializada y a la de servicio completo.

</details>

### Pregunta 46
¿Qué afirmación sobre endowments y fundaciones es correcta?

- Las fundaciones son fondos que sostienen servicios de instituciones sin ánimo de lucro
- Los endowments suelen destinar una parte importante a alternativos
- Tienen horizontes cortos

<details><summary>Ver respuesta</summary>

**Correcta:** Los endowments suelen destinar una parte importante a alternativos · *(En el mock: Confundiste fundaciones con endowments)*

**Por qué:** Su horizonte es largo o perpetuo. Las fundaciones entregan donaciones, y los endowments sostienen a instituciones sin ánimo de lucro.

</details>

## 🏗️ Alternative Investments (9/14 = 64 %)

### Pregunta 37
Fondo de $200 M con 2 y 20, ambas sobre valor de fin de período y con high-water mark. Tras comisiones valía $227,2 M al año 1 y $215,6 M al año 2. El año 3 cierra en $250 M antes de comisiones. ¿Cuánto cobra el fondo en el año 3?

- $11,00 M
- $11,88 M
- $9,56 M

<details><summary>Ver respuesta</summary>

**Correcta:** $9,56 M · *(En el mock: Usaste un valor del año 2 como referencia)*

**Por qué:** Gestión: 2 % × 250 = 5. Incentivo: 20 % × (250 − 227,2) = 4,56. El high-water mark es el máximo previo después de comisiones.

</details>

### Pregunta 38
¿Qué afirmación sobre bienes raíces es correcta?

- Lo comercial es la mayor parte del valor global
- Los privados han tenido baja correlación con otras clases de activos
- Son activos homogéneos

<details><summary>Ver respuesta</summary>

**Correcta:** Los privados han tenido baja correlación con otras clases de activos · *(En el mock: Son activos homogéneos)*

**Por qué:** Cada propiedad es única y tiene ubicación fija. Lo residencial es el mayor sector global.

</details>

### Pregunta 54
¿Qué es lo más probable en la deuda mezzanine?

- Es deuda garantizada
- Está subordinada al capital
- Incluye warrants o derechos de conversión

<details><summary>Ver respuesta</summary>

**Correcta:** Incluye warrants o derechos de conversión · *(En el mock: Está subordinada al capital)*

**Por qué:** Va detrás de la deuda senior, pero por delante del capital. Sus warrants compensan esa posición.

</details>

### Pregunta 64
Dos fondos de private equity duplican el capital, pero A lo logra más rápido. ¿Cómo se compara su MOIC?

- A tiene mayor MOIC
- A tiene menor MOIC
- Es igual

<details><summary>Ver respuesta</summary>

**Correcta:** Es igual · *(En el mock: A tiene mayor MOIC)*

**Por qué:** El MOIC ignora el tiempo. La TIR sí premiaría a A.

</details>

### Pregunta 65
¿Cuándo es más probable activar un clawback?

- Salidas exitosas al inicio y más ganancias después
- Salidas exitosas al inicio y pérdidas después
- Salidas malas al inicio y ganancias después

<details><summary>Ver respuesta</summary>

**Correcta:** Salidas exitosas al inicio y pérdidas después · *(En el mock: Salidas malas al inicio y ganancias después)*

**Por qué:** El GP pudo cobrar incentivo sobre ganancias que luego se revierten, y los LP recuperan ese exceso.

</details>

## 📈 Equity (17/23 = 74 %)

### Pregunta 10
La mejor oferta de venta es $72 y el spread es $3, así que el mejor bid es $69. Entra una orden limitada de venta a $73. ¿Cómo se clasifica?

- Detrás del mercado
- Hace el mercado
- Toma el mercado

<details><summary>Ver respuesta</summary>

**Correcta:** Detrás del mercado · *(En el mock: Toma el mercado)*

**Por qué:** Una venta por encima de la mejor oferta queda detrás. Entre $69 y $72 haría el mercado. A $69 o menos lo tomaría.

</details>

### Pregunta 14
Una gestora debe vender un bloque muy grande de una acción poco negociada. ¿Dónde lo ejecuta, probablemente?

- Mercado de corretaje (brokered)
- Mercado dirigido por cotizaciones
- Mercado dirigido por órdenes

<details><summary>Ver respuesta</summary>

**Correcta:** Mercado de corretaje (brokered) · *(En el mock: Mercado dirigido por órdenes)*

**Por qué:** Los activos poco negociados y costosos de mantener en inventario necesitan un corredor que encuentre contraparte.

</details>

### Pregunta 18
¿Cuál es una desventaja de valorar acciones con múltiplos?

- Las diferencias contables dificultan comparar empresas
- No permiten comparaciones transversales
- Se calculan con dificultad

<details><summary>Ver respuesta</summary>

**Correcta:** Las diferencias contables dificultan comparar empresas · *(En el mock: No permiten comparaciones transversales)*

**Por qué:** Los múltiplos son fáciles de calcular y sirven para comparar. El problema es que las normas y políticas contables distorsionan esa comparación.

</details>

### Pregunta 49
¿Cómo se clasifica un índice como MSCI ACWI, con acciones de países desarrollados y emergentes?

- De amplio mercado
- Multimercado
- Sectorial global

<details><summary>Ver respuesta</summary>

**Correcta:** Multimercado · *(En el mock: Sectorial global)*

**Por qué:** Cubre varios mercados. Un índice de amplio mercado cubre uno solo, y uno sectorial se limita a un sector.

</details>

### Pregunta 52
Dividendo actual $2, crecimiento histórico 3 %, crecimiento esperado 6 % durante tres años, precio esperado al año 3 de $40 y retorno requerido 12 %. ¿Cuál es el valor intrínseco?

- $22,89
- $33,56
- $33,85

<details><summary>Ver respuesta</summary>

**Correcta:** $33,85 · *(En el mock: Usaste Gordon con el crecimiento histórico)*

**Por qué:** Descuenta $2,12, $2,25, $2,38 y $40 al 12 %. Usa el crecimiento esperado. Gordon con el histórico da 22,89 e ignora el precio objetivo.

</details>

### Pregunta 66
¿Cuál es el efecto de un dividendo en acciones?

- Cambia la participación proporcional de cada accionista
- No cambia el valor de la empresa
- Reduce el número de acciones

<details><summary>Ver respuesta</summary>

**Correcta:** No cambia el valor de la empresa · *(En el mock: Cambia la participación proporcional)*

**Por qué:** Reparte el mismo valor en más acciones y cada accionista conserva su porcentaje.

</details>

---

# Parte 2: las 54 acertadas (repásalas, sobre todo si adivinaste)

## 🔀 Derivatives

### Pregunta 5
Los inversionistas se vuelven más aversos al riesgo. En el modelo binomial, ¿qué le pasa a la probabilidad neutral al riesgo de una subida?

- Baja
- No cambia
- Sube

<details><summary>Ver respuesta</summary>

**Correcta:** No cambia

**Por qué:** El precio de la opción sale de una cobertura perfecta con el subyacente, así que no depende de la aversión al riesgo.

</details>

### Pregunta 15
Vendes una put europea por $25 con strike de $900. Al vencimiento el subyacente vale $940. ¿Cuál es tu resultado?

- +$25
- +$40
- −$15

<details><summary>Ver respuesta</summary>

**Correcta:** +$25

**Por qué:** La put vence sin valor porque el subyacente está sobre el strike. El vendedor conserva la prima: −máx(0; 900 − 940) + 25 = 25.

</details>

### Pregunta 25
Frente a los derivados en bolsa, ¿cómo es la transparencia de los OTC?

- Igual
- Mayor
- Menor

<details><summary>Ver respuesta</summary>

**Correcta:** Menor

**Por qué:** Muchas operaciones OTC conservan cierta privacidad. En bolsa, la información se reporta a la bolsa y a los reguladores.

</details>

### Pregunta 28
¿Cuál griega mide un riesgo de segundo orden?

- Delta
- Gamma
- Vega

<details><summary>Ver respuesta</summary>

**Correcta:** Gamma

**Por qué:** Gamma mide cómo cambia delta. Delta y vega son medidas de primer orden.

</details>

### Pregunta 31
Compras una call con strike igual al precio forward de $80 y prima de $4. Si tu ganancia al vencimiento es cero, ¿cuánto vale el subyacente?

- $76
- $80
- $84

<details><summary>Ver respuesta</summary>

**Correcta:** $84

**Por qué:** Ganancia = máx(0; S − 80) − 4 = 0, entonces S = 84. El subyacente supera al precio forward por el monto de la prima.

</details>

### Pregunta 88
¿Cómo se replica un swap en el que recibes flotante y pagas fijo?

- Comprando un bono flotante financiado con un bono fijo
- Con forwards de valor inicial cero
- Con futuros largos y forwards cortos

<details><summary>Ver respuesta</summary>

**Correcta:** Comprando un bono flotante financiado con un bono fijo

**Por qué:** Estás largo en el flotante y corto en el fijo. Los forwards que replican un swap suelen estar fuera de mercado.

</details>

## 📉 Fixed Income

### Pregunta 6
Un emisor quiere poder recomprar su deuda antes del vencimiento si bajan las tasas. ¿Qué bono le conviene emitir?

- Callable
- Convertible
- Putable

<details><summary>Ver respuesta</summary>

**Correcta:** Callable

**Por qué:** La opción call pertenece al emisor. La put pertenece al tenedor, y la conversión también es un derecho del tenedor.

</details>

### Pregunta 12
La duración Macaulay de un bono es igual a su plazo al vencimiento. ¿Qué bono es, muy probablemente?

- Con cupón a la par
- Con cupón a prima
- Cupón cero

<details><summary>Ver respuesta</summary>

**Correcta:** Cupón cero

**Por qué:** El cupón cero tiene un solo flujo, al vencimiento, con peso de 100 %. Cualquier cupón acorta la duración frente al plazo.

</details>

### Pregunta 19
¿Qué describe la duración empírica?

- Estima la sensibilidad con métodos estadísticos y precios históricos
- Supera a la analítica en high yield bajo estrés
- Supone que rendimientos soberanos y spreads son independientes

<details><summary>Ver respuesta</summary>

**Correcta:** Estima la sensibilidad con métodos estadísticos y precios históricos

**Por qué:** El supuesto de independencia es de la duración analítica. En estrés, los spreads compensan la caída de tasas y la empírica de high yield resulta menor.

</details>

### Pregunta 22
Dos bonos son iguales salvo por una característica. Cuando suben las tasas, A cae más que B. ¿Qué es lo más probable?

- A es callable
- A tiene menor cupón
- A tiene menor plazo

<details><summary>Ver respuesta</summary>

**Correcta:** A tiene menor cupón

**Por qué:** Menor cupón implica mayor duración. La opción call limita la sensibilidad, y un plazo más corto también la reduce.

</details>

### Pregunta 26
Precio actual 100. Si el rendimiento sube 50 pb vale 96,5, y si baja 50 pb vale 104. ¿Cuál es la duración modificada anual aproximada?

- 15,0
- 4,0
- 7,5

<details><summary>Ver respuesta</summary>

**Correcta:** 7,5

**Por qué:** (104 − 96,5) / (2 × 0,005 × 100) = 7,5. El 15,0 olvida el 2 del denominador, y el 4,0 usa solo la subida de precio.

</details>

### Pregunta 35
Un bono de pago anual tiene cupón de 5 %, vence en 4 años y cuesta 95. ¿Cuál es su rendimiento aproximado?

- 5,16 %
- 6,44 %
- 6,46 %

<details><summary>Ver respuesta</summary>

**Correcta:** 6,46 %

**Por qué:** PMT = 5, N = 4, PV = −95, FV = 100 da 6,46 %. El 6,44 % trata el bono como semestral, y el 5,16 % intercambia cupón y plazo.

</details>

### Pregunta 41
¿Ante qué cambio mide la sensibilidad la convexidad efectiva?

- El rendimiento al vencimiento
- El rendimiento en el horizonte
- La curva de rendimiento de referencia

<details><summary>Ver respuesta</summary>

**Correcta:** La curva de rendimiento de referencia

**Por qué:** Es una medida de curva, útil cuando los flujos son inciertos. La convexidad aproximada usa el YTM.

</details>

### Pregunta 60
¿Cuál es el caso que menos corresponde a un Eurobono?

- Una empresa alemana emite en dólares para inversionistas de EE. UU.
- Una empresa brasileña emite en dólares para inversionistas japoneses
- Una empresa coreana emite en euros para inversionistas del Reino Unido

<details><summary>Ver respuesta</summary>

**Correcta:** Una empresa alemana emite en dólares para inversionistas de EE. UU.

**Por qué:** Emitir en el mercado local del país de la moneda, siendo extranjero, es un bono extranjero. Los otros se emiten fuera del país de la moneda.

</details>

### Pregunta 74
Tu portafolio incluye bonos fijos, callables y ABS. ¿Qué duración usas?

- Efectiva
- Macaulay
- Modificada

<details><summary>Ver respuesta</summary>

**Correcta:** Efectiva

**Por qué:** Con flujos inciertos no hay un YTM bien definido, por eso las duraciones de rendimiento no sirven.

</details>

### Pregunta 83
En una hipoteca residencial sin recurso, ¿qué puede hacer el prestamista si el deudor incumple?

- Ir contra otros activos del deudor
- No recuperar nada
- Recuperar solo con la propiedad

<details><summary>Ver respuesta</summary>

**Correcta:** Recuperar solo con la propiedad

**Por qué:** Ir contra otros activos corresponde a un préstamo con recurso.

</details>

### Pregunta 85
¿Quién es el dueño legal de los préstamos que respaldan un ABS?

- El originador
- El tenedor del ABS
- La entidad de propósito especial

<details><summary>Ver respuesta</summary>

**Correcta:** La entidad de propósito especial

**Por qué:** La SPE es independiente y protege los préstamos de una quiebra del originador.

</details>

### Pregunta 90
¿Cómo es el ajuste de notching en la deuda subordinada de emisores especulativos, frente a los de grado de inversión?

- Igual
- Mayor
- Menor

<details><summary>Ver respuesta</summary>

**Correcta:** Mayor

**Por qué:** A menor calificación senior no garantizada, mayor es el ajuste.

</details>

## 🧺 Portfolio Management

### Pregunta 33
En mercados eficientes y a largo plazo, ¿qué se espera de las acciones grandes frente a las pequeñas?

- Mayor retorno y mayor riesgo
- Mayor retorno y menor riesgo
- Menor retorno y menor riesgo

<details><summary>Ver respuesta</summary>

**Correcta:** Menor retorno y menor riesgo

**Por qué:** Un retorno mayor requiere más riesgo, y las empresas pequeñas son más riesgosas.

</details>

### Pregunta 36
Beta 1,2; retorno del título 13 %; retorno del mercado 10 %; tasa libre 3 %. ¿Cuál es el retorno anormal?

- 1,6 %
- 4,6 %
- −2,0 %

<details><summary>Ver respuesta</summary>

**Correcta:** 1,6 %

**Por qué:** Retorno esperado: 3 % + 1,2 × 7 % = 11,4 %. Anormal: 13 % − 11,4 % = 1,6 %.

</details>

### Pregunta 39
¿Cuál es un supuesto del CAPM?

- Inversionistas con varios períodos de tenencia
- Inversionistas grandes que mueven los precios
- Mercados sin costos de transacción ni impuestos

<details><summary>Ver respuesta</summary>

**Correcta:** Mercados sin costos de transacción ni impuestos

**Por qué:** El CAPM supone mercados sin fricciones, un solo período e inversionistas tomadores de precios.

</details>

### Pregunta 47
Retorno del portafolio 14 %, beta 1,2, mercado 9 %, tasa libre 3 %. ¿Cuál es el alfa de Jensen?

- 3,2 %
- 3,8 %
- 5,0 %

<details><summary>Ver respuesta</summary>

**Correcta:** 3,8 %

**Por qué:** 14 % − [3 % + 1,2 × (9 % − 3 %)] = 3,8 %.

</details>

### Pregunta 51
¿Para qué usa un gestor el IPS de un cliente?

- Para evaluar si una inversión es adecuada para ese cliente
- Para maximizar el retorno sin importar el riesgo
- Para minimizar el riesgo sin importar el retorno

<details><summary>Ver respuesta</summary>

**Correcta:** Para evaluar si una inversión es adecuada para ese cliente

**Por qué:** El IPS reúne objetivos de riesgo y retorno, que deben ser coherentes entre sí, y las restricciones del cliente.

</details>

### Pregunta 56
En un portafolio de igual ponderación, ¿qué disminuye si aumentan las correlaciones?

- El retorno esperado
- La desviación estándar
- La reducción de riesgo que aporta

<details><summary>Ver respuesta</summary>

**Correcta:** La reducción de riesgo que aporta

**Por qué:** El retorno no depende de las correlaciones, y la desviación sube. Se pierde beneficio de diversificación.

</details>

### Pregunta 70
¿Cómo se llama la incomodidad de recibir información que contradice lo que crees?

- Aversión al arrepentimiento
- Contabilidad mental
- Disonancia cognitiva

<details><summary>Ver respuesta</summary>

**Correcta:** Disonancia cognitiva

**Por qué:** Es la base de los sesgos de perseverancia en las creencias.

</details>

### Pregunta 72
¿Cómo se llama la pendiente de la línea de asignación de capital?

- Beta de mercado
- Precio de mercado del riesgo
- Prima de riesgo de mercado

<details><summary>Ver respuesta</summary>

**Correcta:** Precio de mercado del riesgo

**Por qué:** Es (E(R) − Rf) / σ. La prima de mercado es la pendiente de la SML.

</details>

### Pregunta 73
Las reglas de gasto anual de una fundación se documentan en su IPS como una restricción de:

- Horizonte de tiempo
- Legal y regulatoria
- Liquidez

<details><summary>Ver respuesta</summary>

**Correcta:** Liquidez

**Por qué:** Indican cuánto dinero debe poder retirarse del portafolio.

</details>

### Pregunta 76
Una inversión da 16 % o 4 % con igual probabilidad. Un inversionista la prefiere a 11 % seguro. ¿Cómo es su actitud ante el riesgo?

- Averso al riesgo
- Buscador de riesgo
- Neutral al riesgo

<details><summary>Ver respuesta</summary>

**Correcta:** Buscador de riesgo

**Por qué:** El valor esperado es 10 %, menor que el 11 % seguro. Solo quien busca riesgo elige la opción incierta.

</details>

## 🏗️ Alternative Investments

### Pregunta 2
Inviertes $2 millones en un hedge fund con comisión de incentivo de 20 % y hurdle duro de 5 %. El fondo rinde 18 % en el año. ¿Cuánto es la comisión de incentivo?

- $20.000
- $52.000
- $72.000

<details><summary>Ver respuesta</summary>

**Correcta:** $52.000

**Por qué:** Ganancia: $360.000. Hurdle: 5 % × $2 millones = $100.000. Con hurdle duro, el incentivo solo aplica al exceso: 20 % × $260.000 = $52.000.

</details>

### Pregunta 9
¿Qué describe mejor al venture capital frente a las acciones cotizadas?

- Exige un retorno mayor por su riesgo e iliquidez
- Se concentra en empresas maduras y establecidas
- Tiene un horizonte de inversión corto

<details><summary>Ver respuesta</summary>

**Correcta:** Exige un retorno mayor por su riesgo e iliquidez

**Por qué:** El venture capital financia etapas tempranas, con horizontes largos, iliquidez y más riesgo.

</details>

### Pregunta 16
¿Qué posición es típica de un fondo de arbitraje de convertibles?

- Acumular convertibles para influir en la empresa
- Comprar convertibles de empresas cerca de la quiebra
- Comprar el convertible y vender en corto la acción del emisor

<details><summary>Ver respuesta</summary>

**Correcta:** Comprar el convertible y vender en corto la acción del emisor

**Por qué:** Es una estrategia de valor relativo que aprovecha precios desalineados. Las otras dos describen estrategias de distress y activismo.

</details>

### Pregunta 21
¿Qué ayuda a explicar el rendimiento de conveniencia (convenience yield) en una materia prima?

- Un spot igual a lo que el mercado espera a futuro
- Un spot por debajo de lo que el mercado espera a futuro
- Un spot por encima de lo que el mercado espera a futuro

<details><summary>Ver respuesta</summary>

**Correcta:** Un spot por encima de lo que el mercado espera a futuro

**Por qué:** Tener la materia prima física en momentos de escasez aporta un beneficio no financiero que justifica pagar más hoy.

</details>

### Pregunta 24
¿Quiénes pueden emitir criptomonedas?

- Individuos, empresas y organizaciones
- Solo empresas y organizaciones
- Solo individuos

<details><summary>Ver respuesta</summary>

**Correcta:** Individuos, empresas y organizaciones

**Por qué:** Existen miles de criptomonedas creadas por los tres tipos de emisor.

</details>

### Pregunta 43
¿Qué activo permite retrasar la cosecha cuando los precios están bajos?

- Ambos
- Solo tierras agrícolas
- Solo tierras forestales

<details><summary>Ver respuesta</summary>

**Correcta:** Solo tierras forestales

**Por qué:** Los árboles siguen creciendo y se almacenan sin cortarlos. Los cultivos deben cosecharse cuando maduran.

</details>

### Pregunta 53
¿Cuál inversión en infraestructura es de mayor riesgo?

- Un activo brownfield arrendado al gobierno
- Un activo con flujos estables e historial
- Un proyecto greenfield sin demanda garantizada

<details><summary>Ver respuesta</summary>

**Correcta:** Un proyecto greenfield sin demanda garantizada

**Por qué:** Greenfield significa construir desde cero. Si además no hay demanda garantizada, los ingresos son inciertos.

</details>

### Pregunta 79
¿Qué caracteriza típicamente a las inversiones alternativas?

- Alta correlación con las tradicionales
- Más restricciones de rescate que las tradicionales
- Más transparencia que las tradicionales

<details><summary>Ver respuesta</summary>

**Correcta:** Más restricciones de rescate que las tradicionales

**Por qué:** Suelen tener lockups, iliquidez, menor transparencia y baja correlación.

</details>

### Pregunta 86
¿Qué documento rige la relación entre GP y LP en una sociedad limitada?

- El acuerdo de sociedad limitada (LPA)
- El prospecto de cada operación
- Una side letter

<details><summary>Ver respuesta</summary>

**Correcta:** El acuerdo de sociedad limitada (LPA)

**Por qué:** El GP controla las decisiones. Las side letters añaden términos para ciertos LP, fuera del LPA.

</details>

## 📈 Equity

### Pregunta 7
Una empresa emite acciones para pagar una adquisición y para mejorar su razón de deuda ante un covenant. ¿Son motivos válidos?

- Solo el covenant
- Solo la adquisición
- Sí, ambos

<details><summary>Ver respuesta</summary>

**Correcta:** Sí, ambos

**Por qué:** Las empresas emiten capital tanto para financiar compras como para cumplir covenants de deuda.

</details>

### Pregunta 8
Para decidir si una acción está cara o barata, ¿con qué comparas su precio de mercado?

- Valor en libros
- Valor intrínseco
- Valor nominal

<details><summary>Ver respuesta</summary>

**Correcta:** Valor intrínseco

**Por qué:** Precio menor al intrínseco indica subvaluación. Precio mayor indica sobrevaluación. Si son iguales, está valorada justamente.

</details>

### Pregunta 27
Un índice se lanza hoy en versiones de precio y de retorno total. ¿Cómo se comparan sus valores en el lanzamiento?

- El de precio es mayor
- El de precio es menor
- Son iguales

<details><summary>Ver respuesta</summary>

**Correcta:** Son iguales

**Por qué:** Parten igual. Con el tiempo, el de retorno total supera al de precio porque incorpora las distribuciones.

</details>

### Pregunta 45
¿Quién desarrolla sistemas de clasificación industrial?

- Entidades comerciales y agencias gubernamentales
- Solo agencias gubernamentales
- Solo entidades comerciales

<details><summary>Ver respuesta</summary>

**Correcta:** Entidades comerciales y agencias gubernamentales

**Por qué:** Ambos tipos de entidad los desarrollan y los usan.

</details>

### Pregunta 48
Compras a $40 con margen inicial de 60 % y margen de mantenimiento de 30 %. ¿Por debajo de qué precio recibes un llamado de margen?

- $22,86
- $24,00
- $34,29

<details><summary>Ver respuesta</summary>

**Correcta:** $22,86

**Por qué:** Deuda por acción: $16. Precio = 16 / (1 − 0,30) = $22,86.

</details>

### Pregunta 50
¿Qué ocurre, probablemente, con un índice de igual ponderación?

- Requiere rebalanceos poco frecuentes
- Subrepresenta a las empresas de gran capitalización
- Sus pesos dependen del precio de mercado

<details><summary>Ver respuesta</summary>

**Correcta:** Subrepresenta a las empresas de gran capitalización

**Por qué:** Todas pesan igual al rebalancear, así que necesita ajustes frecuentes y da menos peso a las grandes.

</details>

### Pregunta 57
¿Qué hacen normalmente los vendedores en corto?

- Limitan su pérdida a lo invertido
- Toman prestados títulos y los venden
- Venden títulos que ya poseen

<details><summary>Ver respuesta</summary>

**Correcta:** Toman prestados títulos y los venden

**Por qué:** Su ganancia máxima es de 100 %, y su pérdida potencial no tiene límite.

</details>

### Pregunta 59
Con eficiencia semifuerte, ¿qué necesita un analista fundamental para obtener retornos anormales?

- Estimar mejor las variables y anticipar sorpresas de utilidades
- Extrapolar datos históricos
- Usar reglas de trading sobre movimientos de precios

<details><summary>Ver respuesta</summary>

**Correcta:** Estimar mejor las variables y anticipar sorpresas de utilidades

**Por qué:** Necesita una ventaja al procesar información. Las reglas de precios son análisis técnico.

</details>

### Pregunta 61
¿Qué aportan principalmente los dealers de valores?

- Estructuración de IPO
- Liquidez
- Titulización de activos

<details><summary>Ver respuesta</summary>

**Correcta:** Liquidez

**Por qué:** Compran y venden con sus clientes por cuenta propia. Los IPO corresponden a bancos de inversión.

</details>

### Pregunta 68
Con margen mínimo de 40 %, ¿cuál es el apalancamiento máximo?

- 1,40
- 1,67
- 2,50

<details><summary>Ver respuesta</summary>

**Correcta:** 2,50

**Por qué:** Apalancamiento máximo = 1 / margen = 1 / 0,40 = 2,50.

</details>

### Pregunta 69
¿Qué acciones preferentes se pueden cambiar por un número fijo de acciones comunes?

- Acumulativas
- Convertibles
- Participativas

<details><summary>Ver respuesta</summary>

**Correcta:** Convertibles

**Por qué:** Las acumulativas acumulan dividendos impagos. Las participativas pueden recibir un dividendo adicional.

</details>

### Pregunta 75
¿Por dónde suele empezar el análisis de un banco?

- Balance general
- Flujos de caja
- Ingresos

<details><summary>Ver respuesta</summary>

**Correcta:** Balance general

**Por qué:** En la mayoría de empresas se empieza por los ingresos. En los bancos, por el balance.

</details>

### Pregunta 77
En el modelo de Gordon, ¿con qué se relaciona positivamente el P/E forward justificado?

- Con ambos
- Solo con el crecimiento
- Solo con el retorno requerido

<details><summary>Ver respuesta</summary>

**Correcta:** Solo con el crecimiento

**Por qué:** P/E = payout / (r − g). Sube con g y baja con r.

</details>

### Pregunta 78
ROA 10 %, apalancamiento 1,5 y payout 30 %. ¿Cuál es el crecimiento sostenible?

- 10,5 %
- 4,5 %
- 7,0 %

<details><summary>Ver respuesta</summary>

**Correcta:** 10,5 %

**Por qué:** ROE = 10 % × 1,5 = 15 %. Retención = 70 %. g = 70 % × 15 % = 10,5 %.

</details>

### Pregunta 80
¿Qué dice la anomalía de tamaño?

- Las pequeñas superan a las grandes ajustando por riesgo
- Los P/E bajos superan a los altos
- Los dividendos altos superan a los bajos

<details><summary>Ver respuesta</summary>

**Correcta:** Las pequeñas superan a las grandes ajustando por riesgo

**Por qué:** Las otras dos opciones describen el efecto valor.

</details>

### Pregunta 82
¿Qué tiende a aumentar la eficiencia del mercado?

- Más analistas siguiendo los títulos
- Más restricciones a las ventas en corto
- Más tiempo para ejecutar operaciones

<details><summary>Ver respuesta</summary>

**Correcta:** Más analistas siguiendo los títulos

**Por qué:** Las restricciones y las demoras limitan el arbitraje. Más analistas difunden mejor la información.

</details>

### Pregunta 89
Preferente de par $100, dividendo 6 % trimestral, precio $70, retractable a la par en 2 años. Retorno requerido nominal 10 %. ¿Cuál es su valor?

- $104,00
- $60,00
- $92,83

<details><summary>Ver respuesta</summary>

**Correcta:** $92,83

**Por qué:** Como cotiza muy por debajo de la par, la retracción es probable. PMT 1,5; N 8; I 2,5 %; FV 100 da $92,83.

</details>
