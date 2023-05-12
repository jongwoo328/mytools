// https://nuxt.com/docs/api/configuration/nuxt-config
import eslintPlugin from "vite-plugin-eslint";

const siteUrl = "https://tools.jongwoo.me";

export default defineNuxtConfig({
  ssr: true,
  modules: ["nuxt-gtag", "nuxt-lodash", "@vueuse/nuxt", "nuxt-simple-sitemap"],
  app: {
    head: {
      title: "My Tools",
      meta: [
        {
          name: "naver-site-verification",
          content: "d60b32a9c6b89b0ba2e0bdacd9525e95d56af731",
        },
        {
          name: "description",
          content:
            "This website provides a collection of simple yet useful tools that work solely on the client-side, " +
            "allowing users to enjoy their benefits without worrying about data leaks. " +
            "The website features various functions including CSV to JSON converter, epoch time converter, " +
            "image type converter, image cropper, JSON formatter, SQL formatter, and HTML viewer.",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      siteUrl,
    },
  },

  vite: {
    plugins: [eslintPlugin()],
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
