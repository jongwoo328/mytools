<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import { sql } from "@codemirror/lang-sql";
import { computed, defineEmits, defineProps, Ref, ref } from "vue";
import { SQLResult } from "@/types/SQLResult";
import {
  format,
  IndentStyle,
  KeywordCase,
  LogicalOperatorNewline,
} from "sql-formatter";
import { copyWithNotification } from "@/utils/copy";
import ResultItem from "@/components/common/ResultItem.vue";
import Button from "primevue/button";
import SQLResultListItemSetting from "@/components/formatter/SQLResultListItemSetting.vue";
import ResultDivider from "@/components/common/ResultDivider.vue";

const props = defineProps<{
  resultData: SQLResult;
  index: number;
}>();
const emit = defineEmits<{ (e: "delete", id: string): void }>();

const expandToggle: Ref<"fit" | "revert"> = ref("revert");
const sqlResultHeight = computed(() =>
  expandToggle.value === "fit" ? "initial" : "400px"
);
const sqlResultOverflowY = computed(() =>
  expandToggle.value === "fit" ? "initial" : "auto"
);
const formattedSQL = computed(() =>
  format(props.resultData.sql, {
    language: props.resultData.language,
    useTabs: useTabs.value,
    tabWidth: tabWidth.value,
    keywordCase: keywordCase.value,
    indentStyle: indentation.value,
    logicalOperatorNewline: logicalOperatorNewLine.value,
  })
);

const useTabs = ref(false);
const tabWidth = ref(2);
const keywordCase: Ref<KeywordCase> = ref("upper");
const indentation: Ref<IndentStyle> = ref("standard");
const logicalOperatorNewLine: Ref<LogicalOperatorNewline> = ref("before");

const onClickDeleteResult = () => {
  emit("delete", props.resultData.id);
};
const onClickExpandToggle = () => {
  if (expandToggle.value === "fit") {
    expandToggle.value = "revert";
  } else {
    expandToggle.value = "fit";
  }
};
const onClickCopy = async () => {
  await copyWithNotification(formattedSQL.value);
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

const expaneToggleLabel = computed(() =>
  expandToggle.value === "revert" ? "Fit" : "Revert"
);
</script>

<template>
  <ResultItem>
    <template #header>
      <div
        class="d-flex justify-content-between px-4 mt-4"
        style="height: 32px"
      >
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
        <Codemirror
          :disabled="true"
          :extensions="[sql()]"
          v-model="formattedSQL"
          class="sql-result"
        />
      </div>
      <ResultDivider class="mb-0">
        <Button @click="onClickExpandToggle" size="small" outlined class="py-1">
          {{ expaneToggleLabel }}
        </Button>
      </ResultDivider>
    </template>
  </ResultItem>
</template>

<style lang="scss" scoped>
.sql-result {
  &::v-deep(.cm-line) {
    font-family: Monaco, Menlo, Consolas, Bitstream Vera Sans Mono, monospace;
  }
}

.sql-result-wrap {
  height: v-bind(sqlResultHeight);
  overflow-y: v-bind(sqlResultOverflowY);
  border: 1px solid #adb5bd;
}
</style>
