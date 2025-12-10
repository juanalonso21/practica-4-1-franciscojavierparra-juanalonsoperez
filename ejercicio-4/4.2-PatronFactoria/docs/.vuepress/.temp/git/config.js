import { GitContributors } from "/Users/franparra/Documents/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-4/4.2-PatronFactoria/node_modules/@vuepress/plugin-git/lib/client/components/GitContributors.js";
import { GitChangelog } from "/Users/franparra/Documents/2DAW/DWEC/practica-4-1-franciscojavierparra-juanalonsoperez/ejercicio-4/4.2-PatronFactoria/node_modules/@vuepress/plugin-git/lib/client/components/GitChangelog.js";

export default {
  enhance: ({ app }) => {
    app.component("GitContributors", GitContributors);
    app.component("GitChangelog", GitChangelog);
  },
};
