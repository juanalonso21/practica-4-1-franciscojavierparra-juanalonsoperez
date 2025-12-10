<template><div><h1 id="patron-singleton-appconfig" tabindex="-1"><a class="header-anchor" href="#patron-singleton-appconfig"><span>Patrón Singleton: AppConfig</span></a></h1>
<h2 id="proposito" tabindex="-1"><a class="header-anchor" href="#proposito"><span>Propósito</span></a></h2>
<p>Se ha elegido el patrón <strong>Singleton</strong> para la clase <code v-pre>AppConfig</code> para garantizar que exista una <strong>única instancia</strong> que gestione la configuración global de la aplicación (tema, idioma, fuentes). Esto asegura que todos los componentes accedan y modifiquen la misma &quot;fuente de la verdad&quot;, manteniendo la consistencia en toda la interfaz de usuario.</p>
<h2 id="interfaz-iappsettings" tabindex="-1"><a class="header-anchor" href="#interfaz-iappsettings"><span>Interfaz IAppSettings</span></a></h2>
<p>Define la estructura del objeto de configuración.</p>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code class="language-typescript"><span class="line"><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">IAppSettings</span> <span class="token punctuation">{</span></span>
<span class="line">  theme<span class="token operator">:</span> <span class="token string">'light'</span> <span class="token operator">|</span> <span class="token string">'dark'</span></span>
<span class="line">  language<span class="token operator">:</span> <span class="token string">'es'</span> <span class="token operator">|</span> <span class="token string">'en'</span> <span class="token operator">|</span> <span class="token string">'fr'</span></span>
<span class="line">  fontSize<span class="token operator">:</span> <span class="token string">'small'</span> <span class="token operator">|</span> <span class="token string">'medium'</span> <span class="token operator">|</span> <span class="token string">'large'</span></span>
<span class="line">  fontFamily<span class="token operator">:</span> <span class="token string">'Arial'</span> <span class="token operator">|</span> <span class="token string">'Verdana'</span> <span class="token operator">|</span> <span class="token string">'Georgia'</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="api-publica" tabindex="-1"><a class="header-anchor" href="#api-publica"><span>API Pública</span></a></h2>
<h3 id="static-getinstance-appconfig" tabindex="-1"><a class="header-anchor" href="#static-getinstance-appconfig"><span><code v-pre>static getInstance(): AppConfig</code></span></a></h3>
<p>Devuelve la instancia única de la clase <code v-pre>AppConfig</code>. Si no existe, la crea.</p>
<h3 id="getsettings-deepreadonly-ref-iappsettings" tabindex="-1"><a class="header-anchor" href="#getsettings-deepreadonly-ref-iappsettings"><span><code v-pre>getSettings(): DeepReadonly&lt;Ref&lt;IAppSettings&gt;&gt;</code></span></a></h3>
<p>Devuelve el estado actual de la configuración como un objeto reactivo de solo lectura.</p>
<ul>
<li><strong>Retorno</strong>: <code v-pre>DeepReadonly&lt;Ref&lt;IAppSettings&gt;&gt;</code></li>
</ul>
<h3 id="settheme-theme-light-dark-void" tabindex="-1"><a class="header-anchor" href="#settheme-theme-light-dark-void"><span><code v-pre>setTheme(theme: 'light' | 'dark'): void</code></span></a></h3>
<p>Cambia el tema de la aplicación y persiste el cambio.</p>
<h3 id="setlanguage-lang-es-en-fr-void" tabindex="-1"><a class="header-anchor" href="#setlanguage-lang-es-en-fr-void"><span><code v-pre>setLanguage(lang: 'es' | 'en' | 'fr'): void</code></span></a></h3>
<p>Cambia el idioma de la aplicación y persiste el cambio.</p>
<h3 id="setfontsize-size-small-medium-large-void" tabindex="-1"><a class="header-anchor" href="#setfontsize-size-small-medium-large-void"><span><code v-pre>setFontSize(size: 'small' | 'medium' | 'large'): void</code></span></a></h3>
<p>Cambia el tamaño de la fuente y persiste el cambio.</p>
<h3 id="setfontfamily-font-arial-verdana-georgia-void" tabindex="-1"><a class="header-anchor" href="#setfontfamily-font-arial-verdana-georgia-void"><span><code v-pre>setFontFamily(font: 'Arial' | 'Verdana' | 'Georgia'): void</code></span></a></h3>
<p>Cambia la familia de la fuente y persiste el cambio.</p>
<h2 id="guia-de-uso" tabindex="-1"><a class="header-anchor" href="#guia-de-uso"><span>Guía de Uso</span></a></h2>
<h3 id="lectura-de-configuracion-componente" tabindex="-1"><a class="header-anchor" href="#lectura-de-configuracion-componente"><span>Lectura de Configuración (Componente)</span></a></h3>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code class="language-typescript"><span class="line"><span class="token operator">&lt;</span>script setup lang<span class="token operator">=</span><span class="token string">"ts"</span><span class="token operator">></span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> AppConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@/services/AppConfig'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> config <span class="token operator">=</span> AppConfig<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> settings <span class="token operator">=</span> config<span class="token punctuation">.</span><span class="token function">getSettings</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span></span>
<span class="line"></span>
<span class="line"><span class="token operator">&lt;</span>template<span class="token operator">></span></span>
<span class="line">  <span class="token operator">&lt;</span>div <span class="token operator">:</span><span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"settings.theme"</span><span class="token operator">></span></span>
<span class="line">    Tema actual<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> settings<span class="token punctuation">.</span>theme <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span></span>
<span class="line"><span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="modificacion-de-configuracion" tabindex="-1"><a class="header-anchor" href="#modificacion-de-configuracion"><span>Modificación de Configuración</span></a></h3>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code class="language-typescript"><span class="line"><span class="token operator">&lt;</span>script setup lang<span class="token operator">=</span><span class="token string">"ts"</span><span class="token operator">></span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> AppConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@/services/AppConfig'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> config <span class="token operator">=</span> AppConfig<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">cambiarTemaOscuro</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  config<span class="token punctuation">.</span><span class="token function">setTheme</span><span class="token punctuation">(</span><span class="token string">'dark'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


