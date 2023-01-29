<script setup lang="ts">
import { defineProps } from "vue";
import { AvailableTool } from "@/types/Tool";

const props = defineProps<{
  tool: AvailableTool;
}>();
</script>

<template>
  <ACard class="available-card">
    <template v-slot:title>
      <RouterLink class="text-decoration-none" :to="props.tool.router">
        <ATypographyTitle class="m-0" :level="3">{{
          props.tool.title
        }}</ATypographyTitle>
      </RouterLink>
    </template>
    <ATypographyParagraph> formatting JSON text </ATypographyParagraph>
    <div>
      <ATag v-for="tag in props.tool.tags" :key="tag" :color="tag.color ?? ''">
        {{ `# ${tag.name}` }}
      </ATag>
    </div>
    <div class="mt-3">
      <AButton size="large" block type="primary">
        <RouterLink class="text-decoration-none" :to="props.tool.router">
          Try
        </RouterLink>
      </AButton>
    </div>
  </ACard>
</template>

<style lang="scss" scoped></style>
