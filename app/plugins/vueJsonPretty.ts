// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueJsonPretty from "vue-json-pretty";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("VueJsonPretty", VueJsonPretty);
});
