<script setup lang="ts">
import PageHeading from "@/components/common/PageHeading.vue";
import TextDifferenceCheckerViewer from "@/components/viewer/TextDifferenceCheckerViewer.vue";
import * as Diff from "diff";
import { Change } from "diff";
import { DiffType } from "@/types/textDiff";

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
  { label: "Characters", value: "chars" },
  { label: "Words", value: "words" },
  { label: "Lines", value: "lines" },
];

type InputLayout = "vertical" | "horizontal";
const inputLayout = ref<InputLayout>("vertical");
const inputLayoutOptions = [
  { icon: "pi pi-arrows-v", value: "vertical" },
  { icon: "pi pi-arrows-h", value: "horizontal" },
];

let diffResult = ref<Change[]>([]);

const checkDiff = (text1: string, text2: string, diffType: DiffType) => {
  if (diffType === "chars") {
    diffResult.value = Diff.diffChars(text1, text2);
  } else if (diffType === "words") {
    diffResult.value = Diff.diffWords(text1, text2);
  } else if (diffType === "lines") {
    diffResult.value = Diff.diffLines(text1, text2);
  }
};

watch([text1, text2, diffType], () => {
  checkDiff(text1.value, text2.value, diffType.value);
});
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
            <PageHeading :size="7" :level="2">Reference</PageHeading>
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
            <PageHeading :size="7" :level="2">Comparison</PageHeading>
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
          <PageHeading :size="7" :level="2">Result</PageHeading>
          <div>
            <span class="me-2">Compare :</span>
            <Dropdown option-label="label" option-value="value" :options="diffTypeOptions" v-model="diffType" />
          </div>
        </div>
        <div class="col py-2">
          <div class="diff-viewer-wrap" style="min-height: 23px">
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
}
</style>
