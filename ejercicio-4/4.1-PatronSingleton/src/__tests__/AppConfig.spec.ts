import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { AppConfig, type IAppSettings } from '../services/AppConfig'

// Mock localStorage
const localStorageMock = (function () {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString()
    }),
    clear: vi.fn(() => {
      store = {}
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    length: 0,
    key: vi.fn(),
  }
})()

vi.stubGlobal('localStorage', localStorageMock)

describe('AppConfig Singleton', () => {
  beforeEach(() => {
    localStorage.clear()
    // Reset the internal instance for isolation
    // Accessing private static property via casting
    ;(AppConfig as unknown as { instance: AppConfig | undefined }).instance = undefined
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('debe devolver siempre la misma instancia (Singleton)', () => {
    const instancia1 = AppConfig.getInstance()
    const instancia2 = AppConfig.getInstance()

    expect(instancia1).toBe(instancia2)
    expect(instancia1).toBeInstanceOf(AppConfig)
  })

  it('debe inicializarse con valores por defecto si no hay localStorage', () => {
    const config = AppConfig.getInstance()
    const settings = config.getSettings()

    expect(settings.value).toEqual({
      theme: 'light',
      language: 'es',
      fontSize: 'medium',
      fontFamily: 'Verdana',
    })
  })

  it('debe permitir modificar el tema y actualizar el estado', () => {
    const config = AppConfig.getInstance()
    config.setTheme('dark')

    expect(config.getSettings().value.theme).toBe('dark')
  })

  it('debe permitir modificar el idioma y actualizar el estado', () => {
    const config = AppConfig.getInstance()
    config.setLanguage('fr')

    expect(config.getSettings().value.language).toBe('fr')
  })

  it('debe de persistir los cambios en localStorage', () => {
    const config = AppConfig.getInstance()
    config.setLanguage('en')

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'app-config',
      expect.stringContaining('"language":"en"'),
    )
  })

  it('debe cargar la configuración desde localStorage al inicializarse', () => {
    const storedConfig: IAppSettings = {
      theme: 'dark',
      language: 'fr',
      fontSize: 'large',
      fontFamily: 'Georgia',
    }

    // We mock getItem to return our stored config
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(storedConfig))

    // Reset instance
    ;(AppConfig as unknown as { instance: AppConfig | undefined }).instance = undefined

    const config = AppConfig.getInstance()
    expect(config.getSettings().value).toEqual(storedConfig)
  })
})
