<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{ title: string }>();
</script>

<template>
  <ATypographyTitle :level="2">{{ props.title }}</ATypographyTitle>
</template>
