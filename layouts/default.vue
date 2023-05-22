<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import GlobalBackTop from "@/components/common/GlobalBackTop.vue";

const { isWindows } = useOs();
useHead({
  link: [
    {
      rel: "icon",
      key: "favicon",
      type: "image/x-icon",
      href: isWindows ? "/favicon-win.ico" : "/favicon-mac.ico",
    },
  ],
});
</script>

<template>
  <div id="main" class="d-flex flex-column align-items-center">
    <PageHeader />
    <div id="view" class="container pt-5" style="padding-bottom: 100px">
      <CommonToast />
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
  background-color: #f0f2f5;
}

body {
  font-family: (--font-family);
}
</style>
