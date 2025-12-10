import comp from "/Users/franparra/Documents/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-2/docs/.vuepress/.temp/pages/sala-cine.html.vue"
const data = JSON.parse("{\"path\":\"/sala-cine.html\",\"title\":\"Componente SalaCine\",\"lang\":\"es-ES\",\"frontmatter\":{},\"git\":{\"updatedTime\":1765378758000,\"contributors\":[{\"name\":\"MAX-Franek\",\"username\":\"MAX-Franek\",\"email\":\"fransalta77@gmail.com\",\"commits\":1,\"url\":\"https://github.com/MAX-Franek\"}],\"changelog\":[{\"hash\":\"c3ca2cc14b2041865fb99991d5f95fb38ce9cc32\",\"time\":1765378758000,\"email\":\"fransalta77@gmail.com\",\"author\":\"MAX-Franek\",\"message\":\"documentacionYTest\"}]},\"filePathRelative\":\"sala-cine.md\"}")
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
