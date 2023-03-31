<script lang="ts" setup>
import { UpOutlined } from "@ant-design/icons-vue";
</script>

<template>
  <ABackTop :visibility-height="10">
    <AButton
      class="backtop-button"
      shape="circle"
      type="primary"
      size="large"
      style="border: none"
    >
      <template #icon>
        <UpOutlined class="d-flex align-items-center text-white" />
      </template>
    </AButton>
  </ABackTop>
</template>

<style lang="scss" scoped></style>
