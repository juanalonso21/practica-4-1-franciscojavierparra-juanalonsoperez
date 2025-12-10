import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  lang: 'es-ES',
  title: 'Documentación Sala Cine',
  description: 'Documentación del componente SalaCine',
  bundler: viteBundler({
    viteOptions: {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../../src'),
        },
      },
    },
  }),
  theme: defaultTheme({
    navbar: [
      {
        text: 'Inicio',
        link: '/',
      },
      {
        text: 'SalaCine',
        link: '/sala-cine.md',
      },
    ],
    sidebar: [
      {
        text: 'Guía',
        children: ['/sala-cine.md'],
      },
    ],
  }),
})
