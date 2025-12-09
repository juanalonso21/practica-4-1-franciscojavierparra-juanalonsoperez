<script setup lang="ts">
import { ref, computed } from 'vue'
import type { HorariosData, HorarioAula, IAsignatura } from '@/types/schedule'
import HorarioModal from './HorarioModal.vue'

// --- Datos de Ejemplo Iniciales ---
const horarios = ref<HorariosData>({
  'Aula 101': [
    // Lunes
    [
      { nombre: 'DAWEC', profesor: 'A. Pérez', grupo: '2DAW' },
      null,
      { nombre: 'DIW', profesor: 'B. García', grupo: '2DAW' },
      null,
      null,
      null,
    ],
    // Martes
    [null, null, { nombre: 'EIE', profesor: 'C. López', grupo: '2DAW' }, null, null, null],
    // Miércoles
    [null, null, null, null, null, null],
    // Jueves
    [null, null, null, null, null, null],
    // Viernes
    [null, null, null, null, null, null],
  ],
  'Aula 205': [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ],
})

// Inicializar matrices vacías si faltan
const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
const horas = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00']

for (const aula in horarios.value) {
  while (horarios.value[aula]!.length < 5) {
    horarios.value[aula]!.push(new Array(6).fill(null))
  }
  horarios.value[aula]!.forEach((dia) => {
    while (dia.length < 6) {
      dia.push(null)
    }
  })
}

// --- Estado Reactivo ---
const aulas = computed(() => Object.keys(horarios.value))
const aulaSeleccionada = ref<string>(aulas.value[0]!)
const modalVisible = ref(false)
const datosModal = ref<{ dia: number; hora: number; asignatura: IAsignatura | null } | null>(null)

// El horario que se muestra en la vista
const horarioVisible = computed<HorarioAula>(() => horarios.value[aulaSeleccionada.value]!)

// --- Lógica de Negocio (CRUD) ---
function abrirModal(dia: number, hora: number) {
  datosModal.value = { dia, hora, asignatura: horarioVisible.value[dia]![hora]! }
  modalVisible.value = true
}

function guardarReserva(payload: { dia: number; hora: number; asignatura: IAsignatura }) {
  horarios.value[aulaSeleccionada.value]![payload.dia]![payload.hora] = payload.asignatura
  modalVisible.value = false
}

function eliminarReserva(payload: { dia: number; hora: number }) {
  horarios.value[aulaSeleccionada.value]![payload.dia]![payload.hora] = null
  modalVisible.value = false
}
</script>

<template>
  <div class="gestor-container">
    <header>
      <h1>Gestor de Aulas</h1>
      <div class="selector-aula">
        <label>Aula:</label>
        <select v-model="aulaSeleccionada">
          <option v-for="aula in aulas" :key="aula" :value="aula">{{ aula }}</option>
        </select>
      </div>
    </header>

    <div class="horario-grid">
      <!-- Cabecera de Horas -->
      <div class="header-cell empty"></div>
      <div v-for="hora in horas" :key="hora" class="header-cell hora">{{ hora }}</div>

      <!-- Filas por Día -->
      <template v-for="(dia, indexDia) in horarioVisible" :key="indexDia">
        <div class="day-cell">{{ diasSemana[indexDia] }}</div>
        <div
          v-for="(bloque, indexHora) in dia"
          :key="indexHora"
          class="bloque-cell"
          :class="{ ocupado: bloque, libre: !bloque }"
          @click="abrirModal(indexDia, indexHora)"
        >
          <div v-if="bloque" class="info-reserva">
            <strong>{{ bloque.nombre }}</strong>
            <span class="profesor">{{ bloque.profesor }}</span>
            <span class="grupo">{{ bloque.grupo }}</span>
          </div>
          <div v-else class="texto-libre">Libre</div>
        </div>
      </template>
    </div>

    <!-- Modal -->
    <HorarioModal
      v-if="modalVisible"
      :datos="datosModal"
      @close="modalVisible = false"
      @save="guardarReserva"
      @delete="eliminarReserva"
    />
  </div>
</template>

<style scoped>
.gestor-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

h1 {
  margin: 0;
  color: #2c3e50;
}

.selector-aula select {
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-left: 10px;
}

/* Grid Layout */
.horario-grid {
  display: grid;
  grid-template-columns: 100px repeat(6, 1fr); /* 1 col para día, 6 para horas */
  gap: 10px;
  overflow-x: auto;
}

.header-cell {
  background-color: #34495e;
  color: white;
  padding: 15px;
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
}

.day-cell {
  background-color: #2c3e50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-radius: 5px;
  padding: 10px;
}

.bloque-cell {
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  min-height: 100px;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.bloque-cell:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.bloque-cell.ocupado {
  background-color: #e8f6f3;
  border-left: 5px solid #1abc9c;
}

.bloque-cell.libre {
  background-color: #fff;
  color: #bdc3c7;
  border: 2px dashed #ecf0f1;
}

.bloque-cell.libre:hover {
  border-color: #3498db;
  color: #3498db;
}

.info-reserva {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info-reserva strong {
  color: #2c3e50;
  font-size: 1.1em;
}

.profesor {
  font-size: 0.9em;
  color: #7f8c8d;
}

.grupo {
  font-size: 0.8em;
  background: #1abc9c;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  align-self: center;
}
</style>
