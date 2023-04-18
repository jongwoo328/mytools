<script setup lang="ts">
import { AvailableTool } from "@/types/Tool";
import FunctionListItem from "@/components/index/FunctionListItem.vue";
import { RouterName } from "@/router";
import ServiceInformationModal from "@/components/common/ServiceInformationModal.vue";
import { ref } from "vue";
import PageHeading from "@/components/common/PageHeading.vue";

const showModal = ref(
  localStorage.getItem("showServiceInformationModal") !== "false"
);
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
  {
    title: "Epoch Converter",
    router: { name: RouterName.EpochConverter },
    description: "Converting between epoch and human-readable time",
    tags: [Tags.Converter],
  },
  {
    title: "CSV to JSON Converter",
    router: { name: RouterName.CSVToJSONConverter },
    description: "Convert CSV to JSON",
    tags: [Tags.Converter],
  },
  {
    title: "Image Cropper",
    router: { name: RouterName.ImageCropper },
    description: "Crop image",
    tags: [Tags.Converter],
  },
];
</script>

<template>
  <PageHeading :size="8" :level="2" weight="600">
    ⚒️ Available Tools
  </PageHeading>
  <div class="row mt-5 gx-3 gy-3">
    <div
      class="col col-12 col-md-6 col-xl-4"
      v-for="availableTool in availableTools"
      :key="availableTool.title"
    >
      <FunctionListItem :tool="availableTool"></FunctionListItem>
    </div>
  </div>
  <ServiceInformationModal :show-modal-initial="showModal" />
</template>
