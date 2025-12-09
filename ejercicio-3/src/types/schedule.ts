/**
 * Representa la información de una asignatura reservada.
 */
export interface IAsignatura {
    /** Nombre de la asignatura (ej. "DWEC") */
    nombre: string
    /** Nombre del profesor encargado (ej. "A. Pérez") */
    profesor: string
    /** Grupo o curso asignado (ej. "2DAW") */
    grupo: string
}

/**
 * Representa un bloque horario individual.
 * Puede contener una asignatura (ocupado) o ser null (libre).
 */
export type BloqueHorario = IAsignatura | null

/**
 * Matriz que representa el horario semanal de un aula.
 * Array de arrays donde:
 * - El primer índice representa el día de la semana (0-4).
 * - El segundo índice representa la hora del día (0-5).
 */
export type HorarioAula = BloqueHorario[][]

/**
 * Estructura de datos principal que mapea nombres de aulas a sus horarios completos.
 */
export type HorariosData = Record<string, HorarioAula>
