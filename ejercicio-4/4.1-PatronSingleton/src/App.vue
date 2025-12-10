<script setup lang="ts">
import PanelDeControl from './components/PanelDeControl.vue'
import Contenido from './components/ContenidoPrincipal.vue'
</script>

<template>
  <div class="app">
    <PanelDeControl />
    <Contenido />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  gap: 20px;
  padding: 20px;
  align-items: start;
}
.panel {
  flex: 0 0 250px;
}

article {
  flex: 1;
}
</style>
