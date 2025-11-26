<script setup lang="ts">
import { onMounted } from 'vue'
import { useJuego } from '@/composables/useJuego'

const {
  iniciarJuego,
  robarCarta,
  jugarCarta,
  manoJugador,
  cartaSuperiorDescarte,
  cantidadMazo,
  mensajeEstado,
  juegoTerminado,
} = useJuego()

onMounted(() => {
  iniciarJuego()
})
</script>

<template>
  <div class="juego-container">
    <h1>Juego: El Último Descarte</h1>

    <div class="tablero">
      <!-- Zona Superior: Mazo y Descarte -->
      <div class="zona-mazos">
        <!-- Mazo de Robo -->
        <div class="mazo-container" @click="robarCarta">
          <div class="carta-dorso" :class="{ vacio: cantidadMazo === 0 }">
            <span v-if="cantidadMazo > 0">MAZO</span>
            <span v-else>VACÍO</span>
          </div>
          <p>Cartas: {{ cantidadMazo }}</p>
          <button @click.stop="robarCarta" :disabled="juegoTerminado">Robar Carta</button>
        </div>

        <!-- Pila de Descarte -->
        <div class="descarte-container">
          <div
            v-if="cartaSuperiorDescarte"
            class="carta-frente"
            :class="cartaSuperiorDescarte.color"
          >
            <span class="esquina-top"
              >{{ cartaSuperiorDescarte.valor }}{{ cartaSuperiorDescarte.simbolo }}</span
            >
            <span class="centro">{{ cartaSuperiorDescarte.simbolo }}</span>
            <span class="esquina-bottom"
              >{{ cartaSuperiorDescarte.valor }}{{ cartaSuperiorDescarte.simbolo }}</span
            >
          </div>
          <p>Descarte (Cima)</p>
        </div>
      </div>

      <!-- Zona de Mensajes -->
      <div class="info-panel" :class="{ victoria: juegoTerminado }">
        {{ mensajeEstado }}
        <button v-if="juegoTerminado" @click="iniciarJuego">Jugar de nuevo</button>
      </div>

      <!-- Zona Inferior: Mano del Jugador -->
      <div class="mano-jugador">
        <h3>Tu Mano ({{ manoJugador.length }})</h3>
        <div class="cartas-lista">
          <div
            v-for="(carta, index) in manoJugador"
            :key="index"
            class="carta-frente carta-mano"
            :class="carta.color"
            @click="jugarCarta(carta)"
          >
            <span class="esquina-top">{{ carta.valor }}{{ carta.simbolo }}</span>
            <span class="centro">{{ carta.simbolo }}</span>
            <span class="esquina-bottom">{{ carta.valor }}{{ carta.simbolo }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.juego-container {
  font-family: 'Arial', sans-serif;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  background-color: #2c3e50;
  color: white;
  border-radius: 10px;
}

.zona-mazos {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 30px;
}

/* Estilos de Cartas */
.carta-dorso,
.carta-frente {
  width: 100px;
  height: 140px;
  border-radius: 8px;
  border: 2px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
  background-color: white;
  user-select: none;
}

.carta-dorso {
  background: repeating-linear-gradient(45deg, #1a4c6e, #1a4c6e 10px, #153c57 10px, #153c57 20px);
  color: white;
  justify-content: center;
}

.carta-dorso.vacio {
  background: rgba(255, 255, 255, 0.1);
  border: 2px dashed #ccc;
}

.carta-frente {
  color: black;
}
.carta-frente.red {
  color: #e74c3c;
}
.carta-frente.black {
  color: #2c3e50;
}

.carta-mano:hover {
  transform: translateY(-15px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.esquina-top {
  align-self: flex-start;
  font-size: 1.2rem;
}
.esquina-bottom {
  align-self: flex-end;
  transform: rotate(180deg);
  font-size: 1.2rem;
}
.centro {
  font-size: 3rem;
}

.cartas-lista {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.info-panel {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 15px;
  margin: 20px 0;
  border-radius: 5px;
  min-height: 50px;
}
.victoria {
  background-color: #27ae60;
  font-size: 1.2em;
  font-weight: bold;
}
button {
  margin-top: 10px;
  padding: 8px 16px;
  cursor: pointer;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
}
button:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}
</style>
