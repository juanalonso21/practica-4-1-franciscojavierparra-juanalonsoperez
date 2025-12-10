<template><div><h1 id="guia-de-testing" tabindex="-1"><a class="header-anchor" href="#guia-de-testing"><span>Guía de Testing</span></a></h1>
<p>El proyecto utiliza <strong>Vitest</strong> para las pruebas unitarias. Se ha diseñado una suite de tests para verificar la correcta funcionalidad del componente principal <code v-pre>SalaCine.vue</code>.</p>
<h2 id="ejecucion-de-tests" tabindex="-1"><a class="header-anchor" href="#ejecucion-de-tests"><span>Ejecución de Tests</span></a></h2>
<p>Para lanzar las pruebas, ejecuta:</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">npm</span> run test:unit</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="casos-de-prueba" tabindex="-1"><a class="header-anchor" href="#casos-de-prueba"><span>Casos de Prueba</span></a></h2>
<p>El archivo de especificación <code v-pre>src/components/__tests__/SalaCine.spec.ts</code> cubre los siguientes escenarios:</p>
<h3 id="_1-inicializacion" tabindex="-1"><a class="header-anchor" href="#_1-inicializacion"><span>1. Inicialización</span></a></h3>
<p>Verifica que la sala se crea con las dimensiones correctas (filas x columnas) y que las butacas inician en estado <code v-pre>DISPONIBLE</code>, excepto aquellas marcadas manualmente como <code v-pre>DAÑADO</code>.</p>
<h3 id="_2-seleccion-de-butaca-disponible" tabindex="-1"><a class="header-anchor" href="#_2-seleccion-de-butaca-disponible"><span>2. Selección de Butaca Disponible</span></a></h3>
<p>Comprueba que al hacer clic en una butaca disponible, su estado cambia a <code v-pre>SELECCIONADO</code>.</p>
<h3 id="_3-deseleccion-de-butaca" tabindex="-1"><a class="header-anchor" href="#_3-deseleccion-de-butaca"><span>3. Deselección de Butaca</span></a></h3>
<p>Verifica que al volver a hacer clic en una butaca seleccionada, regresa al estado <code v-pre>DISPONIBLE</code>.</p>
<h3 id="_4-restriccion-de-seleccion" tabindex="-1"><a class="header-anchor" href="#_4-restriccion-de-seleccion"><span>4. Restricción de Selección</span></a></h3>
<p>Asegura que no se puedan seleccionar butacas en estado <code v-pre>OCUPADO</code> o <code v-pre>DAÑADO</code>.</p>
<h3 id="_5-confirmacion-de-reserva" tabindex="-1"><a class="header-anchor" href="#_5-confirmacion-de-reserva"><span>5. Confirmación de Reserva</span></a></h3>
<p>Verifica que al confirmar la reserva, todas las butacas seleccionadas cambian a estado <code v-pre>OCUPADO</code> y el resto permanecen inalteradas.</p>
<h3 id="_6-calculo-del-total" tabindex="-1"><a class="header-anchor" href="#_6-calculo-del-total"><span>6. Cálculo del Total</span></a></h3>
<p>Confirma que la propiedad computada <code v-pre>totalAPagar</code> calcula correctamente el precio basándose en el número de butacas seleccionadas y el <code v-pre>precioPorButaca</code>.</p>
</div></template>


