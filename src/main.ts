import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import VueCodemirror from "vue-codemirror";
import { basicSetup } from "codemirror";

import "ant-design-vue/dist/antd.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "vue-json-pretty/lib/styles.css";

import VueGtag, { trackRouter } from "vue-gtag-next";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";

trackRouter(router, { useScreenview: true, skipSamePath: true });

AOS.init();
createApp(App)
  .use(createPinia())
  .use(router)
  .use(Antd)
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
