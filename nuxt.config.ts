// https://nuxt.com/docs/api/configuration/nuxt-config
import eslintPlugin from "@nabla/vite-plugin-eslint";
import fs from "fs";
import Lara from "@primevue/themes/lara";
import defaultOptions from "@primevue/core/config";
import { definePreset } from "@primeuix/styled";

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
    "@primevue/nuxt-module",
    "@nuxtjs/color-mode",
  ],

  colorMode: {
    preference: "system",
    fallback: "light",
    classPrefix: "",
    classSuffix: "-mode",
    storageKey: "color-mode",
  },

  primevue: {
    usePrimeVue: true,
    autoImport: true,

    options: {
      locale: {
        ...defaultOptions.locale,
        noFileChosenMessage: "",
      },
      theme: {
        preset: definePreset(Lara, {
          semantic: {
            primary: {
              50: "{blue.50}",
              100: "{blue.100}",
              200: "{blue.200}",
              300: "{blue.300}",
              400: "{blue.400}",
              500: "{blue.500}",
              600: "{blue.600}",
              700: "{blue.700}",
              800: "{blue.800}",
              900: "{blue.900}",
              950: "{blue.950}",
            },
          },
        }),
        options: {
          darkModeSelector: ".dark-mode",
        },
      },
    },
  },

  routeRules: {
    "/**": { prerender: true },
  },

  // nuxtjs/i18n
  i18n: {
    vueI18n: "./i18n/i18n.config.ts",
    strategy: "prefix_and_default",
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        language: "en-US",
        file: "en.json",
        name: "English",
      },
      {
        code: "ko",
        language: "ko-KR",
        file: "ko.json",
        name: "한국어",
      },
    ],
    compilation: {
      strictMessage: false,
    },
    restructureDir: "i18n",
  },

  // nuxt-robots
  robots: {
    groups: [
      {
        userAgent: "*",
        disallow: "",
      },
    ],
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
    "primeicons/primeicons.css",
    "vue-json-pretty/lib/styles.css",
    "cropperjs/dist/cropper.css",
    "aos/dist/aos.css",
  ],
});
