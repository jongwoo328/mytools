<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import GlobalBackTop from "@/components/common/GlobalBackTop.vue";
import { breakpointsBootstrapV5 } from "@vueuse/core";
import LocaleDropdown from "@/components/common/LocaleDropdown.vue";
import ThemeSelector from "~/components/common/ThemeSelector.vue";
import themeColors from "~/utils/themeColors";

const { locale, t } = useI18n();
const { isWindows } = useOs();

const breakpoints = useBreakpoints(breakpointsBootstrapV5);
const isMobileOrTablet = breakpoints.smaller("lg");
const themeColorsRef = toRef(themeColors); // used in style

useHead({
  link: [
    {
      rel: "icon",
      key: "favicon",
      type: "image/x-icon",
      href: isWindows ? "/favicon-win.ico" : "/favicon-mac.ico",
    },
  ],
  htmlAttrs: {
    lang: locale,
  },
  title: () => t("title"),
});
</script>

<template>
  <div id="main" class="d-flex flex-column align-items-center">
    <PageHeader />
    <div id="view" class="container" style="padding-bottom: 100px">
      <CommonToast />
      <div v-if="isMobileOrTablet" class="w-100 d-flex justify-content-end pt-2 gap-3">
        <ThemeSelector />
        <LocaleDropdown />
      </div>
      <slot />
    </div>
  </div>
  <GlobalBackTop />
</template>

<style lang="scss">
a {
  text-decoration: none;
}

#main {
  overflow-y: auto;
  min-height: 100vh;
  background-color: v-bind("themeColorsRef.mainBgColor.light");
}

#view {
  padding-top: 14px;
}

@media (min-width: 992px) {
  #view {
    padding-top: 42px;
  }
}

.dark-mode #main {
  background-color: v-bind("themeColorsRef.mainBgColor.dark");
}
</style>
