<template><div><h1 id="patron-factoria-notificaciones" tabindex="-1"><a class="header-anchor" href="#patron-factoria-notificaciones"><span>Patrón Factoría: Notificaciones</span></a></h1>
<h2 id="concepto" tabindex="-1"><a class="header-anchor" href="#concepto"><span>Concepto</span></a></h2>
<p>El <strong>Patrón Factoría (Factory Pattern)</strong> es un patrón de diseño creacional que proporciona una interfaz para crear objetos en una superclase, mientras permite a las subclases alterar el tipo de objetos que se crearán.</p>
<p>En este sistema de notificaciones, utilizamos el patrón factoría para encapsular la lógica de creación de los distintos tipos de notificadores (Email, SMS, Push). Esto nos permite:</p>
<ol>
<li><strong>Desacoplamiento</strong>: El código cliente (nuestro componente Vue) no necesita saber cómo instanciar cada clase de notificador específica (<code v-pre>new EmailNotifier()</code>, etc.). Solo necesita saber qué tipo de notificación quiere.</li>
<li><strong>Extensibilidad</strong>: Podemos añadir nuevos tipos de notificadores sin modificar el código que los utiliza (Open/Closed Principle).</li>
<li><strong>Centralización</strong>: La lógica de &quot;qué clase usar para qué tipo&quot; está en un solo lugar (<code v-pre>notificationFactory</code>).</li>
</ol>
<h2 id="la-interfaz-inotifier" tabindex="-1"><a class="header-anchor" href="#la-interfaz-inotifier"><span>La Interfaz INotifier</span></a></h2>
<p>La interfaz <code v-pre>INotifier</code> define el contrato común que todos los notificadores deben cumplir. Esto garantiza que cualquier notificador que creemos tendrá un método <code v-pre>send</code>.</p>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code class="language-typescript"><span class="line"><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">INotifier</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">send</span><span class="token punctuation">(</span>message<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="la-notificationfactory" tabindex="-1"><a class="header-anchor" href="#la-notificationfactory"><span>La notificationFactory</span></a></h2>
<p>La función <code v-pre>notificationFactory</code> es el núcleo de nuestro patrón. Recibe un tipo de notificación y devuelve una instancia de la clase correspondiente.</p>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code class="language-typescript"><span class="line"><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">notificationFactory</span><span class="token punctuation">(</span>type<span class="token operator">:</span> NotificationType<span class="token punctuation">)</span><span class="token operator">:</span> INotifier <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token string">'email'</span><span class="token operator">:</span></span>
<span class="line">      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">EmailNotifier</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token string">'sms'</span><span class="token operator">:</span></span>
<span class="line">      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SmsNotifier</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token string">'push'</span><span class="token operator">:</span></span>
<span class="line">      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">PushNotifier</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">default</span><span class="token operator">:</span></span>
<span class="line">      <span class="token comment">// Verificación de exhaustividad para atrapar errores en tiempo de compilación</span></span>
<span class="line">      <span class="token keyword">const</span> exhaustiveCheck<span class="token operator">:</span> <span class="token builtin">never</span> <span class="token operator">=</span> <span class="token keyword">type</span></span>
<span class="line">      <span class="token class-name"><span class="token keyword">throw</span></span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Tipo de notificación no soportado: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>exhaustiveCheck<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="como-anadir-un-nuevo-notificador-ej-whatsapp" tabindex="-1"><a class="header-anchor" href="#como-anadir-un-nuevo-notificador-ej-whatsapp"><span>Cómo Añadir un Nuevo Notificador (Ej. WhatsApp)</span></a></h2>
<p>Gracias al patrón factoría, añadir un nuevo tipo de notificación es un proceso estructurado y seguro:</p>
<ol>
<li>
<p><strong>Crear la nueva clase</strong>:
Crea <code v-pre>WhatsAppNotifier.ts</code> que implemente <code v-pre>INotifier</code>.</p>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code class="language-typescript"><span class="line"><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">WhatsAppNotifier</span> <span class="token keyword">implements</span> <span class="token class-name">INotifier</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">send</span><span class="token punctuation">(</span>message<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">[WHATSAPP] Enviando a: "</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>message<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">"</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Actualizar el tipo</strong>:
Añade <code v-pre>'whatsapp'</code> al tipo <code v-pre>NotificationType</code> en <code v-pre>notificationFactory.ts</code>.</p>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code class="language-typescript"><span class="line"><span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">NotificationType</span> <span class="token operator">=</span> <span class="token string">'email'</span> <span class="token operator">|</span> <span class="token string">'sms'</span> <span class="token operator">|</span> <span class="token string">'push'</span> <span class="token operator">|</span> <span class="token string">'whatsapp'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p><strong>Actualizar la factoría</strong>:
Añade el caso en el <code v-pre>switch</code> de <code v-pre>notificationFactory</code>.</p>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code class="language-typescript"><span class="line"><span class="token keyword">case</span> <span class="token string">'whatsapp'</span><span class="token operator">:</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">WhatsAppNotifier</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Actualizar la UI (Opcional)</strong>:
Añade la opción en el <code v-pre>&lt;select&gt;</code> de <code v-pre>NotificationComposer.vue</code> para que el usuario pueda seleccionarlo.</p>
</li>
</ol>
<p>El resto del sistema (el componente Vue que envía el mensaje) <strong>no necesita ningún cambio</strong> para soportar este nuevo tipo.</p>
</div></template>


