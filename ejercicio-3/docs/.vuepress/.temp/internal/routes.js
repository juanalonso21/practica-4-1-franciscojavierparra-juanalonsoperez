export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/gestor-horarios.html", { loader: () => import(/* webpackChunkName: "gestor-horarios.html" */"C:/modulos/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-3/docs/.vuepress/.temp/pages/gestor-horarios.html.js"), meta: {"title":"Gestor de Horarios"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"C:/modulos/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-3/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Hello VuePress"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"C:/modulos/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-3/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
