import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { AppConfig } from '../services/AppConfig'

describe('AppConfig Singleton', () => {
  // Clear localStorage before each test to ensure a clean state
  beforeEach(() => {
    localStorage.clear()
    // We might need to reset the instance if possible, but it's a Singleton.
    // Ideally, we test behavior that persists or check state changes.
    // Since we can't easily "destroy" the singleton instance in JS without a hack,
    // we will rely on state setters to reset if needed, or just test transitions.
    // However, for the "Uniqueness" test, we just call getInstance multiple times.
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('Test de Unicidad (Singleton): debe devolver la misma instancia', () => {
    const instancia1 = AppConfig.getInstance()
    const instancia2 = AppConfig.getInstance()

    expect(instancia1).toBe(instancia2)
  })

  it('Test de Modificación de Estado', () => {
    const config = AppConfig.getInstance()

    // Reset to default first (optional but safer)
    config.setTheme('light')

    config.setTheme('dark')
    // Access value directly as it's a Ref
    expect(config.getSettings().value.theme).toBe('dark')
  })

  it('Test de Persistencia: debe guardar en localStorage', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
    const config = AppConfig.getInstance()

    config.setLanguage('fr')

    expect(setItemSpy).toHaveBeenCalledWith(
      'app-config',
      expect.stringContaining('"language":"fr"'),
    )
  })
})
