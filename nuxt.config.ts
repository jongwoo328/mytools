// https://nuxt.com/docs/api/configuration/nuxt-config
import eslintPlugin from "@nabla/vite-plugin-eslint";
import fs from "fs";

const siteUrl = "https://tools.jongwoo.me";

export default defineNuxtConfig({
  compatibilityDate: "2024-08-10",
  ssr: true,

  devServer: {
    https: {
      key: fs.readFileSync("cert/local.key").toString(),
      cert: fs.readFileSync("cert/local.crt").toString(),
    },
    host: "test-tools.jongwoo.me",
    port: 3000,
  },

  modules: [
    "nuxt-gtag",
    "nuxt-lodash",
    "@vueuse/nuxt",
    "@nuxtjs/sitemap",
    "@nuxtjs/web-vitals",
    "@nuxtjs/robots",
    "nuxt-jsonld",
    "@nuxtjs/i18n",
  ],

  routeRules: {
    "/**": { prerender: true },
  },

  // nuxtjs/i18n
  i18n: {
    vueI18n: "./i18n.config.ts",
    strategy: "prefix_and_default",
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        iso: "en-US",
        file: "en.json",
        name: "English",
      },
      {
        code: "ko",
        iso: "ko-KR",
        file: "ko.json",
        name: "한국어",
      },
    ],
    langDir: "locales/",
    compilation: {
      strictMessage: false,
    },
  },

  // nuxt-robots
  robots: {
    rules: {
      UserAgent: "*",
      Disallow: "",
    },
  },
  app: {
    head: {
      title: "Tools For Developer",
      meta: [
        {
          name: "naver-site-verification",
          content: "d60b32a9c6b89b0ba2e0bdacd9525e95d56af731",
        },
        {
          name: "description",
          content:
            "Provides a variety of development-required features without a server, " +
            "enabling safe use without worrying about data leakage",
        },
      ],
    },
  },
  site: { url: siteUrl },

  vite: {
    plugins: [eslintPlugin()],
  },

  webVitals: {
    debug: false,
    disabled: false,
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
    "@/assets/styles/main.scss",
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
