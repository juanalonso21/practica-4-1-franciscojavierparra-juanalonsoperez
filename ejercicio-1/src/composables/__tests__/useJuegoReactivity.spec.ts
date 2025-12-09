import { describe, it, expect } from 'vitest'
import { useJuego } from '../useJuego'

describe('useJuego Reactivity', () => {
    it('updates cantidadMazo when cards are drawn', () => {
        const { iniciarJuego, robarCarta, cantidadMazo } = useJuego()

        iniciarJuego()
        const initialCount = cantidadMazo.value
        expect(initialCount).toBeGreaterThan(0)

        robarCarta()
        expect(cantidadMazo.value).toBe(initialCount - 1)
    })
})
