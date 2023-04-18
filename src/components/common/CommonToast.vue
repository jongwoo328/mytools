<script lang="ts" setup>
import Toast from "primevue/toast";
import { breakpointsBootstrapV5 } from "@vueuse/core";
</script>

<template>
  <Toast
    :breakpoints="{
      [`${breakpointsBootstrapV5.md}px`]: { width: '300px', height: '50px' },
    }"
  />
</template>
