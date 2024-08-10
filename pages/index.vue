<script setup lang="ts">
import type { AvailableTool } from "@/types/Tool";
import FunctionListItem from "@/components/index/FunctionListItem.vue";
import ServiceInformationModal from "@/components/common/ServiceInformationModal.vue";
import PageHeading from "@/components/common/PageHeading.vue";

const { t } = useI18n();
const localePath = useLocalePath();

const showModal = useLocalStorage("showServiceInformationModal", true);

const Tags = {
  Formatter: {
    id: "Formatter",
    name: t("index.tags.formatter"),
    color: "#fab005",
  },
  Converter: {
    id: "Converter",
    name: t("index.tags.converter"),
    color: "#40c057",
  },
  Viewer: {
    id: "Viewer",
    name: t("index.tags.viewer"),
    color: "#228be6",
  },
  Calculator: {
    id: "Calculator",
    name: t("index.tags.calculator"),
    color: "#845ef7",
  },
};

const availableTools: AvailableTool[] = [
  {
    title: t("index.tools.json_formatter.title"),
    router: localePath("/formatter/json"),
    description: t("index.tools.json_formatter.description"),
    tags: [Tags.Formatter],
  },
  {
    title: t("index.tools.sql_formatter.title"),
    router: localePath("/formatter/sql"),
    description: t("index.tools.sql_formatter.description"),
    tags: [Tags.Formatter],
  },
  {
    title: t("index.tools.image_converter.title"),
    router: localePath("/converter/image"),
    description: t("index.tools.image_converter.description"),
    tags: [Tags.Converter],
  },
  {
    title: t("index.tools.html_viewer.title"),
    router: localePath("/viewer/html"),
    description: t("index.tools.html_viewer.description"),
    tags: [Tags.Viewer],
  },
  {
    title: t("index.tools.epoch_converter.title"),
    router: localePath("/converter/epoch"),
    description: t("index.tools.epoch_converter.description"),
    tags: [Tags.Converter],
  },
  {
    title: t("index.tools.csv_to_json_converter.title"),
    router: localePath("/converter/csv-to-json"),
    description: t("index.tools.csv_to_json_converter.description"),
    tags: [Tags.Converter],
  },
  {
    title: t("index.tools.image_cropper.title"),
    router: localePath("/converter/image-crop"),
    description: t("index.tools.image_cropper.description"),
    tags: [Tags.Converter],
  },
  {
    title: t("index.tools.url_encoder/decoder.title"),
    router: localePath("/converter/url"),
    description: t("index.tools.url_encoder/decoder.description"),
    tags: [Tags.Converter],
  },
  {
    title: t("index.tools.color_code_converter.title"),
    router: localePath("/converter/color"),
    description: t("index.tools.color_code_converter.description"),
    tags: [Tags.Converter],
  },
  {
    title: t("index.tools.text_difference_checker.title"),
    router: localePath("/viewer/text-diff"),
    description: t("index.tools.text_difference_checker.description"),
    tags: [Tags.Viewer],
  },
  {
    title: t("index.tools.text_length_calculator.title"),
    router: localePath("/calculator/text-length"),
    description: t("index.tools.text_length_calculator.description"),
    tags: [Tags.Calculator],
  },
  {
    title: t("index.tools.markdown_viewer.title"),
    router: localePath("/viewer/markdown"),
    description: t("index.tools.markdown_viewer.description"),
    tags: [Tags.Viewer],
  },
  {
    title: t("index.tools.date_time_calculator.title"),
    router: localePath("/calculator/date-time"),
    description: t("index.tools.date_time_calculator.description"),
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
    {{ t("index.title") }}
  </PageHeading>
  <div class="mt-3">
    <div class="d-flex flex-wrap justify-content-start gap-1">
      <ToggleButton
        size="small"
        v-model="isFormatter"
        onIcon="pi pi-check"
        offIcon="pi pi-times"
        :on-label="t('index.filter.formatter.on')"
        :off-label="t('index.filter.formatter.off')"
        class="filter-select-button"
        :class="[{ 'filter-selected-formatter': isFormatter }]"
      />
      <ToggleButton
        v-model="isConverter"
        onIcon="pi pi-check"
        offIcon="pi pi-times"
        :on-label="t('index.filter.converter.on')"
        :off-label="t('index.filter.converter.off')"
        class="filter-select-button"
        :class="[{ 'filter-selected-converter': isConverter }]"
      />
      <ToggleButton
        v-model="isViewer"
        onIcon="pi pi-check"
        offIcon="pi pi-times"
        :on-label="t('index.filter.viewer.on')"
        :off-label="t('index.filter.viewer.off')"
        class="filter-select-button"
        :class="[{ 'filter-selected-viewer': isViewer }]"
      />
      <ToggleButton
        v-model="isCalculator"
        onIcon="pi pi-check"
        offIcon="pi pi-times"
        :on-label="t('index.filter.calculator.on')"
        :off-label="t('index.filter.calculator.off')"
        class="filter-select-button"
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
.filter-select-button {
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  &:deep(span) {
    color: black;
  }
}
.filter-selected-formatter {
  background-color: v-bind("Tags.Formatter.color") !important;
  border: none;
  &:deep(span span) {
    color: white !important;
  }
}

.filter-selected-converter {
  background-color: v-bind("Tags.Converter.color") !important;
  border: none;
  &:deep(span span) {
    color: white !important;
  }
}

.filter-selected-viewer {
  background-color: v-bind("Tags.Viewer.color") !important;
  border: none;
  &:deep(span span) {
    color: white !important;
  }
}

.filter-selected-calculator {
  background-color: v-bind("Tags.Calculator.color") !important;
  border: none;
  &:deep(span span) {
    color: white !important;
  }
}
</style>
