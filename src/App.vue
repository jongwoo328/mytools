<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import GlobalBackTop from "@/components/common/GlobalBackTop.vue";
</script>

<template>
  <div id="main" class="d-flex flex-column align-items-center">
    <PageHeader />
    <div id="view" class="container pt-5" style="padding-bottom: 100px">
      <router-view />
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
