import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'es-ES',
  title: 'Patrón Singleton',
  description: 'Documentación del Ejercicio 4.1',

  theme: defaultTheme({
    logo: 'https://vuejs.org/images/logo.png',
    navbar: [
      {
        text: 'Inicio',
        link: '/',
      },
      {
        text: 'AppConfig',
        link: '/Singleton-AppConfig.md',
      },
    ],
  }),

  bundler: viteBundler(),
})
