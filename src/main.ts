import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import VueCodemirror from "vue-codemirror";
import { basicSetup } from "codemirror";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueCropper from "vue-cropperjs";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "vue-json-pretty/lib/styles.css";
import "cropperjs/dist/cropper.css";

import VueGtag, { trackRouter } from "vue-gtag-next";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

trackRouter(router, { useScreenview: true, skipSamePath: true });

AOS.init();
const app = createApp(App);

app
  .use(createPinia())
  .use(router)
  .use(PrimeVue)
  .use(ToastService)
  .component("vue-cropper", VueCropper)
  .use(VueCodemirror, {
    lineNumbers: false,
    extensions: [basicSetup],
  })
  .use(VueGtag, {
    appName: "My Tools",
    property: {
      id: "G-5LVPSWJ2CB",
      params: {
        send_page_view: false,
      },
    },
  })
  .mount("#app");

type toastOption = {
  severity: "success" | "info" | "warn" | "error" | string;
  summary: string | undefined;
  life: number | undefined;
};
const toastService = {
  add: ({ severity, summary, life }: toastOption) => {
    app.config.globalProperties.$toast.add({
      severity,
      summary,
      life,
    });
  },
};
export { toastService };
