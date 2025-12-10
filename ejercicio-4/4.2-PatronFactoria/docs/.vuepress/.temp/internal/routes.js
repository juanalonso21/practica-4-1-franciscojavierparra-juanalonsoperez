export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/franparra/Documents/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-4/4.2-PatronFactoria/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Documentación del Proyecto"} }],
  ["/notifications.html", { loader: () => import(/* webpackChunkName: "notifications.html" */"/Users/franparra/Documents/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-4/4.2-PatronFactoria/docs/.vuepress/.temp/pages/notifications.html.js"), meta: {"title":"Patrón Factoría: Notificaciones"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/Users/franparra/Documents/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-4/4.2-PatronFactoria/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
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
