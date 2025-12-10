import { describe, it, expect, beforeEach } from 'vitest'
import { Pila } from '@/core/Pila'

describe('Clase Pila', () => {
  let pila: Pila<number>

  beforeEach(() => {
    pila = new Pila<number>()
  })

  it('debe iniciar vacía', () => {
    expect(pila.isEmpty()).toBe(true)
    expect(pila.size()).toBe(0)
  })

  it('debe añadir elementos (push) y respetar LIFO', () => {
    pila.push(1)
    pila.push(2)
    expect(pila.size()).toBe(2)
    expect(pila.peek()).toBe(2)
  })

  it('debe eliminar elementos (pop) y respetar LIFO', () => {
    pila.push(10)
    pila.push(20)
    const sacado = pila.pop()
    expect(sacado).toBe(20)
    expect(pila.size()).toBe(1)
    expect(pila.peek()).toBe(10)
  })

  it('peek no debe eliminar el elemento', () => {
    pila.push(5)
    expect(pila.peek()).toBe(5)
    expect(pila.size()).toBe(1)
  })

  it('pop en pila vacía devuelve undefined', () => {
    expect(pila.pop()).toBeUndefined()
  })
})
