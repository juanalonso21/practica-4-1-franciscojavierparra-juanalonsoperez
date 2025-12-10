# Bienvenido a la Documentación

Esta es la documentación del proyecto **Gestor Interactivo de Sala de Cine**.

## Guía de Inicio

### Requisitos Previos

- **Node.js**: Versión 20.19.0 o superior recomendada.
- **npm**: Gestor de paquetes incluido con Node.js.

### Instalación

1. Clona el repositorio en tu máquina local.
2. Abre una terminal en la carpeta del proyecto.
3. Instala las dependencias ejecutando:

```bash
npm install
```

### Comandos Disponibles

#### Entorno de Desarrollo

Para iniciar la aplicación Vue en modo desarrollo (con recarga en caliente):

```bash
npm run dev
```

La aplicación estará disponible generalmente en `http://localhost:5173`.

#### Visualizar Documentación

Para ver esta documentación en tu navegador mientras la editas:

```bash
npm run docs:dev
```

La documentación se servirá en `http://localhost:8080` (o puerto similar).

#### Ejecutar Tests

Para verificar que todo funciona correctamente, puedes ejecutar las pruebas unitarias:

```bash
npm run test:unit
```

## Componentes

- [SalaCine](/sala-cine.md): Componente principal para visualizar y gestionar butacas. Incluye documentación detallada de Props, Métodos y Tipos.
