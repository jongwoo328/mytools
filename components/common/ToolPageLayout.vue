<script setup lang="ts">
import PageTitle from "~/components/common/PageTitle.vue";

defineProps<{ title: string; description?: string }>();
</script>

<template>
  <PageTitle :title="title" />
  <p class="mb-5" v-if="description">{{ description }}</p>
  <slot />
</template>

<style scoped lang="scss"></style>
