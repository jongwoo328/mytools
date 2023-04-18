<script lang="ts" setup>
import { defineProps } from "vue";
import PageHeading from "./PageHeading.vue";

defineProps<{ title: string }>();
</script>

<template>
  <PageHeading :level="2" :size="8" weight="600">{{ title }} </PageHeading>
</template>
