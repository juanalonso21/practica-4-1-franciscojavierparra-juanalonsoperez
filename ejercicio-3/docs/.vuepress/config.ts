import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
    lang: 'es-ES',
    title: 'Documentación Ejercicio 3',
    description: 'Documentación para el ejercicio 3',
    bundler: viteBundler({
        viteOptions: {
            configFile: false,
        },
    }),
    theme: defaultTheme({
        sidebar: [
            '/',
            '/gestor-horarios',
        ],
    }),
})
