import { CodeTabs } from "/Users/franparra/Documents/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-4/4.2-PatronFactoria/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "/Users/franparra/Documents/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-4/4.2-PatronFactoria/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "/Users/franparra/Documents/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-4/4.2-PatronFactoria/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
