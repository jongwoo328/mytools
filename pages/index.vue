<script setup lang="ts">
import { AvailableTool } from "@/types/Tool";
import FunctionListItem from "@/components/index/FunctionListItem.vue";
import ServiceInformationModal from "@/components/common/ServiceInformationModal.vue";
import PageHeading from "@/components/common/PageHeading.vue";

const showModal = useLocalStorage("showServiceInformationModal", true);

const Tags = {
  Formatter: {
    name: "Formatter",
    color: "#fab005",
  },
  Converter: {
    name: "Converter",
    color: "#40c057",
  },
  Viewer: {
    name: "Viewer",
    color: "#228be6",
  },
};

const availableTools: AvailableTool[] = [
  {
    title: "JSON Formatter",
    router: "/formatter/json",
    description: "Formatting JSON text",
    tags: [Tags.Formatter],
  },
  {
    title: "SQL Formatter",
    router: "/formatter/sql",
    description: "Formatting SQL",
    tags: [Tags.Formatter],
  },
  {
    title: "Image Converter",
    router: "/converter/image",
    description: "Convert image (JPEG, PNG, WEBP, Base64)",
    tags: [Tags.Converter],
  },
  {
    title: "HTML Viewer",
    router: "/viewer/html",
    description: "HTML viewer",
    tags: [Tags.Viewer],
  },
  {
    title: "Epoch Converter",
    router: "/converter/epoch",
    description: "Converting between epoch and human-readable time",
    tags: [Tags.Converter],
  },
  {
    title: "CSV to JSON Converter",
    router: "/converter/csv-to-json",
    description: "Convert CSV to JSON",
    tags: [Tags.Converter],
  },
  {
    title: "Image Cropper",
    router: "/converter/image-crop",
    description: "Crop image",
    tags: [Tags.Converter],
  },
  {
    title: "URL Encoder/Decoder",
    router: "/converter/url",
    description: "URL encoder and decoder",
    tags: [Tags.Converter],
  },
  {
    title: "Color Code Converter",
    router: "/converter/color",
    description: "Color Code Converter supports RGB, HEX, CMYK, HSL",
    tags: [Tags.Converter],
  },
  {
    title: "Text Difference Checker",
    router: "/viewer/text-diff",
    description: "Discover text discrepancies easily",
    tags: [Tags.Viewer],
  },
];

const toolFilter = reactive({
  isFormatter: true,
  isConverter: true,
  isViewer: true,
});
const { isFormatter, isConverter, isViewer } = toRefs(toolFilter);

const filteredTools = computed(() => {
  return availableTools.filter((tool) => {
    if (isFormatter.value && tool.tags.includes(Tags.Formatter)) {
      return true;
    }
    if (isConverter.value && tool.tags.includes(Tags.Converter)) {
      return true;
    }
    if (isViewer.value && tool.tags.includes(Tags.Viewer)) {
      return true;
    }
    return false;
  });
});
</script>

<template>
  <PageHeading :size="8" :level="1" weight="600"> 🛠️ Tools For Developer</PageHeading>
  <div class="mt-3">
    <div class="d-flex flex-wrap justify-content-start gap-1">
      <ToggleButton
        v-model="isFormatter"
        onIcon="pi pi-check"
        offIcon="pi pi-times"
        on-label="Formatter"
        off-label="Formatter"
        class="py-1"
        :pt="{
          root: {
            class: [{ 'filter-selected-formatter': isFormatter }],
          },
        }"
      />
      <ToggleButton
        v-model="isConverter"
        onIcon="pi pi-check"
        offIcon="pi pi-times"
        on-label="Converter"
        off-label="Converter"
        class="py-1"
        :pt="{
          root: {
            class: [{ 'filter-selected-converter': isConverter }],
          },
        }"
      />
      <ToggleButton
        v-model="isViewer"
        onIcon="pi pi-check"
        offIcon="pi pi-times"
        on-label="Viewer"
        off-label="Viewer"
        class="py-1"
        :pt="{
          root: {
            class: [{ 'filter-selected-viewer': isViewer }],
          },
        }"
      />
    </div>
  </div>
  <div class="row mt-3 gx-3 gy-3">
    <div class="col col-12 col-md-6 col-xl-4" v-for="filteredTool in filteredTools" :key="filteredTool.title">
      <FunctionListItem :tool="filteredTool"></FunctionListItem>
    </div>
  </div>
  <ServiceInformationModal :show-modal-initial="showModal" />
</template>

<style lang="scss" scoped>
.filter-selected-formatter {
  background-color: v-bind("Tags.Formatter.color") !important;
  border-color: v-bind("Tags.Formatter.color") !important;
}

.filter-selected-converter {
  background-color: v-bind("Tags.Converter.color") !important;
  border-color: v-bind("Tags.Converter.color") !important;
}

.filter-selected-viewer {
  background-color: v-bind("Tags.Viewer.color") !important;
  border-color: v-bind("Tags.Viewer.color") !important;
}
</style>
