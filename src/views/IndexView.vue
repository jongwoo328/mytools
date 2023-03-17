<script setup lang="ts">
import { AvailableTool } from "@/types/Tool";
import FunctionListItem from "@/components/index/FunctionListItem.vue";
import { RouterName } from "@/router";

const Tags = {
  Formatter: {
    name: "Formatter",
    color: "orange",
  },
  Converter: {
    name: "Converter",
    color: "green",
  },
  Viewer: {
    name: "Viewer",
    color: "blue",
  },
};

const availableTools: AvailableTool[] = [
  {
    title: "JSON Formatter",
    router: { name: RouterName.JSONFormatter },
    description: "Formatting JSON text",
    tags: [Tags.Formatter],
  },
  {
    title: "SQL Formatter",
    router: { name: RouterName.SQLFormatter },
    description: "Formatting SQL",
    tags: [Tags.Formatter],
  },
  {
    title: "Image Converter",
    router: { name: RouterName.ImageConverter },
    description: "Convert image (JPEG, PNG, WEBP, Base64)",
    tags: [Tags.Converter],
  },
  {
    title: "HTML Viewer",
    router: { name: RouterName.HTMLViewer },
    description: "HTML viewer",
    tags: [Tags.Viewer],
  },
];
</script>

<template>
  <ATypographyTitle :level="2">⚒️ Available Tools</ATypographyTitle>
  <ARow class="mt-5" :gutter="12">
    <ACol
      v-for="availableTool in availableTools"
      :key="availableTool.title"
      :span="24"
      :md="12"
      :xl="8"
    >
      <FunctionListItem :tool="availableTool"></FunctionListItem>
    </ACol>
  </ARow>
</template>
