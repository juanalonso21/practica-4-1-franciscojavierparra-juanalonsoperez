# Patrón Singleton: AppConfig

## Propósito

Se ha elegido el patrón **Singleton** para la clase `AppConfig` para garantizar que exista una **única instancia** que gestione la configuración global de la aplicación (tema, idioma, fuentes). Esto asegura que todos los componentes accedan y modifiquen la misma "fuente de la verdad", manteniendo la consistencia en toda la interfaz de usuario.

## Interfaz IAppSettings

Define la estructura del objeto de configuración.

```typescript
export interface IAppSettings {
  theme: 'light' | 'dark'
  language: 'es' | 'en' | 'fr'
  fontSize: 'small' | 'medium' | 'large'
  fontFamily: 'Arial' | 'Verdana' | 'Georgia'
}
```

## API Pública

### `static getInstance(): AppConfig`

Devuelve la instancia única de la clase `AppConfig`. Si no existe, la crea.

### `getSettings(): DeepReadonly<Ref<IAppSettings>>`

Devuelve el estado actual de la configuración como un objeto reactivo de solo lectura.

- **Retorno**: `DeepReadonly<Ref<IAppSettings>>`

### `setTheme(theme: 'light' | 'dark'): void`

Cambia el tema de la aplicación y persiste el cambio.

### `setLanguage(lang: 'es' | 'en' | 'fr'): void`

Cambia el idioma de la aplicación y persiste el cambio.

### `setFontSize(size: 'small' | 'medium' | 'large'): void`

Cambia el tamaño de la fuente y persiste el cambio.

### `setFontFamily(font: 'Arial' | 'Verdana' | 'Georgia'): void`

Cambia la familia de la fuente y persiste el cambio.

## Guía de Uso

### Lectura de Configuración (Componente)

```typescript
<script setup lang="ts">
import { AppConfig } from '@/services/AppConfig';

const config = AppConfig.getInstance();
const settings = config.getSettings();
</script>

<template>
  <div :class="settings.theme">
    Tema actual: {{ settings.theme }}
  </div>
</template>
```

### Modificación de Configuración

```typescript
<script setup lang="ts">
import { AppConfig } from '@/services/AppConfig';

const config = AppConfig.getInstance();

function cambiarTemaOscuro() {
  config.setTheme('dark');
}
</script>
```
