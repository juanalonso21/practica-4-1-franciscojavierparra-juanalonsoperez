# Juego de Cartas (El Último Descarte)

## Descripción General
Este proyecto implementa el juego de cartas "El Último Descarte" utilizando Vue 3 y TypeScript. El objetivo es quedarse sin cartas en la mano descartándolas sobre la pila de descarte si coinciden en **palo** o **valor**.

## Arquitectura del Código

### Clase Pila
**Ubicación:** `src/core/Pila.ts`

La clase `Pila<T>` es una implementación genérica de una estructura de datos LIFO (Last-In, First-Out). Se utiliza para manejar tanto el mazo de robo como la pila de descarte.

**Métodos Principales:**
- `push(elemento: T): void`: Agrega un elemento a la cima de la pila.
- `pop(): T | undefined`: Extrae y devuelve el elemento en la cima. Retorna `undefined` si la pila está vacía.
- `peek(): T | undefined`: Devuelve el elemento en la cima sin extraerlo (útil para ver la carta superior del descarte).
- `size(): number`: Devuelve la cantidad de elementos en la pila.
- `isEmpty(): boolean`: Verifica si la pila está vacía.
- `getElementos(): T[]`: Retorna una copia del array interno (útil para barajar o persistencia).
- `clear(): void`: Vacía la pila completamente.

### Clase Carta
**Ubicación:** `src/core/Carta.ts`

Representa una carta individual de la baraja francesa. Contiene tanto los datos de la carta como la lógica básica de si puede jugarse.

**Propiedades:**
- `palo`: El palo de la carta ('Picas', 'Corazones', 'Tréboles', 'Diamantes').
- `valor`: El valor de la carta ('2'...'10', 'J', 'Q', 'K', 'A').
- `id`: Identificador único (UUID) para el manejo reactivo en listas (v-for).
- `color` (getter): Retorna 'red' o 'black' según el palo.
- `simbolo` (getter): Retorna el emoji correspondiente al palo (♥, ♦, ♠, ♣).
- `nombre` (getter): Descripción legible (ej. "10 de Corazones").

**Métodos:**
- `esJugableSobre(otraCarta: Carta): boolean`: Determina la regla principal del juego. Retorna `true` si:
  - Los palos coinciden.
  - Los valores coinciden.

### Composable useJuego
**Ubicación:** `src/composables/useJuego.ts`

Este *composable* encapsula la lógica de estado y las reglas del juego, separándola de la interfaz gráfica.

**Estado Reactivo Expuesto:**
- `manoJugador` (Readonly): Array de cartas en la mano del jugador.
- `mensajeEstado` (Readonly): String con mensajes de retroalimentación ("Has robado...", "¡Ganaste!").
- `juegoTerminado` (Readonly): Booleano que indica si el juego ha finalizado.
- `cartaSuperiorDescarte` (Computed): La carta visible en la pila de descarte.
- `cantidadMazo` (Computed): Número de cartas restantes en el mazo de robo.

**Funciones (Acciones):**
- `iniciarJuego()`: Resetea el estado, crea la baraja, baraja las cartas y reparte 7 al jugador y 1 al descarte.
- `robarCarta()`: Mueve una carta del mazo a la mano del jugador.
- `jugarCarta(carta: Carta)`: Intenta jugar una carta de la mano al descarte. Valida con `esJugableSobre`. Si es válida, verifica si el jugador ha ganado (mano vacía).
- `reconstituirMazo()`: Si el mazo se agota, toma las cartas del descarte (salvo la superior), las baraja y las devuelve al mazo.

### Componente JuegoCartas.vue
**Ubicación:** `src/components/JuegoCartas.vue`

El componente visual principal.
- **Propósito**: Renderizar el tablero de juego y conectar las interacciones del usuario con `useJuego`.
- **Estructura Visual**:
  - Zona Superior: Mazo de robo (interactivo) y Pila de descarte.
  - Zona Central: Panel de mensajes (feedback).
  - Zona Inferior: Mano del jugador (lista de cartas interactiva).
- **Animaciones**: Utiliza `<TransitionGroup>` para animar la entrada y salida de cartas de la mano.

## Flujo del Juego y Reglas

### Preparación
Al cargar la página, se inicia automáticamente una nueva partida (`iniciarJuego`). Se barajan 52 cartas y se reparten 7 al jugador. Una carta inicial se coloca boca arriba en el descarte.

### Interacciones
1. **Robar**: Haz clic en el mazo (dorso) o en el botón "Robar Carta" para añadir una carta a tu mano.
2. **Jugar Carta**: Haz clic en cualquier carta de tu mano.
   - **Regla de Validación**: La carta solo se moverá al descarte si coincide en **Palo** o **Valor** con la carta visible del descarte.
   - Si no es válida, el sistema te avisará en el panel de mensajes.
3. **Barajar Descarte**: Si el mazo de robo se queda vacío, aparecerá un botón "Barajar Descarte" para reciclar las cartas jugadas.

### Condición de Victoria
El juego termina cuando te quedas sin cartas en la mano. Aparecerá un mensaje de victoria y un botón para reiniciar.
