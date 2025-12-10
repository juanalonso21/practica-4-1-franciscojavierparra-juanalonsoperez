<script setup lang="ts">
import { ref } from 'vue'
import { notificationFactory, type NotificationType } from '@/notifications/notificationFactory'

const selectedType = ref<NotificationType>('email')
const message = ref('')
const logs = ref<string[]>([])

function sendNotification() {
  if (!message.value.trim()) {
    alert('El mensaje no puede estar vacío.')
    return
  }

  try {
    const notifier = notificationFactory(selectedType.value)
    notifier.send(message.value)
    logs.value.push(`[${selectedType.value.toUpperCase()}] Enviado: "${message.value}"`)
    message.value = ''
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  }
}
</script>

<template>
  <div class="composer">
    <h2>Sistema de Notificaciones</h2>
    <label for="type-selector">Tipo de Notificación:</label>
    <select id="type-selector" v-model="selectedType">
      <option value="email">Email</option>
      <option value="sms">SMS</option>
      <option value="push">Push (Token)</option>
    </select>

    <label for="message-input">Mensaje:</label>
    <textarea id="message-input" v-model="message" rows="4"></textarea>

    <button @click="sendNotification">Enviar Notificación</button>
  </div>

  <div class="logs">
    <h3>Log de Envíos</h3>
    <ul>
      <li v-for="(log, index) in logs" :key="index">{{ log }}</li>
    </ul>
  </div>
</template>

<style scoped>
.composer {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.composer h2 {
  margin-top: 0;
}

.composer label {
  display: block;
  margin-top: 1rem;
  font-weight: bold;
}

.composer select,
.composer textarea {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.composer button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.composer button:hover {
  background-color: #359268;
}

.logs {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.logs h3 {
  margin-top: 0;
}

.logs ul {
  list-style: none;
  padding: 0;
}

.logs li {
  padding: 0.5rem;
  margin: 0.5rem 0;
  background-color: white;
  border-left: 4px solid #42b983;
  border-radius: 4px;
}
</style>
