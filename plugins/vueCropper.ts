// @ts-ignore
import VueCropper from "vue-cropperjs";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("vue-cropper", VueCropper);
});
