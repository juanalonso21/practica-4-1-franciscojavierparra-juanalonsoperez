<template><div><h1 id="componente-salacine" tabindex="-1"><a class="header-anchor" href="#componente-salacine"><span>Componente SalaCine</span></a></h1>
<p>Este componente permite a los usuarios visualizar una sala de cine, seleccionar butacas y confirmar reservas.</p>
<h2 id="uso" tabindex="-1"><a class="header-anchor" href="#uso"><span>Uso</span></a></h2>
<div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue"><pre v-pre><code class="language-vue"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">import</span> SalaCine <span class="token keyword">from</span> <span class="token string">'@/components/SalaCine.vue'</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>SalaCine</span> <span class="token attr-name">:filas</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>5<span class="token punctuation">"</span></span> <span class="token attr-name">:columnas</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>8<span class="token punctuation">"</span></span> <span class="token attr-name">:precio-por-butaca</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>9.5<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="props" tabindex="-1"><a class="header-anchor" href="#props"><span>Props</span></a></h2>
<table>
<thead>
<tr>
<th>Prop</th>
<th>Tipo</th>
<th>Requerido</th>
<th>Default</th>
<th>Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>filas</code></td>
<td><code v-pre>Number</code></td>
<td>Sí</td>
<td>-</td>
<td>Número de filas de butacas en la sala.</td>
</tr>
<tr>
<td><code v-pre>columnas</code></td>
<td><code v-pre>Number</code></td>
<td>Sí</td>
<td>-</td>
<td>Número de butacas por cada fila.</td>
</tr>
<tr>
<td><code v-pre>precioPorButaca</code></td>
<td><code v-pre>Number</code></td>
<td>No</td>
<td><code v-pre>8</code></td>
<td>Precio individual por cada butaca en euros.</td>
</tr>
</tbody>
</table>
<h2 id="tipos-de-datos" tabindex="-1"><a class="header-anchor" href="#tipos-de-datos"><span>Tipos de Datos</span></a></h2>
<h3 id="estadobutaca-enum" tabindex="-1"><a class="header-anchor" href="#estadobutaca-enum"><span>EstadoButaca (Enum)</span></a></h3>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code class="language-typescript"><span class="line"><span class="token keyword">export</span> <span class="token keyword">enum</span> EstadoButaca <span class="token punctuation">{</span></span>
<span class="line">  <span class="token constant">DISPONIBLE</span> <span class="token operator">=</span> <span class="token string">'disponible'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token constant">SELECCIONADO</span> <span class="token operator">=</span> <span class="token string">'seleccionado'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token constant">OCUPADO</span> <span class="token operator">=</span> <span class="token string">'ocupado'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token constant">DA</span>Ñ<span class="token constant">ADO</span> <span class="token operator">=</span> <span class="token string">'dañado'</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ibutaca-interface" tabindex="-1"><a class="header-anchor" href="#ibutaca-interface"><span>IButaca (Interface)</span></a></h3>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code class="language-typescript"><span class="line"><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">IButaca</span> <span class="token punctuation">{</span></span>
<span class="line">  id<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token comment">// Identificador único (ej. "F1-C1")</span></span>
<span class="line">  fila<span class="token operator">:</span> <span class="token builtin">number</span></span>
<span class="line">  columna<span class="token operator">:</span> <span class="token builtin">number</span></span>
<span class="line">  estado<span class="token operator">:</span> EstadoButaca</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ejemplo-interactivo" tabindex="-1"><a class="header-anchor" href="#ejemplo-interactivo"><span>Ejemplo Interactivo</span></a></h2>
<SalaCine :filas="6" :columnas="6" :precio-por-butaca="10" /></div></template>


<script setup>
import SalaCine from '@/components/SalaCine.vue'
</script>