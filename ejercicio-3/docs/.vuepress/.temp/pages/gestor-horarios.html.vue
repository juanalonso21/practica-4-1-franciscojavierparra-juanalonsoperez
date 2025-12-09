<template><div><h1 id="gestor-de-horarios" tabindex="-1"><a class="header-anchor" href="#gestor-de-horarios"><span>Gestor de Horarios</span></a></h1>
<h2 id="proposito" tabindex="-1"><a class="header-anchor" href="#proposito"><span>Propósito</span></a></h2>
<p>El componente <code v-pre>GestorHorarios.vue</code> es una aplicación de una sola página (SPA) diseñada para gestionar los horarios de múltiples aulas. Permite a un administrador:</p>
<ul>
<li><strong>Visualizar Horarios</strong>: Ver el horario semanal de un aula seleccionada en una vista de cuadrícula (Días x Horas).</li>
<li><strong>Gestión de Reservas</strong>: Realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las reservas de asignaturas en los bloques horarios.</li>
<li><strong>Interactividad</strong>: Al hacer clic en las celdas, se pueden crear nuevas reservas (si está libre) o editar/borrar reservas existentes (si está ocupada).</li>
</ul>
<h2 id="estructura-de-datos" tabindex="-1"><a class="header-anchor" href="#estructura-de-datos"><span>Estructura de Datos</span></a></h2>
<p>El sistema se basa en las siguientes interfaces TypeScript definidas en <code v-pre>src/types/schedule.ts</code>.</p>
<h3 id="iasignatura" tabindex="-1"><a class="header-anchor" href="#iasignatura"><span>IAsignatura</span></a></h3>
<p>Define la información básica de una reserva para una asignatura.</p>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code class="language-typescript"><span class="line"><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">IAsignatura</span> <span class="token punctuation">{</span></span>
<span class="line">    nombre<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>   <span class="token comment">// Nombre de la asignatura (ej. "DWEC")</span></span>
<span class="line">    profesor<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// Nombre del profesor (ej. "A. Pérez")</span></span>
<span class="line">    grupo<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>    <span class="token comment">// Grupo o curso (ej. "2DAW")</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="bloquehorario" tabindex="-1"><a class="header-anchor" href="#bloquehorario"><span>BloqueHorario</span></a></h3>
<p>Representa una celda individual en el horario. Puede contener una <code v-pre>IAsignatura</code> si está reservado, o ser <code v-pre>null</code> si está libre.</p>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code class="language-typescript"><span class="line"><span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">BloqueHorario</span> <span class="token operator">=</span> IAsignatura <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="horarioaula" tabindex="-1"><a class="header-anchor" href="#horarioaula"><span>HorarioAula</span></a></h3>
<p>Es una matriz que representa el horario completo de un aula.</p>
<ul>
<li><strong>Filas</strong>: Días de la semana (0 = Lunes, 4 = Viernes).</li>
<li><strong>Columnas</strong>: Bloques horarios (0 = 08:00, 5 = 13:00).</li>
</ul>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code class="language-typescript"><span class="line"><span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">HorarioAula</span> <span class="token operator">=</span> BloqueHorario<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="horariosdata" tabindex="-1"><a class="header-anchor" href="#horariosdata"><span>HorariosData</span></a></h3>
<p>Es la estructura principal que almacena los horarios de todas las aulas. Es un objeto donde:</p>
<ul>
<li><strong>Clave</strong>: Nombre del aula (string).</li>
<li><strong>Valor</strong>: La matriz <code v-pre>HorarioAula</code> correspondiente.</li>
</ul>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code class="language-typescript"><span class="line"><span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">HorariosData</span> <span class="token operator">=</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> HorarioAula<span class="token operator">></span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="ejemplo-de-datos-iniciales" tabindex="-1"><a class="header-anchor" href="#ejemplo-de-datos-iniciales"><span>Ejemplo de Datos Iniciales</span></a></h2>
<p>Así es como se estructuran los datos dentro del componente:</p>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code class="language-typescript"><span class="line"><span class="token keyword">const</span> horarios <span class="token operator">=</span> <span class="token generic-function"><span class="token function">ref</span><span class="token generic class-name"><span class="token operator">&lt;</span>HorariosData<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token string-property property">'Aula 101'</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token comment">// Lunes: 1ª hora ocupada, resto libres</span></span>
<span class="line">    <span class="token punctuation">[</span></span>
<span class="line">      <span class="token punctuation">{</span> nombre<span class="token operator">:</span> <span class="token string">'DAWEC'</span><span class="token punctuation">,</span> profesor<span class="token operator">:</span> <span class="token string">'A. Pérez'</span><span class="token punctuation">,</span> grupo<span class="token operator">:</span> <span class="token string">'2DAW'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token keyword">null</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token keyword">null</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token keyword">null</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token keyword">null</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token keyword">null</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// ... resto de días</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token string-property property">'Aula 205'</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">      <span class="token comment">// ... horario vacío o con reservas</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


