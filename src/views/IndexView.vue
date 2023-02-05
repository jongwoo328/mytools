<script setup lang="ts">
import { AvailableTool } from "@/types/Tool";
import IndexLinkCard from "@/components/IndexLinkCard.vue";
import { RouterName } from "@/router";

const availableTools: AvailableTool[] = [
  {
    title: "JSON Formatter",
    router: { name: RouterName.JSONFormatter },
    description: "formatting JSON text",
    tags: [
      {
        name: "Formatter",
      },
    ],
  },
  {
    title: "SQL Formatter",
    router: { name: RouterName.SQLFormatter },
    description: "formatting SQL",
    tags: [
      {
        name: "Formatter",
      },
    ],
  },
];
</script>

<template>
  <ATypographyTitle>⚒️ Available Tools</ATypographyTitle>
  <ARow class="mt-5">
    <ACol
      v-for="availableTool in availableTools"
      :key="availableTool.title"
      :span="24"
      :md="12"
      :xl="8"
    >
      <IndexLinkCard :tool="availableTool"></IndexLinkCard>
    </ACol>
  </ARow>
</template>
