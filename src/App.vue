<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
</script>

<template>
  <PageHeader />
  <ALayout id="main" class="align-items-center">
    <ALayoutContent id="view" class="container pt-5">
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
  height: calc(100vh - 64px);
}
</style>
