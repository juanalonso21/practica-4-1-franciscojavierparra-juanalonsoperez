<script setup lang="ts">
import { AppConfig } from '@/services/AppConfig'
import { computed } from 'vue'

const settings = AppConfig.getInstance().getSettings()

const styleVars = computed(() => ({
  backgroundColor: settings.value.theme === 'dark' ? '#222' : '#fff',
  color: settings.value.theme === 'dark' ? '#fff' : '#000',
  fontSize:
    settings.value.fontSize === 'small'
      ? '14px'
      : settings.value.fontSize === 'medium'
      ? '18px'
      : '22px',
  fontFamily: settings.value.fontFamily,
}))

const texts = computed(() => {
  const dict = {
    es: { title: 'Bienvenido a la Aplicación', body: 'Este es un texto de ejemplo.' },
    en: { title: 'Welcome to the Application', body: 'This is an example text.' },
    fr: { title: "Bienvenue à l'application", body: "Ceci est un texte d'exemple." },
  }
  return dict[settings.value.language]
})
</script>

<template>
  <article :style="styleVars">
    <h2>{{ texts.title }}</h2>
    <p>{{ texts.body }}</p>
  </article>
</template>

<style scoped>
article {
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  transition: all 0.3s ease;
}
</style>
