// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueCropper from "vue-cropperjs";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("vue-cropper", VueCropper);
});
