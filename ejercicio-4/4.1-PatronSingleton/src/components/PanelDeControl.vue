<script setup lang="ts">
import { AppConfig, type IAppSettings } from '@/services/AppConfig'

// Obtenemos la instancia única del gestor de configuración
const configService = AppConfig.getInstance()

// Obtenemos una referencia reactiva a la configuración actual
const settings = configService.getSettings()

// Las funciones simplemente llaman a los métodos del Singleton
const changeTheme = (event: Event) => {
  const newTheme = (event.target as HTMLSelectElement).value as IAppSettings['theme']
  configService.setTheme(newTheme)
}

const changeLanguage = (event: Event) => {
  const newLang = (event.target as HTMLSelectElement).value as IAppSettings['language']
  configService.setLanguage(newLang)
}

// Functions for font size and family (implied by "Controles para el resto de propiedades...")
const changeFontSize = (event: Event) => {
  const newSize = (event.target as HTMLSelectElement).value as IAppSettings['fontSize']
  configService.setFontSize(newSize)
}

const changeFontFamily = (event: Event) => {
  const newFamily = (event.target as HTMLSelectElement).value as IAppSettings['fontFamily']
  configService.setFontFamily(newFamily)
}
</script>

<template>
  <div class="panel">
    <h3>Panel de Configuración</h3>
    <label>Tema:</label>
    <select :value="settings.theme" @change="changeTheme">
      <option value="light">Claro</option>
      <option value="dark">Oscuro</option>
    </select>

    <label>Idioma:</label>
    <select :value="settings.language" @change="changeLanguage">
      <option value="es">Español</option>
      <option value="en">Inglés</option>
      <option value="fr">Francés</option>
    </select>

    <label>Tamaño de fuente:</label>
    <select :value="settings.fontSize" @change="changeFontSize">
      <option value="small">Pequeña</option>
      <option value="medium">Mediana</option>
      <option value="large">Grande</option>
    </select>

    <label>Fuente:</label>
    <select :value="settings.fontFamily" @change="changeFontFamily">
      <option value="Arial">Arial</option>
      <option value="Verdana">Verdana</option>
      <option value="Georgia">Georgia</option>
    </select>
  </div>
</template>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  background: #f4f4f4;
  border-radius: 8px;
  max-width: 250px;
  color: #333; /* Ensure text is visible on light bg */
}
</style>
