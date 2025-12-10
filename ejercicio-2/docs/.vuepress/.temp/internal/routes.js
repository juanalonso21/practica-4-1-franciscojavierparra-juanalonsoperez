export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/franparra/Documents/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-2/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Bienvenido a la Documentación"} }],
  ["/sala-cine.html", { loader: () => import(/* webpackChunkName: "sala-cine.html" */"/Users/franparra/Documents/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-2/docs/.vuepress/.temp/pages/sala-cine.html.js"), meta: {"title":"Componente SalaCine"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/Users/franparra/Documents/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-2/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);
