import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
    lang: 'es-ES',
    title: 'Documentación Ejercicio 1',
    description: 'Documentación para el ejercicio 1',
    bundler: viteBundler({
        viteOptions: {
            configFile: false,
        },
    }),
    theme: defaultTheme({
        sidebar: [
            '/',
            '/juego-cartas',
        ],
    }),
})
