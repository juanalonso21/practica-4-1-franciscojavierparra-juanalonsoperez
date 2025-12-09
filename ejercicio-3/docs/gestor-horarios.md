# Gestor de Horarios

## Propósito
El componente `GestorHorarios.vue` es una aplicación de una sola página (SPA) diseñada para gestionar los horarios de múltiples aulas. Permite a un administrador:

- **Visualizar Horarios**: Ver el horario semanal de un aula seleccionada en una vista de cuadrícula (Días x Horas).
- **Gestión de Reservas**: Realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las reservas de asignaturas en los bloques horarios.
- **Interactividad**: Al hacer clic en las celdas, se pueden crear nuevas reservas (si está libre) o editar/borrar reservas existentes (si está ocupada).

## Estructura de Datos
El sistema se basa en las siguientes interfaces TypeScript definidas en `src/types/schedule.ts`.

### IAsignatura
Define la información básica de una reserva para una asignatura.

```typescript
export interface IAsignatura {
    nombre: string;   // Nombre de la asignatura (ej. "DWEC")
    profesor: string; // Nombre del profesor (ej. "A. Pérez")
    grupo: string;    // Grupo o curso (ej. "2DAW")
}
```

### BloqueHorario
Representa una celda individual en el horario. Puede contener una `IAsignatura` si está reservado, o ser `null` si está libre.

```typescript
export type BloqueHorario = IAsignatura | null;
```

### HorarioAula
Es una matriz que representa el horario completo de un aula.
- **Filas**: Días de la semana (0 = Lunes, 4 = Viernes).
- **Columnas**: Bloques horarios (0 = 08:00, 5 = 13:00).

```typescript
export type HorarioAula = BloqueHorario[][];
```

### HorariosData
Es la estructura principal que almacena los horarios de todas las aulas. Es un objeto donde:
- **Clave**: Nombre del aula (string).
- **Valor**: La matriz `HorarioAula` correspondiente.

```typescript
export type HorariosData = Record<string, HorarioAula>;
```

## Ejemplo de Datos Iniciales

Así es como se estructuran los datos dentro del componente:

```typescript
const horarios = ref<HorariosData>({
  'Aula 101': [
    // Lunes: 1ª hora ocupada, resto libres
    [
      { nombre: 'DAWEC', profesor: 'A. Pérez', grupo: '2DAW' },
      null,
      null,
      null,
      null,
      null,
    ],
    // ... resto de días
  ],
  'Aula 205': [
      // ... horario vacío o con reservas
  ]
});
```
