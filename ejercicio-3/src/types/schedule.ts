export interface IAsignatura {
    nombre: string
    profesor: string
    grupo: string
}

export type BloqueHorario = IAsignatura | null
export type HorarioAula = BloqueHorario[][]
export type HorariosData = Record<string, HorarioAula>
