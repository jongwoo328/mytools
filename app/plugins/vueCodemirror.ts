import VueCodemirror from "vue-codemirror";
import { basicSetup } from "codemirror";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueCodemirror, {
    lineNumbers: false,
    extensions: [basicSetup],
  });
});
