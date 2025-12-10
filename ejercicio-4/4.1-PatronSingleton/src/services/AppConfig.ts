import { ref, readonly, type DeepReadonly, type Ref } from 'vue'

// 1. Definimos la interfaz para la configuración
export interface IAppSettings {
  theme: 'light' | 'dark'
  language: 'es' | 'en' | 'fr'
  fontSize: 'small' | 'medium' | 'large'
  fontFamily: 'Arial' | 'Verdana' | 'Georgia'
}

// 2. Implementación de la clase Singleton
export class AppConfig {
  // La única instancia se almacena aquí
  private static instance: AppConfig

  // El estado de la configuración, encapsulado y reactivo
  private readonly _settings: Ref<IAppSettings>

  // El constructor es privado para evitar `new`
  private constructor() {
    // Carga desde localStorage o usa valores por defecto
    const savedSettings = localStorage.getItem('app-config')
    const defaultSettings: IAppSettings = {
      theme: 'light',
      language: 'es',
      fontSize: 'medium',
      fontFamily: 'Verdana',
    }

    this._settings = ref(savedSettings ? JSON.parse(savedSettings) : defaultSettings)
  }

  // El método estático que controla el acceso a la instancia
  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig()
    }
    return AppConfig.instance
  }

  // --- Métodos Públicos (API del Singleton) ---

  // Devuelve una versión de solo lectura y reactiva de la configuración
  public getSettings(): DeepReadonly<Ref<IAppSettings>> {
    return readonly(this._settings)
  }

  public setTheme(theme: IAppSettings['theme']): void {
    this._settings.value.theme = theme
    this.saveToLocalStorage()
  }

  public setLanguage(lang: IAppSettings['language']): void {
    this._settings.value.language = lang
    this.saveToLocalStorage()
  }

  public setFontSize(size: IAppSettings['fontSize']): void {
    this._settings.value.fontSize = size
    this.saveToLocalStorage()
  }

  public setFontFamily(font: IAppSettings['fontFamily']): void {
    this._settings.value.fontFamily = font
    this.saveToLocalStorage()
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('app-config', JSON.stringify(this._settings.value))
  }
}
