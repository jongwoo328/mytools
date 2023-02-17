<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
</script>

<template>
  <ALayout id="main" class="align-items-center">
    <PageHeader />
    <ALayoutContent
      id="view"
      class="container pt-5"
      style="padding-bottom: 100px"
    >
      <router-view />
    </ALayoutContent>
  </ALayout>
</template>

<style lang="scss">
a {
  text-decoration: none;
}
#main {
  overflow-y: auto;
  min-height: 100vh;
}
</style>
