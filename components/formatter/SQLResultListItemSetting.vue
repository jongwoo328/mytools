<script lang="ts" setup>
import { PropType, ref, Ref, watch } from "vue";
import {
  IndentStyle,
  KeywordCase,
  LogicalOperatorNewline,
} from "sql-formatter";
import Dropdown from "primevue/dropdown";

const props = defineProps({
  useTabs: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
  tabWidth: {
    type: Number as PropType<number>,
    required: true,
  },
  keywordCase: {
    type: String as PropType<KeywordCase>,
    required: true,
  },
  indentation: {
    type: String as PropType<IndentStyle>,
    required: true,
  },
  logicalOperatorNewLine: {
    type: String as PropType<LogicalOperatorNewline>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "update:useTabs", value: boolean): void;
  (e: "update:tabWidth", value: number): void;
  (e: "update:keywordCase", value: KeywordCase): void;
  (e: "update:indentation", value: IndentStyle): void;
  (e: "update:logicalOperatorNewLine", value: LogicalOperatorNewline): void;
}>();

const useTabs = ref(props.useTabs);
const tabWidth = ref(props.tabWidth);
const keywordCase: Ref<KeywordCase> = ref(props.keywordCase);
const indentation: Ref<IndentStyle> = ref(props.indentation);
const logicalOperatorNewLine: Ref<LogicalOperatorNewline> = ref(
  props.logicalOperatorNewLine
);

const keywordCaseOption: { label: string; value: KeywordCase }[] = [
  { label: "Upper", value: "upper" },
  { label: "Lower", value: "lower" },
  { label: "Preserve", value: "preserve" },
];
const indentOption: { label: string; value: IndentStyle }[] = [
  { label: "Standard", value: "standard" },
  { label: "Tabular,Left", value: "tabularLeft" },
];
const logicalOperatorNewLineOption: {
  label: string;
  value: LogicalOperatorNewline;
}[] = [
  { label: "Before", value: "before" },
  { label: "After", value: "after" },
];

watch(useTabs, (newValue) => {
  emit("update:useTabs", newValue);
});
watch(tabWidth, (newValue) => {
  emit("update:tabWidth", newValue);
});
watch(keywordCase, (newValue) => {
  emit("update:keywordCase", newValue);
});
watch(indentation, (newValue) => {
  emit("update:indentation", newValue);
});
watch(logicalOperatorNewLine, (newValue) => {
  emit("update:logicalOperatorNewLine", newValue);
});
</script>

<template>
  <div>
    <Panel toggleable>
      <template #header> Advanced Setting </template>
      <template #default>
        <div class="row">
          <div
            class="col col-12 col-md-6 col-xl-4 mb-1 align-items-center form-col"
          >
            <div class="p-inputgroup h-100 justify-content-between row">
              <label for="useTabs" class="align-self-center col">
                Use Tabs
              </label>
              <InputSwitch
                id="useTabs"
                v-model:model-value="useTabs"
                size="small"
                class="align-self-center"
              />
            </div>
          </div>
          <div
            class="col col-12 col-md-6 col-xl-4 mb-1 align-items-center form-col"
          >
            <div class="d-flex h-100 justify-content-between row form-col">
              <label for="tabWidth" class="align-self-center col-6">
                Tab Width
              </label>
              <div class="col-6 h-100">
                <InputNumber
                  id="tabWidth"
                  v-model:model-value="tabWidth"
                  size="small"
                  class="w-100 h-100 forminput"
                  input-class="prevent-auto-zoom"
                />
              </div>
            </div>
          </div>
          <div
            class="col col-12 col-md-6 col-xl-4 mb-1 align-items-center form-col"
          >
            <div class="d-flex h-100 justify-content-between row form-col">
              <label for="keywordCase" class="align-self-center col-6">
                Keyword
              </label>
              <div class="col-6 h-100">
                <Dropdown
                  id="keywordCase"
                  v-model:model-value="keywordCase"
                  size="small"
                  :options="keywordCaseOption"
                  option-value="value"
                  option-label="label"
                  class="w-100 h-100 forminput"
                />
              </div>
            </div>
          </div>
          <div
            class="col col-12 col-md-6 col-xl-4 mb-1 align-items-center form-col"
          >
            <div class="d-flex h-100 justify-content-between row form-col">
              <label for="indent" class="align-self-center col-6">
                Indent
              </label>
              <div class="col-6 h-100">
                <Dropdown
                  id="indent"
                  v-model:model-value="indentation"
                  size="small"
                  :options="indentOption"
                  option-value="value"
                  option-label="label"
                  class="w-100 h-100 forminput"
                />
              </div>
            </div>
          </div>
          <div
            class="col col-12 col-md-6 col-xl-4 mb-1 align-items-center form-col"
          >
            <div class="d-flex h-100 justify-content-between row form-col">
              <label for="newline" class="align-self-center col-6">
                AND/OR Newline
              </label>
              <div class="col-6 h-100">
                <Dropdown
                  id="newline"
                  v-model:model-value="logicalOperatorNewLine"
                  size="small"
                  :options="logicalOperatorNewLineOption"
                  option-value="value"
                  option-label="label"
                  class="w-100 h-100 forminput"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </Panel>
  </div>
</template>

<style lang="scss" scoped>
.form-col {
  height: 40px;
}
.forminput::v-deep(input) {
  width: 100%;
}
.forminput::v-deep(span.p-dropdown-label) {
  line-height: normal;
}
</style>
