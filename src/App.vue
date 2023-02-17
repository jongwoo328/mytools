<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import { UpOutlined } from "@ant-design/icons-vue";
</script>

<template>
  <ALayout ref="layoutRoot" id="main" class="align-items-center">
    <PageHeader />
    <ALayoutContent
      id="view"
      class="container pt-5"
      style="padding-bottom: 100px"
    >
      <router-view />
    </ALayoutContent>
  </ALayout>
  <ABackTop :visibility-heighteight="10">
    <AButton shape="circle" type="primary" size="large" style="border: none">
      <template #icon>
        <UpOutlined class="d-flex align-items-center text-white" />
      </template>
    </AButton>
  </ABackTop>
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
