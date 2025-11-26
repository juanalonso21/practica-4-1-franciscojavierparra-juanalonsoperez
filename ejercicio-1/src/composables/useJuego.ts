import { ref, computed, readonly } from 'vue'
import { Pila } from '@/core/Pila'
import { Carta } from '@/core/Carta'
import { type Palo,type Valor } from '@/types/cards'

export function useJuego() {
  const mazo = ref<Pila<Carta>>(new Pila())
  const descarte = ref<Pila<Carta>>(new Pila())
  const manoJugador = ref<Carta[]>([])
  const mensajeEstado = ref<string>('Bienvenido. ¡Empieza el juego!')
  const juegoTerminado = ref<boolean>(false)

  // Helpers para crear baraja
  const palos: Palo[] = ['Picas', 'Corazones', 'Tréboles', 'Diamantes']
  const valores: Valor[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

  const barajarArray = (array: Carta[]): Carta[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const tmp = array[i]!
      array[i] = array[j]!
      array[j] = tmp
    }
    return array
  }

  function iniciarJuego() {
    // Reiniciar estados
    mazo.value = new Pila()
    descarte.value = new Pila()
    manoJugador.value = []
    juegoTerminado.value = false
    mensajeEstado.value = 'Juego iniciado.'

    // 1. Crear las 52 cartas
    let cartasTemp: Carta[] = []
    for (const palo of palos) {
      for (const valor of valores) {
        cartasTemp.push(new Carta(palo, valor))
      }
    }

    // 2. Barajar
    cartasTemp = barajarArray(cartasTemp)

    // 3. Llenar la Pila mazo
    cartasTemp.forEach((c) => mazo.value.push(c))

    // 4. Repartir 7 cartas
    for (let i = 0; i < 7; i++) {
      const carta = mazo.value.pop()
      if (carta) manoJugador.value.push(carta)
    }

    // 5. Mover una carta al descarte
    const cartaInicial = mazo.value.pop()
    if (cartaInicial) descarte.value.push(cartaInicial)
  }

  function reconstituirMazo() {
    if (descarte.value.size() <= 1) {
      mensajeEstado.value = 'No hay suficientes cartas en descarte para reciclar.'
      return
    }

    // Guardar la carta superior (la que se ve)
    const cartaSuperior = descarte.value.pop()
    if (!cartaSuperior) return

    // Obtener el resto de cartas del descarte
    const cartasParaReciclar = descarte.value.getElementos()

    // Limpiar descarte y volver a poner la superior
    descarte.value.clear()
    descarte.value.push(cartaSuperior)

    // Barajar las recicladas
    const cartasBarajadas = barajarArray(cartasParaReciclar)

    // Mover al mazo
    cartasBarajadas.forEach((c) => mazo.value.push(c))

    mensajeEstado.value = '¡Mazo vacío! Se ha barajado el descarte.'
  }

  function robarCarta() {
    if (juegoTerminado.value) return

    if (mazo.value.isEmpty()) {
      reconstituirMazo()
    }

    const carta = mazo.value.pop()
    if (carta) {
      manoJugador.value.push(carta)
      mensajeEstado.value = `Has robado: ${carta.nombre}`
    } else {
      mensajeEstado.value = 'No quedan cartas ni en el mazo ni para reciclar.'
    }
  }

  function jugarCarta(cartaAJugar: Carta) {
    if (juegoTerminado.value) return

    const cartaSuperior = descarte.value.peek()

    if (cartaSuperior && cartaAJugar.esJugableSobre(cartaSuperior)) {
      // Quitar de la mano
      manoJugador.value = manoJugador.value.filter((c) => c !== cartaAJugar)
      // Añadir al descarte
      descarte.value.push(cartaAJugar)
      mensajeEstado.value = `Jugaste: ${cartaAJugar.nombre}`

      // Verificar victoria
      if (manoJugador.value.length === 0) {
        juegoTerminado.value = true
        mensajeEstado.value = '¡Felicidades! ¡Has ganado el juego!'
      }
    } else {
      mensajeEstado.value = `No puedes jugar ${cartaAJugar.nombre} sobre ${cartaSuperior?.nombre}`
    }
  }

  return {
    iniciarJuego,
    robarCarta,
    jugarCarta,
    manoJugador: readonly(manoJugador),
    cartaSuperiorDescarte: computed(() => descarte.value.peek()),
    cantidadMazo: computed(() => mazo.value.size()),
    mensajeEstado: readonly(mensajeEstado),
    juegoTerminado: readonly(juegoTerminado),
  }
}
