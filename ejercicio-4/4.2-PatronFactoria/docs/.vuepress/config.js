import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'es-ES',

  title: 'Documentación del Proyecto',
  description: 'Documentación generada con VuePress',

  theme: defaultTheme({
    logo: 'https://vuejs.org/images/logo.png',

    navbar: ['/', '/notifications'],
  }),

  bundler: viteBundler(),
})
