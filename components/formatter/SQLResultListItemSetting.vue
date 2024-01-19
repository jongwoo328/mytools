<script lang="ts" setup>
import { type PropType, ref, watch } from "vue";
import type { IndentStyle, KeywordCase, LogicalOperatorNewline } from "sql-formatter";

const { t } = useI18n();

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
const keywordCase = ref(props.keywordCase);
const indentation = ref(props.indentation);
const logicalOperatorNewLine = ref(props.logicalOperatorNewLine);

const keywordCaseOption: { label: string; value: KeywordCase }[] = [
  {
    label: t("formatter.sql.result_list.advanced_setting.keyword.options.upper"),
    value: "upper",
  },
  {
    label: t("formatter.sql.result_list.advanced_setting.keyword.options.lower"),
    value: "lower",
  },
  {
    label: t("formatter.sql.result_list.advanced_setting.keyword.options.preserve"),
    value: "preserve",
  },
];
const indentOption: { label: string; value: IndentStyle }[] = [
  {
    label: t("formatter.sql.result_list.advanced_setting.indent.options.standard"),
    value: "standard",
  },
  {
    label: t("formatter.sql.result_list.advanced_setting.indent.options.tabular_left"),
    value: "tabularLeft",
  },
];
const logicalOperatorNewLineOption: {
  label: string;
  value: LogicalOperatorNewline;
}[] = [
  {
    label: t("formatter.sql.result_list.advanced_setting.and_or_or_newline.options.before"),
    value: "before",
  },
  {
    label: t("formatter.sql.result_list.advanced_setting.and_or_or_newline.options.after"),
    value: "after",
  },
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
      <template #header>{{ t("formatter.sql.result_list.advanced_setting.header_text") }}</template>
      <template #default>
        <div class="row">
          <div class="col col-12 col-md-6 col-xl-4 mb-1 align-items-center form-col">
            <div class="p-inputgroup h-100 justify-content-between row">
              <label for="useTabs" class="align-self-center col">
                {{ t("formatter.sql.result_list.advanced_setting.use_tabs.label") }}
              </label>
              <InputSwitch id="useTabs" v-model:model-value="useTabs" size="small" class="align-self-center" />
            </div>
          </div>
          <div class="col col-12 col-md-6 col-xl-4 mb-1 align-items-center form-col">
            <div class="d-flex h-100 justify-content-between row form-col">
              <label for="tabWidth" class="align-self-center col-6">
                {{ t("formatter.sql.result_list.advanced_setting.tab_width.label") }}
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
          <div class="col col-12 col-md-6 col-xl-4 mb-1 align-items-center form-col">
            <div class="d-flex h-100 justify-content-between row form-col">
              <label for="keywordCase" class="align-self-center col-6">
                {{ t("formatter.sql.result_list.advanced_setting.keyword.label") }}
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
          <div class="col col-12 col-md-6 col-xl-4 mb-1 align-items-center form-col">
            <div class="d-flex h-100 justify-content-between row form-col">
              <label for="indent" class="align-self-center col-6">
                {{ t("formatter.sql.result_list.advanced_setting.indent.label") }}
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
          <div class="col col-12 col-md-6 col-xl-4 mb-1 align-items-center form-col">
            <div class="d-flex h-100 justify-content-between row form-col">
              <label for="newline" class="align-self-center col-6">
                {{ t("formatter.sql.result_list.advanced_setting.and_or_or_newline.label") }}
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

.forminput:deep(input) {
  width: 100%;
}

.forminput:deep(span.p-dropdown-label) {
  line-height: normal;
}
</style>
