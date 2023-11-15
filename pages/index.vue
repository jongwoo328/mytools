<script setup lang="ts">
import { AvailableTool } from "@/types/Tool";
import FunctionListItem from "@/components/index/FunctionListItem.vue";
import ServiceInformationModal from "@/components/common/ServiceInformationModal.vue";
import PageHeading from "@/components/common/PageHeading.vue";

const { t: $t } = useI18n();

const showModal = useLocalStorage("showServiceInformationModal", true);

const Tags = {
  Formatter: {
    id: "Formatter",
    name: $t("index.tags.formatter"),
    color: "#fab005",
  },
  Converter: {
    id: "Converter",
    name: $t("index.tags.converter"),
    color: "#40c057",
  },
  Viewer: {
    id: "Viewer",
    name: $t("index.tags.viewer"),
    color: "#228be6",
  },
  Calculator: {
    id: "Calculator",
    name: $t("index.tags.calculator"),
    color: "#845ef7",
  },
};

const availableTools: AvailableTool[] = [
  {
    title: $t("index.tools.json_formatter.title"),
    router: "/formatter/json",
    description: $t("index.tools.json_formatter.description"),
    tags: [Tags.Formatter],
  },
  {
    title: $t("index.tools.sql_formatter.title"),
    router: "/formatter/sql",
    description: $t("index.tools.sql_formatter.description"),
    tags: [Tags.Formatter],
  },
  {
    title: $t("index.tools.image_converter.title"),
    router: "/converter/image",
    description: $t("index.tools.image_converter.description"),
    tags: [Tags.Converter],
  },
  {
    title: $t("index.tools.html_viewer.title"),
    router: "/viewer/html",
    description: $t("index.tools.html_viewer.description"),
    tags: [Tags.Viewer],
  },
  {
    title: $t("index.tools.epoch_converter.title"),
    router: "/converter/epoch",
    description: $t("index.tools.epoch_converter.description"),
    tags: [Tags.Converter],
  },
  {
    title: $t("index.tools.csv_to_json_converter.title"),
    router: "/converter/csv-to-json",
    description: $t("index.tools.csv_to_json_converter.description"),
    tags: [Tags.Converter],
  },
  {
    title: $t("index.tools.image_cropper.title"),
    router: "/converter/image-crop",
    description: $t("index.tools.image_cropper.description"),
    tags: [Tags.Converter],
  },
  {
    title: $t("index.tools.url_encoder/decoder.title"),
    router: "/converter/url",
    description: $t("index.tools.url_encoder/decoder.description"),
    tags: [Tags.Converter],
  },
  {
    title: $t("index.tools.color_code_converter.title"),
    router: "/converter/color",
    description: $t("index.tools.color_code_converter.description"),
    tags: [Tags.Converter],
  },
  {
    title: $t("index.tools.text_difference_checker.title"),
    router: "/viewer/text-diff",
    description: $t("index.tools.text_difference_checker.description"),
    tags: [Tags.Viewer],
  },
  {
    title: $t("index.tools.text_length_calculator.title"),
    router: "/calculator/text-length",
    description: $t("index.tools.text_length_calculator.description"),
    tags: [Tags.Calculator],
  },
];

const toolFilter = reactive({
  isFormatter: true,
  isConverter: true,
  isViewer: true,
  isCalculator: true,
});
const { isFormatter, isConverter, isViewer, isCalculator } = toRefs(toolFilter);

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
    if (isCalculator.value && tool.tags.includes(Tags.Calculator)) {
      return true;
    }
    return false;
  });
});
</script>

<template>
  <PageHeading :size="8" :level="1" weight="600">
    {{ $t("index.title") }}
  </PageHeading>
  <div class="mt-3">
    <div class="d-flex flex-wrap justify-content-start gap-1">
      <ToggleButton
        v-model="isFormatter"
        onIcon="pi pi-check"
        offIcon="pi pi-times"
        :on-label="$t('index.filter.formatter.on')"
        :off-label="$t('index.filter.formatter.off')"
        class="py-1"
        :class="[{ 'filter-selected-formatter': isFormatter }]"
      />
      <ToggleButton
        v-model="isConverter"
        onIcon="pi pi-check"
        offIcon="pi pi-times"
        :on-label="$t('index.filter.converter.on')"
        :off-label="$t('index.filter.converter.off')"
        class="py-1"
        :class="[{ 'filter-selected-converter': isConverter }]"
      />
      <ToggleButton
        v-model="isViewer"
        onIcon="pi pi-check"
        offIcon="pi pi-times"
        :on-label="$t('index.filter.viewer.on')"
        :off-label="$t('index.filter.viewer.off')"
        class="py-1"
        :class="[{ 'filter-selected-viewer': isViewer }]"
      />
      <ToggleButton
        v-model="isCalculator"
        onIcon="pi pi-check"
        offIcon="pi pi-times"
        :on-label="$t('index.filter.calculator.on')"
        :off-label="$t('index.filter.calculator.off')"
        class="py-1"
        :class="[{ 'filter-selected-calculator': isCalculator }]"
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

.filter-selected-calculator {
  background-color: v-bind("Tags.Calculator.color") !important;
  border-color: v-bind("Tags.Calculator.color") !important;
}
</style>
