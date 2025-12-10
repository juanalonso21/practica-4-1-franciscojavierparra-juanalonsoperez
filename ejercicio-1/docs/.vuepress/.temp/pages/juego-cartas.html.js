import comp from "C:/modulos/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-1/docs/.vuepress/.temp/pages/juego-cartas.html.vue"
const data = JSON.parse("{\"path\":\"/juego-cartas.html\",\"title\":\"Juego de Cartas (El Último Descarte)\",\"lang\":\"es-ES\",\"frontmatter\":{},\"git\":{},\"filePathRelative\":\"juego-cartas.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
