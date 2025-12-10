export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/franparra/Documents/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-4/4.1-PatronSingleton/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Documentación del Proyecto"} }],
  ["/Singleton-AppConfig.html", { loader: () => import(/* webpackChunkName: "Singleton-AppConfig.html" */"/Users/franparra/Documents/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-4/4.1-PatronSingleton/docs/.vuepress/.temp/pages/Singleton-AppConfig.html.js"), meta: {"title":"Patrón Singleton: AppConfig"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/Users/franparra/Documents/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-4/4.1-PatronSingleton/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
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
