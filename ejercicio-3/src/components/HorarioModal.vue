<script setup lang="ts">
import { ref, watch } from 'vue'
import type { IAsignatura } from '@/types/schedule'

const props = defineProps<{
  datos: { dia: number; hora: number; asignatura: IAsignatura | null } | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', payload: { dia: number; hora: number; asignatura: IAsignatura }): void
  (e: 'delete', payload: { dia: number; hora: number }): void
}>()

const form = ref<IAsignatura>({
  nombre: '',
  profesor: '',
  grupo: '',
})

watch(
  () => props.datos,
  (newVal) => {
    if (newVal && newVal.asignatura) {
      form.value = { ...newVal.asignatura }
    } else {
      form.value = { nombre: '', profesor: '', grupo: '' }
    }
  },
  { immediate: true }
)

function guardar() {
  if (props.datos) {
    emit('save', {
      dia: props.datos.dia,
      hora: props.datos.hora,
      asignatura: { ...form.value },
    })
  }
}

function eliminar() {
  if (props.datos) {
    if (confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
      emit('delete', { dia: props.datos.dia, hora: props.datos.hora })
    }
  }
}
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>{{ datos?.asignatura ? 'Editar Reserva' : 'Nueva Reserva' }}</h2>
      <div v-if="datos" class="modal-info">
        <p>
          {{ ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'][datos.dia] }},
          {{ 8 + datos.hora }}:00 - {{ 9 + datos.hora }}:00
        </p>
      </div>
      <form @submit.prevent="guardar">
        <div class="form-group">
          <label>Asignatura</label>
          <input v-model="form.nombre" required placeholder="Ej. Matemáticas" />
        </div>
        <div class="form-group">
          <label>Profesor</label>
          <input v-model="form.profesor" required placeholder="Ej. Dr. Pérez" />
        </div>
        <div class="form-group">
          <label>Grupo/Curso</label>
          <input v-model="form.grupo" required placeholder="Ej. 2DAW" />
        </div>
        <div class="actions">
          <button type="button" v-if="datos?.asignatura" @click="eliminar" class="btn-delete">
            Eliminar Reserva
          </button>
          <button type="button" @click="$emit('close')" class="btn-cancel">Cancelar</button>
          <button type="submit" class="btn-save">Guardar Reserva</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 25px;
  border-radius: 12px;
  width: 450px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  font-family: 'Segoe UI', sans-serif;
}
h2 {
  margin-top: 0;
  color: #2c3e50;
}
.modal-info {
  margin-bottom: 15px;
  color: #7f8c8d;
  font-size: 0.9em;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #34495e;
}
.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  font-size: 1rem;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 25px;
}
button {
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  transition: background 0.2s;
}
.btn-save {
  background: #3498db;
  color: white;
}
.btn-save:hover {
  background: #2980b9;
}
.btn-cancel {
  background: #ecf0f1;
  color: #2c3e50;
}
.btn-cancel:hover {
  background: #bdc3c7;
}
.btn-delete {
  background: #e74c3c;
  color: white;
  margin-right: auto;
}
.btn-delete:hover {
  background: #c0392b;
}
</style>
