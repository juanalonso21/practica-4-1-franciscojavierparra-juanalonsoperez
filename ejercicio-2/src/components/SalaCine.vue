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
}

.grid-butacas {
  display: grid;
  gap: 10px;
  justify-content: center;
}

.butaca {
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  background-color: #fff;
  transition: background-color 0.2s;
  color: #333;
}

.butaca-id {
  visibility: visible;
}

/* Estados */
.butaca.disponible {
  background-color: #2ecc71; /* Vivid Emerald */
  border-color: #27ae60;
  color: white;
}
.butaca.disponible:hover {
  background-color: #27ae60;
}

.butaca.seleccionado {
  background-color: #3498db; /* Vivid Blue */
  border-color: #2980b9;
  color: white;
}

.butaca.ocupado {
  background-color: #e74c3c; /* Vivid Red */
  border-color: #c0392b;
  color: white;
  cursor: not-allowed;
}

.butaca.dañado {
  background-color: #95a5a6; /* Vivid Grey */
  border-color: #7f8c8d;
  color: white;
  cursor: not-allowed;
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
  background-color: #e67e22; /* Vivid Orange */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-confirmar:hover:not(:disabled) {
  background-color: #d35400;
}

.btn-confirmar:disabled {
  background-color: #f39c12;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
