// src/utils/cinema.ts
import type { IButaca } from '@/types/cinema';
import { EstadoButaca } from '@/types/cinema';

export function inicializarSala(filas: number, columnas: number): IButaca[][] {
  const sala: IButaca[][] = [];

  for (let f = 0; f < filas; f++) {
    const fila: IButaca[] = [];
    for (let c = 0; c < columnas; c++) {
      fila.push({
        id: `Fila${f + 1}-Columna${c + 1}`,
        fila: f,
        columna: c,
        estado: EstadoButaca.DISPONIBLE,
      });
    }
    sala.push(fila);
  }

  return sala;
}
