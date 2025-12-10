<script setup lang="ts">
import SalaCine from '@/components/SalaCine.vue'
</script>

<template>
  <SalaCine :filas="8" :columnas="14" :precioPorButaca="3" />
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background-color: #2c2c2c;
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
