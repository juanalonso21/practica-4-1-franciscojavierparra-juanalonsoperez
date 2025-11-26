import { type Palo, type Valor } from '@/types/cards'

export class Carta {
  constructor(
    public palo: Palo,
    public valor: Valor,
  ) {}

  get nombre(): string {
    return `${this.valor} de ${this.palo}`
  }

  get color(): string {
    return this.palo === 'Corazones' || this.palo === 'Diamantes' ? 'red' : 'black'
  }

  get simbolo(): string {
    switch (this.palo) {
      case 'Corazones':
        return '♥'
      case 'Diamantes':
        return '♦'
      case 'Picas':
        return '♠'
      case 'Tréboles':
        return '♣'
    }
  }

  // Lógica de juego encapsulada en la propia carta
  esJugableSobre(otraCarta: Carta): boolean {
    return this.palo === otraCarta.palo || this.valor === otraCarta.valor
  }
}
