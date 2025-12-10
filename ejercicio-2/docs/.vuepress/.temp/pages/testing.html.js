import comp from "/Users/franparra/Documents/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-2/docs/.vuepress/.temp/pages/testing.html.vue"
const data = JSON.parse("{\"path\":\"/testing.html\",\"title\":\"Guía de Testing\",\"lang\":\"es-ES\",\"frontmatter\":{},\"git\":{},\"filePathRelative\":\"testing.md\"}")
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
