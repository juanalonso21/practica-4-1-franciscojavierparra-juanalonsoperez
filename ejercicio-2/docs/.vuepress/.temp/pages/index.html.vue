<template><div><h1 id="bienvenido-a-la-documentacion" tabindex="-1"><a class="header-anchor" href="#bienvenido-a-la-documentacion"><span>Bienvenido a la Documentación</span></a></h1>
<p>Esta es la documentación del proyecto <strong>Gestor Interactivo de Sala de Cine</strong>.</p>
<h2 id="guia-de-inicio" tabindex="-1"><a class="header-anchor" href="#guia-de-inicio"><span>Guía de Inicio</span></a></h2>
<h3 id="requisitos-previos" tabindex="-1"><a class="header-anchor" href="#requisitos-previos"><span>Requisitos Previos</span></a></h3>
<ul>
<li><strong>Node.js</strong>: Versión 20.19.0 o superior recomendada.</li>
<li><strong>npm</strong>: Gestor de paquetes incluido con Node.js.</li>
</ul>
<h3 id="instalacion" tabindex="-1"><a class="header-anchor" href="#instalacion"><span>Instalación</span></a></h3>
<ol>
<li>Clona el repositorio en tu máquina local.</li>
<li>Abre una terminal en la carpeta del proyecto.</li>
<li>Instala las dependencias ejecutando:</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">npm</span> <span class="token function">install</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="comandos-disponibles" tabindex="-1"><a class="header-anchor" href="#comandos-disponibles"><span>Comandos Disponibles</span></a></h3>
<h4 id="entorno-de-desarrollo" tabindex="-1"><a class="header-anchor" href="#entorno-de-desarrollo"><span>Entorno de Desarrollo</span></a></h4>
<p>Para iniciar la aplicación Vue en modo desarrollo (con recarga en caliente):</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">npm</span> run dev</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>La aplicación estará disponible generalmente en <code v-pre>http://localhost:5173</code>.</p>
<h4 id="visualizar-documentacion" tabindex="-1"><a class="header-anchor" href="#visualizar-documentacion"><span>Visualizar Documentación</span></a></h4>
<p>Para ver esta documentación en tu navegador mientras la editas:</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">npm</span> run docs:dev</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>La documentación se servirá en <code v-pre>http://localhost:8080</code> (o puerto similar).</p>
<h4 id="ejecutar-tests" tabindex="-1"><a class="header-anchor" href="#ejecutar-tests"><span>Ejecutar Tests</span></a></h4>
<p>Para verificar que todo funciona correctamente, puedes ejecutar las pruebas unitarias:</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">npm</span> run test:unit</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="componentes" tabindex="-1"><a class="header-anchor" href="#componentes"><span>Componentes</span></a></h2>
<ul>
<li><RouteLink to="/sala-cine.html">SalaCine</RouteLink>: Componente principal para visualizar y gestionar butacas. Incluye documentación detallada de Props, Métodos y Tipos.</li>
</ul>
</div></template>


