<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import { sql } from "@codemirror/lang-sql";
import { computed, ref } from "vue";
import { SQLResult } from "@/types/SQLResult";
import { format, IndentStyle, KeywordCase, LogicalOperatorNewline } from "sql-formatter";
import ResultItem from "@/components/common/ResultItem.vue";
import Button from "primevue/button";
import SQLResultListItemSetting from "@/components/formatter/SQLResultListItemSetting.vue";
import ResultDivider from "@/components/common/ResultDivider.vue";
import { UnionFromAsConst } from "~/utils/type";

const { t: $t } = useI18n();
const { copyData } = useCopy();

const props = defineProps<{
  resultData: SQLResult;
  index: number;
}>();
const emit = defineEmits<{ (e: "delete", id: string): void }>();

const ExpandToggle = {
  FIT: "fit",
  REVERT: "revert",
} as const;

const expandToggle = ref<UnionFromAsConst<typeof ExpandToggle>>(ExpandToggle.REVERT);
const sqlResultHeight = computed(() => (expandToggle.value === ExpandToggle.FIT ? "initial" : "400px"));
const sqlResultOverflowY = computed(() => (expandToggle.value === ExpandToggle.FIT ? "initial" : "auto"));
const formattedSQL = computed(() =>
  format(props.resultData.sql, {
    language: props.resultData.language,
    useTabs: useTabs.value,
    tabWidth: tabWidth.value,
    keywordCase: keywordCase.value,
    indentStyle: indentation.value,
    logicalOperatorNewline: logicalOperatorNewLine.value,
  }),
);

const useTabs = ref(false);
const tabWidth = ref(2);
const keywordCase = ref<KeywordCase>("upper");
const indentation = ref<IndentStyle>("standard");
const logicalOperatorNewLine = ref<LogicalOperatorNewline>("before");

const onClickDeleteResult = () => {
  emit("delete", props.resultData.id);
};
const onClickExpandToggle = () => {
  if (expandToggle.value === ExpandToggle.FIT) {
    expandToggle.value = ExpandToggle.REVERT;
  } else {
    expandToggle.value = ExpandToggle.FIT;
  }
};
const onClickCopy = async () => {
  await copyData(formattedSQL.value);
};
const onChangeUseTabs = (v: boolean) => {
  useTabs.value = v;
};
const onChangeTabWidth = (v: number) => {
  tabWidth.value = v;
};
const onChangeKeywordCase = (v: KeywordCase) => {
  keywordCase.value = v;
};
const onChangeIndentation = (v: IndentStyle) => {
  indentation.value = v;
};
const onChangeLogicalOperatorNewLine = (v: LogicalOperatorNewline) => {
  logicalOperatorNewLine.value = v;
};

const expandToggleLabel = computed(() =>
  expandToggle.value === ExpandToggle.REVERT
    ? $t("formatter.sql.result_list.expand_toggle_btn_label.fit")
    : $t("formatter.sql.result_list.expand_toggle_btn_label.revert"),
);
</script>

<template>
  <ResultItem>
    <template #header>
      <div class="d-flex justify-content-between px-4 mt-4" style="height: 32px">
        <div class="d-flex align-items-center">
          <span class="fw-bold">{{ `# ${props.index}` }}</span>
        </div>
        <div>
          <Button
            severity="danger"
            class="p-0 me-1 h-100"
            icon="pi pi-trash"
            size="small"
            @click="onClickDeleteResult"
            style="width: 32px"
          />
          <Button
            severity="info"
            class="p-0 me-1 h-100"
            icon="pi pi-copy"
            size="small"
            @click="onClickCopy"
            style="width: 32px"
          />
        </div>
      </div>
    </template>
    <template #conetent>
      <SQLResultListItemSetting
        class="mb-4"
        :use-tabs="useTabs"
        @update:use-tabs="onChangeUseTabs"
        :keyword-case="keywordCase"
        @update:keyword-case="onChangeKeywordCase"
        :indentation="indentation"
        @update:indentation="onChangeIndentation"
        :logical-operator-new-line="logicalOperatorNewLine"
        @update:logical-operator-new-line="onChangeLogicalOperatorNewLine"
        :tab-width="tabWidth"
        @update:tab-width="onChangeTabWidth"
      />
      <div class="sql-result-wrap common-border-radius">
        <Codemirror :disabled="true" :extensions="[sql()]" v-model="formattedSQL" class="font-monospace-code" />
      </div>
      <ResultDivider class="mb-0">
        <Button @click="onClickExpandToggle" size="small" outlined class="py-1">
          {{ expandToggleLabel }}
        </Button>
      </ResultDivider>
    </template>
  </ResultItem>
</template>

<style lang="scss" scoped>
.sql-result-wrap {
  height: v-bind(sqlResultHeight);
  overflow-y: v-bind(sqlResultOverflowY);
  border: 1px solid #adb5bd;
}
</style>
