# Componente SalaCine

Este componente permite a los usuarios visualizar una sala de cine, seleccionar butacas y confirmar reservas.

## Uso

```vue
<script setup lang="ts">
import SalaCine from '@/components/SalaCine.vue'
</script>

<template>
  <SalaCine :filas="5" :columnas="8" :precio-por-butaca="9.5" />
</template>
```

## Props

| Prop              | Tipo     | Requerido | Default | Descripción                                 |
| ----------------- | -------- | --------- | ------- | ------------------------------------------- |
| `filas`           | `Number` | Sí        | -       | Número de filas de butacas en la sala.      |
| `columnas`        | `Number` | Sí        | -       | Número de butacas por cada fila.            |
| `precioPorButaca` | `Number` | No        | `8`     | Precio individual por cada butaca en euros. |

## Tipos de Datos

### EstadoButaca (Enum)

```typescript
export enum EstadoButaca {
  DISPONIBLE = 'disponible',
  SELECCIONADO = 'seleccionado',
  OCUPADO = 'ocupado',
  DAÑADO = 'dañado',
}
```

### IButaca (Interface)

```typescript
export interface IButaca {
  id: string // Identificador único (ej. "F1-C1")
  fila: number
  columna: number
  estado: EstadoButaca
}
```

## Ejemplo Interactivo

<SalaCine :filas="6" :columnas="6" :precio-por-butaca="10" />

<script setup>
import SalaCine from '@/components/SalaCine.vue'
</script>
