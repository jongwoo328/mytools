import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";

import "ant-design-vue/dist/antd.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "vue-json-pretty/lib/styles.css";

createApp(App).use(createPinia()).use(router).use(Antd).mount("#app");
