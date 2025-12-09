import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import GestorHorarios from '../GestorHorarios.vue'

describe('GestorHorarios', () => {
    let wrapper: any

    beforeEach(() => {
        wrapper = mount(GestorHorarios)
    })

    it('Test 1: Estado Inicial', () => {
        // Verificar que el horarioVisible inicial corresponde al de la primera aula (Aula 101)
        // Aula 101 tiene una reserva el Lunes a las 08:00 (index 0, 0)
        const horarioVisible = wrapper.vm.horarioVisible
        expect(horarioVisible[0][0]).not.toBeNull()
        expect(horarioVisible[0][0].nombre).toBe('DAWEC')
    })

    it('Test 2: Cambio de Aula', async () => {
        // Cambiar a Aula 205
        const select = wrapper.find('select')
        await select.setValue('Aula 205')

        // Aula 205 está vacía inicialmente
        const horarioVisible = wrapper.vm.horarioVisible
        expect(horarioVisible[0][0]).toBeNull()
    })

    it('Test 3: Añadir Reserva', async () => {
        // Simular guardarReserva
        const nuevaReserva = {
            dia: 2, // Miércoles
            hora: 0, // 08:00
            asignatura: { nombre: 'Nueva Asignatura', profesor: 'Profesor X', grupo: '1DAW' }
        }

        wrapper.vm.guardarReserva(nuevaReserva)

        const horarioVisible = wrapper.vm.horarioVisible
        expect(horarioVisible[2][0]).toEqual(nuevaReserva.asignatura)
    })

    it('Test 4: Modificar Reserva', async () => {
        // Modificar la reserva existente del Lunes 08:00
        const reservaModificada = {
            dia: 0,
            hora: 0,
            asignatura: { nombre: 'DAWEC Modificado', profesor: 'A. Pérez', grupo: '2DAW' }
        }

        wrapper.vm.guardarReserva(reservaModificada)

        const horarioVisible = wrapper.vm.horarioVisible
        expect(horarioVisible[0][0].nombre).toBe('DAWEC Modificado')
    })

    it('Test 5: Eliminar Reserva', async () => {
        // Eliminar la reserva del Lunes 08:00
        const payload = { dia: 0, hora: 0 }

        wrapper.vm.eliminarReserva(payload)

        const horarioVisible = wrapper.vm.horarioVisible
        expect(horarioVisible[0][0]).toBeNull()
    })
})
