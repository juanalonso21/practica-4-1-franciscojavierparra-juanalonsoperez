import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import SalaCine from '../SalaCine.vue'
import { EstadoButaca } from '../../types/cinema'

describe('SalaCine.vue', () => {
  let wrapper: VueWrapper<InstanceType<typeof SalaCine>>

  // Helper to mount component with default props
  const mountComponent = (props = {}) => {
    return mount(SalaCine, {
      props: {
        filas: 5,
        columnas: 5,
        ...props,
      },
    })
  }

  it('Test 1: Initialization', () => {
    wrapper = mountComponent({ filas: 3, columnas: 4 })
    const vm = wrapper.vm

    // Check dimensions
    expect(vm.sala.length).toBe(3)
    expect(vm.sala[0]!.length).toBe(4)

    // Check initial state
    // F1-C3 should be DAÑADO (from hardcoded list)
    const damagedIds = ['F1-C3'] // In this 3x4 grid, only F1-C3 matches the hardcoded list ['F1-C3', 'F2-C5', 'F5-C8']

    vm.sala.forEach((fila) => {
      fila.forEach((butaca) => {
        const expectedState = damagedIds.includes(butaca.id)
          ? EstadoButaca.DAÑADO
          : EstadoButaca.DISPONIBLE
        expect(butaca.estado).toBe(expectedState)
      })
    })
  })

  it('Test 2: Selection of available seat', async () => {
    wrapper = mountComponent()
    const vm = wrapper.vm
    const butaca = vm.sala[0]![0]! // F1-C1

    await vm.seleccionarButaca(butaca)
    expect(butaca.estado).toBe(EstadoButaca.SELECCIONADO)
  })

  it('Test 3: Deselection of seat', async () => {
    wrapper = mountComponent()
    const vm = wrapper.vm
    const butaca = vm.sala[0]![0]!

    // Select first
    await vm.seleccionarButaca(butaca)
    expect(butaca.estado).toBe(EstadoButaca.SELECCIONADO)

    // Deselect
    await vm.seleccionarButaca(butaca)
    expect(butaca.estado).toBe(EstadoButaca.DISPONIBLE)
  })

  it('Test 4: Prevent selection of occupied/damaged seat', async () => {
    wrapper = mountComponent()
    const vm = wrapper.vm
    const butaca = vm.sala[0]![0]!

    // Simulate Occupied
    butaca.estado = EstadoButaca.OCUPADO
    await vm.seleccionarButaca(butaca)
    expect(butaca.estado).toBe(EstadoButaca.OCUPADO) // Should not change

    // Simulate Damaged
    butaca.estado = EstadoButaca.DAÑADO
    await vm.seleccionarButaca(butaca)
    expect(butaca.estado).toBe(EstadoButaca.DAÑADO) // Should not change
  })

  it('Test 5: Confirmation of reservation', async () => {
    wrapper = mountComponent()
    const vm = wrapper.vm

    // Select two seats
    const b1 = vm.sala[0]![0]!
    const b2 = vm.sala[0]![1]!
    await vm.seleccionarButaca(b1)
    await vm.seleccionarButaca(b2)

    expect(b1.estado).toBe(EstadoButaca.SELECCIONADO)
    expect(b2.estado).toBe(EstadoButaca.SELECCIONADO)

    // Confirm
    await vm.confirmarReserva()

    expect(b1.estado).toBe(EstadoButaca.OCUPADO)
    expect(b2.estado).toBe(EstadoButaca.OCUPADO)

    // Check others are still Available
    const b3 = vm.sala[0]![3]! // F1-C4 (avoid F1-C3 which is damaged)
    expect(b3.estado).toBe(EstadoButaca.DISPONIBLE)
  })

  it('Test 6: Total calculation', async () => {
    const precio = 10
    wrapper = mountComponent({ precioPorButaca: precio })
    const vm = wrapper.vm

    expect(vm.totalAPagar).toBe(0)

    // Select 1
    await vm.seleccionarButaca(vm.sala[0]![0]!)
    expect(vm.totalAPagar).toBe(precio)

    // Select 2
    await vm.seleccionarButaca(vm.sala[1]![1]!)
    expect(vm.totalAPagar).toBe(precio * 2)

    // Deselect 1
    await vm.seleccionarButaca(vm.sala[0]![0]!)
    expect(vm.totalAPagar).toBe(precio * 1)
  })
})
