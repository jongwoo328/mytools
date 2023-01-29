<script setup lang="ts">
import { RouterName } from "@/router";
import { HomeTwoTone } from "@ant-design/icons-vue";
</script>

<template>
  <ALayoutHeader class="header d-flex flex-row align-items-center px-4">
    <RouterLink class="logo me-5" :to="{ name: RouterName.Index }">
      <div class="logo-title d-flex align-items-center">
        <HomeTwoTone two-tone-color="#4c6ef5" />
      </div>
    </RouterLink>
    <AMenu mode="horizontal" style="margin-left: 120px" :selectable="false">
      <ASubMenu key="formatter">
        <template #title>
          <span style="font-size: 1.3rem">Formatter</span>
        </template>

        <AMenuItem key="json-formatter">
          <RouterLink
            class="text-decoration-none"
            :to="{ name: RouterName.JSONFormatter }"
            >JSON</RouterLink
          >
        </AMenuItem>
      </ASubMenu>
    </AMenu>
  </ALayoutHeader>
</template>

<style lang="scss" scoped>
.header {
  background-color: white;
}
.logo {
  text-decoration: none;

  .logo-title {
    font-size: 2rem;
  }

  &:hover {
    cursor: pointer;
  }
}
</style>
