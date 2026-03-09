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
        <div class="grid grid-cols-12 gap-x-6">
          <div class="form-col col-span-full mb-1 items-center md:col-span-6 xl:col-span-4">
            <div class="flex h-full justify-between">
              <label for="useTabs" class="self-center">
                {{ t("formatter.sql.result_list.advanced_setting.use_tabs.label") }}
              </label>
              <ToggleSwitch id="useTabs" v-model:model-value="useTabs" class="self-center" />
            </div>
          </div>
          <div class="form-col col-span-full mb-1 items-center md:col-span-6 xl:col-span-4">
            <div class="form-col flex h-full justify-between">
              <label for="tabWidth" class="w-1/2 self-center">
                {{ t("formatter.sql.result_list.advanced_setting.tab_width.label") }}
              </label>
              <div class="h-full w-1/2">
                <InputNumber
                  id="tabWidth"
                  v-model:model-value="tabWidth"
                  size="small"
                  class="forminput h-full w-full"
                  input-class="prevent-auto-zoom"
                />
              </div>
            </div>
          </div>
          <div class="form-col col-span-full mb-1 items-center md:col-span-6 xl:col-span-4">
            <div class="form-col flex h-full justify-between">
              <label for="keywordCase" class="w-1/2 self-center">
                {{ t("formatter.sql.result_list.advanced_setting.keyword.label") }}
              </label>
              <div class="h-full w-1/2">
                <Select
                  id="keywordCase"
                  v-model:model-value="keywordCase"
                  size="small"
                  :options="keywordCaseOption"
                  option-value="value"
                  option-label="label"
                  class="forminput h-full w-full"
                />
              </div>
            </div>
          </div>
          <div class="form-col col-span-full mb-1 items-center md:col-span-6 xl:col-span-4">
            <div class="form-col flex h-full justify-between">
              <label for="indent" class="w-1/2 self-center">
                {{ t("formatter.sql.result_list.advanced_setting.indent.label") }}
              </label>
              <div class="h-full w-1/2">
                <Select
                  id="indent"
                  v-model:model-value="indentation"
                  size="small"
                  :options="indentOption"
                  option-value="value"
                  option-label="label"
                  class="forminput h-full w-full"
                />
              </div>
            </div>
          </div>
          <div class="form-col col-span-full mb-1 items-center md:col-span-6 xl:col-span-4">
            <div class="form-col flex h-full justify-between">
              <label for="newline" class="w-1/2 self-center">
                {{ t("formatter.sql.result_list.advanced_setting.and_or_or_newline.label") }}
              </label>
              <div class="h-full w-1/2">
                <Select
                  id="newline"
                  v-model:model-value="logicalOperatorNewLine"
                  size="small"
                  :options="logicalOperatorNewLineOption"
                  option-value="value"
                  option-label="label"
                  class="forminput h-full w-full"
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

.forminput:deep(span.p-select-label) {
  line-height: normal;
}
</style>
