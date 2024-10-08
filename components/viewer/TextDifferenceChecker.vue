<script setup lang="ts">
import PageHeading from "@/components/common/PageHeading.vue";
import TextDifferenceCheckerViewer from "@/components/viewer/TextDifferenceCheckerViewer.vue";
import { type Change } from "diff";
import { type DiffType } from "@/types/textDiff";
import TextDiffWorker from "@/assets/scripts/textDiffWorker?worker";

const { t } = useI18n();

const isCalculating = ref(false);
const isTimeOver = ref(false);
const showCancelButton = ref(false);
let worker: Worker | null = null;

function refreshWorker() {
  if (worker) {
    worker.terminate();
    worker = null;
  }
  worker = new TextDiffWorker();
  worker.onmessage = (e) => {
    diffResult.value = e.data;
    isCalculating.value = false;
  };
}

function cancelWorker() {
  refreshWorker();
  isCalculating.value = false;
}

const text1 = ref("");
const text2 = ref("");
const resetText1 = () => {
  text1.value = "";
};
const resetText2 = () => {
  text2.value = "";
};

const diffType = ref<DiffType>("chars");
const diffTypeOptions = [
  { label: t("viewer.text-diff.diff_type_options.chars"), value: "chars" },
  { label: t("viewer.text-diff.diff_type_options.words"), value: "words" },
  { label: t("viewer.text-diff.diff_type_options.lines"), value: "lines" },
];

type InputLayout = "vertical" | "horizontal";
const inputLayout = ref<InputLayout>("vertical");
const inputLayoutOptions = [
  { icon: "pi pi-arrows-v", value: "vertical" },
  { icon: "pi pi-arrows-h", value: "horizontal" },
];

let diffResult = ref<Change[]>([]);

async function postMessageToWorker() {
  worker?.postMessage({
    text1: text1.value,
    text2: text2.value,
    diffType: diffType.value,
  });
}

watchDebounced(
  [text1, text2, diffType],
  async () => {
    isTimeOver.value = false;
    showCancelButton.value = false;
    refreshWorker();
    setTimeout(() => {
      isTimeOver.value = true;
    }, 10_000);
    setTimeout(() => {
      showCancelButton.value = true;
    }, 3_000);
    isCalculating.value = true;

    postMessageToWorker();
  },
  { debounce: 300 },
);
</script>

<template>
  <div class="row">
    <div class="col col-12">
      <div class="row">
        <div class="d-flex justify-content-end mb-3">
          <SelectButton option-value="value" :options="inputLayoutOptions" v-model="inputLayout">
            <template #option="slotProps">
              <i :class="slotProps.option.icon"></i>
            </template>
          </SelectButton>
        </div>
        <div class="col" :class="{ 'col-12': inputLayout === 'vertical', 'col-6': inputLayout === 'horizontal' }">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <PageHeading :size="7" :level="2">
              {{ t("viewer.text-diff.reference") }}
            </PageHeading>
            <Button @click="resetText1" icon="pi pi-trash" text rounded severity="danger" size="small"></Button>
          </div>
          <Textarea
            class="prevent-auto-zoom w-100 font-monospace-code overflow-auto"
            v-model="text1"
            style="min-height: 300px; max-height: 400px"
            auto-resize
          />
        </div>
        <div class="col" :class="{ 'col-12': inputLayout === 'vertical', 'col-6': inputLayout === 'horizontal' }">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <PageHeading :size="7" :level="2">
              {{ t("viewer.text-diff.comparison") }}
            </PageHeading>
            <Button @click="resetText2" icon="pi pi-trash" text rounded severity="danger" size="small"></Button>
          </div>
          <Textarea
            class="prevent-auto-zoom w-100 font-monospace-code overflow-auto"
            v-model="text2"
            style="min-height: 300px; max-height: 400px"
            auto-resize
          />
        </div>
      </div>
    </div>
    <div class="col col-12 mt-3">
      <div class="row">
        <div class="d-flex justify-content-between">
          <PageHeading class="m-0" :size="7" :level="2">
            {{ t("viewer.text-diff.result") }}
          </PageHeading>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <ProgressSpinner stroke-width="8" style="height: 20px; width: 50px" class="m-0" v-if="isCalculating" />
            <Button
              @click="cancelWorker"
              severity="danger"
              :loading="!isTimeOver"
              size="small"
              v-if="isCalculating && showCancelButton"
              class="py-1 px-2"
            >
              {{ t("viewer.text-diff.cancel") }}
            </Button>
          </div>
          <div>
            <span class="me-2">
              {{ t("viewer.text-diff.diff_type_label") }}
            </span>
            <Select option-label="label" option-value="value" :options="diffTypeOptions" v-model="diffType" />
          </div>
        </div>
        <div class="col py-2">
          <div class="diff-viewer-wrap">
            <TextDifferenceCheckerViewer :changes="diffResult" :diff-type="diffType" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.diff-viewer-wrap {
  border: 1px solid #ced4da;
  min-height: 83px;
  overflow-x: auto;
  padding: 5px;
}
</style>
