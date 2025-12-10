import { CodeTabs } from "C:/modulos/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-1/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "C:/modulos/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-1/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "C:/modulos/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-1/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
