<template><div><h1 id="juego-de-cartas-el-ultimo-descarte" tabindex="-1"><a class="header-anchor" href="#juego-de-cartas-el-ultimo-descarte"><span>Juego de Cartas (El Último Descarte)</span></a></h1>
<h2 id="descripcion-general" tabindex="-1"><a class="header-anchor" href="#descripcion-general"><span>Descripción General</span></a></h2>
<p>Este proyecto implementa el juego de cartas &quot;El Último Descarte&quot; utilizando Vue 3 y TypeScript. El objetivo es quedarse sin cartas en la mano descartándolas sobre la pila de descarte si coinciden en <strong>palo</strong> o <strong>valor</strong>.</p>
<h2 id="arquitectura-del-codigo" tabindex="-1"><a class="header-anchor" href="#arquitectura-del-codigo"><span>Arquitectura del Código</span></a></h2>
<h3 id="clase-pila" tabindex="-1"><a class="header-anchor" href="#clase-pila"><span>Clase Pila</span></a></h3>
<p><strong>Ubicación:</strong> <code v-pre>src/core/Pila.ts</code></p>
<p>La clase <code v-pre>Pila&lt;T&gt;</code> es una implementación genérica de una estructura de datos LIFO (Last-In, First-Out). Se utiliza para manejar tanto el mazo de robo como la pila de descarte.</p>
<p><strong>Métodos Principales:</strong></p>
<ul>
<li><code v-pre>push(elemento: T): void</code>: Agrega un elemento a la cima de la pila.</li>
<li><code v-pre>pop(): T | undefined</code>: Extrae y devuelve el elemento en la cima. Retorna <code v-pre>undefined</code> si la pila está vacía.</li>
<li><code v-pre>peek(): T | undefined</code>: Devuelve el elemento en la cima sin extraerlo (útil para ver la carta superior del descarte).</li>
<li><code v-pre>size(): number</code>: Devuelve la cantidad de elementos en la pila.</li>
<li><code v-pre>isEmpty(): boolean</code>: Verifica si la pila está vacía.</li>
<li><code v-pre>getElementos(): T[]</code>: Retorna una copia del array interno (útil para barajar o persistencia).</li>
<li><code v-pre>clear(): void</code>: Vacía la pila completamente.</li>
</ul>
<h3 id="clase-carta" tabindex="-1"><a class="header-anchor" href="#clase-carta"><span>Clase Carta</span></a></h3>
<p><strong>Ubicación:</strong> <code v-pre>src/core/Carta.ts</code></p>
<p>Representa una carta individual de la baraja francesa. Contiene tanto los datos de la carta como la lógica básica de si puede jugarse.</p>
<p><strong>Propiedades:</strong></p>
<ul>
<li><code v-pre>palo</code>: El palo de la carta ('Picas', 'Corazones', 'Tréboles', 'Diamantes').</li>
<li><code v-pre>valor</code>: El valor de la carta ('2'...'10', 'J', 'Q', 'K', 'A').</li>
<li><code v-pre>id</code>: Identificador único (UUID) para el manejo reactivo en listas (v-for).</li>
<li><code v-pre>color</code> (getter): Retorna 'red' o 'black' según el palo.</li>
<li><code v-pre>simbolo</code> (getter): Retorna el emoji correspondiente al palo (♥, ♦, ♠, ♣).</li>
<li><code v-pre>nombre</code> (getter): Descripción legible (ej. &quot;10 de Corazones&quot;).</li>
</ul>
<p><strong>Métodos:</strong></p>
<ul>
<li><code v-pre>esJugableSobre(otraCarta: Carta): boolean</code>: Determina la regla principal del juego. Retorna <code v-pre>true</code> si:
<ul>
<li>Los palos coinciden.</li>
<li>Los valores coinciden.</li>
</ul>
</li>
</ul>
<h3 id="composable-usejuego" tabindex="-1"><a class="header-anchor" href="#composable-usejuego"><span>Composable useJuego</span></a></h3>
<p><strong>Ubicación:</strong> <code v-pre>src/composables/useJuego.ts</code></p>
<p>Este <em>composable</em> encapsula la lógica de estado y las reglas del juego, separándola de la interfaz gráfica.</p>
<p><strong>Estado Reactivo Expuesto:</strong></p>
<ul>
<li><code v-pre>manoJugador</code> (Readonly): Array de cartas en la mano del jugador.</li>
<li><code v-pre>mensajeEstado</code> (Readonly): String con mensajes de retroalimentación (&quot;Has robado...&quot;, &quot;¡Ganaste!&quot;).</li>
<li><code v-pre>juegoTerminado</code> (Readonly): Booleano que indica si el juego ha finalizado.</li>
<li><code v-pre>cartaSuperiorDescarte</code> (Computed): La carta visible en la pila de descarte.</li>
<li><code v-pre>cantidadMazo</code> (Computed): Número de cartas restantes en el mazo de robo.</li>
</ul>
<p><strong>Funciones (Acciones):</strong></p>
<ul>
<li><code v-pre>iniciarJuego()</code>: Resetea el estado, crea la baraja, baraja las cartas y reparte 7 al jugador y 1 al descarte.</li>
<li><code v-pre>robarCarta()</code>: Mueve una carta del mazo a la mano del jugador.</li>
<li><code v-pre>jugarCarta(carta: Carta)</code>: Intenta jugar una carta de la mano al descarte. Valida con <code v-pre>esJugableSobre</code>. Si es válida, verifica si el jugador ha ganado (mano vacía).</li>
<li><code v-pre>reconstituirMazo()</code>: Si el mazo se agota, toma las cartas del descarte (salvo la superior), las baraja y las devuelve al mazo.</li>
</ul>
<h3 id="componente-juegocartas-vue" tabindex="-1"><a class="header-anchor" href="#componente-juegocartas-vue"><span>Componente JuegoCartas.vue</span></a></h3>
<p><strong>Ubicación:</strong> <code v-pre>src/components/JuegoCartas.vue</code></p>
<p>El componente visual principal.</p>
<ul>
<li><strong>Propósito</strong>: Renderizar el tablero de juego y conectar las interacciones del usuario con <code v-pre>useJuego</code>.</li>
<li><strong>Estructura Visual</strong>:
<ul>
<li>Zona Superior: Mazo de robo (interactivo) y Pila de descarte.</li>
<li>Zona Central: Panel de mensajes (feedback).</li>
<li>Zona Inferior: Mano del jugador (lista de cartas interactiva).</li>
</ul>
</li>
<li><strong>Animaciones</strong>: Utiliza <code v-pre>&lt;TransitionGroup&gt;</code> para animar la entrada y salida de cartas de la mano.</li>
</ul>
<h2 id="flujo-del-juego-y-reglas" tabindex="-1"><a class="header-anchor" href="#flujo-del-juego-y-reglas"><span>Flujo del Juego y Reglas</span></a></h2>
<h3 id="preparacion" tabindex="-1"><a class="header-anchor" href="#preparacion"><span>Preparación</span></a></h3>
<p>Al cargar la página, se inicia automáticamente una nueva partida (<code v-pre>iniciarJuego</code>). Se barajan 52 cartas y se reparten 7 al jugador. Una carta inicial se coloca boca arriba en el descarte.</p>
<h3 id="interacciones" tabindex="-1"><a class="header-anchor" href="#interacciones"><span>Interacciones</span></a></h3>
<ol>
<li><strong>Robar</strong>: Haz clic en el mazo (dorso) o en el botón &quot;Robar Carta&quot; para añadir una carta a tu mano.</li>
<li><strong>Jugar Carta</strong>: Haz clic en cualquier carta de tu mano.
<ul>
<li><strong>Regla de Validación</strong>: La carta solo se moverá al descarte si coincide en <strong>Palo</strong> o <strong>Valor</strong> con la carta visible del descarte.</li>
<li>Si no es válida, el sistema te avisará en el panel de mensajes.</li>
</ul>
</li>
<li><strong>Barajar Descarte</strong>: Si el mazo de robo se queda vacío, aparecerá un botón &quot;Barajar Descarte&quot; para reciclar las cartas jugadas.</li>
</ol>
<h3 id="condicion-de-victoria" tabindex="-1"><a class="header-anchor" href="#condicion-de-victoria"><span>Condición de Victoria</span></a></h3>
<p>El juego termina cuando te quedas sin cartas en la mano. Aparecerá un mensaje de victoria y un botón para reiniciar.</p>
</div></template>


