<script lang="ts" setup>
import PageHeading from "./PageHeading.vue";

defineProps<{ title: string }>();
</script>

<template>
  <PageHeading class="mb-4" :level="1" :size="8" weight="600">{{ title }}</PageHeading>
</template>
