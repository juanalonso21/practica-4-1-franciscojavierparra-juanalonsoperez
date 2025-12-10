<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { IButaca } from '@/types/cinema'
import { EstadoButaca } from '@/types/cinema'

// --- Props ---
const props = defineProps({
  filas: { type: Number, required: true },
  columnas: { type: Number, required: true },
  precioPorButaca: { type: Number, default: 8 },
})

// --- Estado ---
const sala = ref<IButaca[][]>([])

// --- Inicialización ---
const inicializarSala = () => {
  const nuevaSala: IButaca[][] = []
  for (let f = 1; f <= props.filas; f++) {
    const fila: IButaca[] = []
    for (let c = 1; c <= props.columnas; c++) {
      // Simulación de estados iniciales aleatorios o fijos si se deseara,
      // pero por defecto TODO disponible según requisitos, salvo que se diga lo contrario.
      // El requisito dice "configurables", pero también "visualizar disposición".
      // Para el ejercicio, iniciamos todo en DISPONIBLE.
      // Se podría añadir lógica para marcar algunos como OCUPADO/DAÑADO aleatoriamente o por config,
      // pero los tests piden "estado inicial DISPONIBLE".
      fila.push({
        id: `F${f}-C${c}`,
        fila: f,
        columna: c,
        estado: EstadoButaca.DISPONIBLE,
      })
    }
    nuevaSala.push(fila)
  }
  sala.value = nuevaSala
}

// Reinicializar si cambian las dimensiones
watch([() => props.filas, () => props.columnas], inicializarSala, { immediate: true })

// --- Métodos ---
const seleccionarButaca = (butaca: IButaca) => {
  if (butaca.estado === EstadoButaca.DISPONIBLE) {
    butaca.estado = EstadoButaca.SELECCIONADO
  } else if (butaca.estado === EstadoButaca.SELECCIONADO) {
    butaca.estado = EstadoButaca.DISPONIBLE
  }
  // Si está OCUPADO o DAÑADO no hace nada
}

const confirmarReserva = () => {
  sala.value.forEach((fila) => {
    fila.forEach((butaca) => {
      if (butaca.estado === EstadoButaca.SELECCIONADO) {
        butaca.estado = EstadoButaca.OCUPADO
      }
    })
  })
}

// --- Computadas ---
const butacasSeleccionadas = computed(() => {
  const seleccionadas: string[] = []
  sala.value.forEach((fila) => {
    fila.forEach((butaca) => {
      if (butaca.estado === EstadoButaca.SELECCIONADO) {
        seleccionadas.push(butaca.id)
      }
    })
  })
  return seleccionadas
})

const totalAPagar = computed(() => {
  return butacasSeleccionadas.value.length * props.precioPorButaca
})

// Expose methods for testing if needed, though interaction is usually via template events
defineExpose({
  sala,
  seleccionarButaca,
  confirmarReserva,
  butacasSeleccionadas,
  totalAPagar,
})
</script>

<template>
  <div class="sala-cine">
    <div class="pantalla">PANTALLA</div>
    <div class="grid-butacas" :style="{ gridTemplateColumns: `repeat(${props.columnas}, 1fr)` }">
      <template v-for="(fila, index) in sala" :key="index">
        <button
          v-for="butaca in fila"
          :key="butaca.id"
          class="butaca"
          :class="butaca.estado"
          :disabled="
            butaca.estado === EstadoButaca.OCUPADO || butaca.estado === EstadoButaca.DAÑADO
          "
          @click="seleccionarButaca(butaca)"
          :aria-label="`Butaca ${butaca.id} ${butaca.estado}`"
        >
          <span class="butaca-id">{{ butaca.fila }}-{{ butaca.columna }}</span>
        </button>
      </template>
    </div>

    <div class="resumen">
      <h3>Resumen de Selección</h3>
      <p v-if="butacasSeleccionadas.length === 0">No hay butacas seleccionadas.</p>
      <p v-else>Butacas seleccionadas: {{ butacasSeleccionadas.join(', ') }}</p>
      <p>
        Total a pagar: <strong>{{ totalAPagar }}€</strong>
      </p>
      <button
        class="btn-confirmar"
        @click="confirmarReserva"
        :disabled="butacasSeleccionadas.length === 0"
      >
        Confirmar Reserva
      </button>
    </div>
  </div>
</template>

<style scoped>
.sala-cine {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.pantalla {
  width: 100%;
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.3);
  transform: perspective(500px) rotateX(-5deg);
}

.grid-butacas {
  display: grid;
  gap: 10px;
  justify-content: center;
}

.butaca {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px 8px 4px 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  transition: all 0.2s;
  position: relative;
}

.butaca::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 10%;
  width: 80%;
  height: 5px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

.butaca-id {
  visibility: hidden; /* Hide ID by default to keep it clean, show on hover? Or just show state color */
  /* Or maybe show concise ID */
  visibility: visible;
  color: rgba(255, 255, 255, 0.7);
}

/* Estados */
.butaca.disponible {
  background-color: #4caf50; /* Green */
  color: white;
}
.butaca.disponible:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.butaca.seleccionado {
  background-color: #2196f3; /* Blue */
  color: white;
  box-shadow: 0 0 10px rgba(33, 150, 243, 0.5);
  transform: translateY(-2px);
}

.butaca.ocupado {
  background-color: #f44336; /* Red */
  color: #ffcdd2;
  cursor: not-allowed;
  opacity: 0.8;
}

.butaca.dañado {
  background-color: #9e9e9e; /* Grey */
  color: #e0e0e0;
  cursor: not-allowed;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 5px,
    rgba(0, 0, 0, 0.1) 5px,
    rgba(0, 0, 0, 0.1) 10px
  );
}

.resumen {
  background-color: #f5f5f5;
  color: #333;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  text-align: center;
  border: 1px solid #ddd;
}

.btn-confirmar {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-confirmar:hover:not(:disabled) {
  background-color: #f57c00;
}

.btn-confirmar:disabled {
  background-color: #ffcc80;
  cursor: not-allowed;
}
</style>
