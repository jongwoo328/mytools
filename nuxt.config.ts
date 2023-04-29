// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: ["nuxt-gtag", "nuxt-lodash", "@vueuse/nuxt"],
  app: {
    head: {
      title: "My Tools",
      meta: [
        {
          name: "naver-site-verification",
          content: "d60b32a9c6b89b0ba2e0bdacd9525e95d56af731",
        },
      ],
    },
  },

  // nuxt-gtag
  gtag: {
    id: "G-5LVPSWJ2CB",
  },

  // nuxt-lodash
  lodash: {
    prefix: "useLodash",
    prefixSkip: false,
  },

  css: [
    "@/assets/styles/main.css",
    "bootstrap/dist/css/bootstrap.min.css",
    "primevue/resources/themes/lara-light-blue/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
    "vue-json-pretty/lib/styles.css",
    "cropperjs/dist/cropper.css",
    "aos/dist/aos.css",
  ],
  build: {
    transpile: ["primevue"],
  },
});
