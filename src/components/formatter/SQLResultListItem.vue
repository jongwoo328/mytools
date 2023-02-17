<script setup lang="ts">
import { computed, defineEmits, defineProps, Ref, ref } from "vue";
import { SQLResult } from "@/types/SQLResult";
import {
  format,
  IndentStyle,
  KeywordCase,
  LogicalOperatorNewline,
} from "sql-formatter";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { useClipboard } from "@vueuse/core";

const { copy } = useClipboard({ legacy: true });

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
const onClickCopy = () => {
  copy(formattedSQL.value);
};
</script>

<template>
  <ACard
    data-aos="fade-up"
    data-aos-once="true"
    data-aos-anchor-placement="bottom"
    class="pt-5 mb-2"
  >
    <ATypographyText
      :strong="true"
      class="position-absolute"
      style="left: 24px; top: 28px"
      >{{ `# ${index}` }}</ATypographyText
    >
    <ACollapse style="background-color: #f1f3f5" :ghost="true" class="mb-2">
      <ACollapsePanel header="Advanced Setting">
        <ARow :gutter="10">
          <ACol :span="12" :md="8">
            <ARow>
              <ACol :span="12" :md="8">
                <label for="useTabs">Use Tabs</label>
              </ACol>
              <ACol
                class="d-flex flex-grow-1 justify-content-start align-items-center"
              >
                <ASwitch id="useTabs" size="small" v-model:checked="useTabs" />
              </ACol>
            </ARow>
          </ACol>
          <ACol :span="12" :md="8">
            <ARow justify="space-between">
              <ACol :span="12" :md="8">
                <label for="tabWidth">Tab Width</label>
              </ACol>
              <ACol
                class="d-flex flex-grow-1 justify-content-start align-items-center"
              >
                <AInputNumber
                  :disabled="useTabs"
                  v-model:value="tabWidth"
                  id="tabWidth"
                  size="small"
                  :min="0"
                  :max="4"
                ></AInputNumber>
              </ACol>
            </ARow>
          </ACol>
          <ACol :span="12" :md="8">
            <ARow>
              <ACol :span="12" :md="8">
                <label for="case">Keyword Case</label>
              </ACol>
              <ACol
                class="d-flex flex-grow-1 justify-content-start align-items-center"
              >
                <ASelect
                  :dropdown-match-select-width="100"
                  size="small"
                  v-model:value="keywordCase"
                >
                  <ASelectOption value="preserve">Preserve</ASelectOption>
                  <ASelectOption value="upper">Upper</ASelectOption>
                  <ASelectOption value="lower">Lower</ASelectOption>
                </ASelect>
              </ACol>
            </ARow>
          </ACol>
          <ACol :span="12" :md="8">
            <ARow>
              <ACol :span="12" :md="8">
                <label for="case">Indent</label>
              </ACol>
              <ACol
                class="d-flex flex-grow-1 justify-content-start align-items-center"
              >
                <ASelect
                  :dropdown-match-select-width="100"
                  size="small"
                  v-model:value="indentation"
                >
                  <ASelectOption value="standard">Standard</ASelectOption>
                  <ASelectOption value="tabularLeft"
                    >Tabular,Left</ASelectOption
                  >
                </ASelect>
              </ACol>
            </ARow>
          </ACol>
          <ACol :span="12" :md="8">
            <ARow>
              <ACol :span="12" :md="8">
                <label for="case">AND/OR Newline</label>
              </ACol>
              <ACol
                class="d-flex flex-grow-1 justify-content-start align-items-center"
              >
                <ASelect
                  size="small"
                  v-model:value="logicalOperatorNewLine"
                  style="width: 90px"
                >
                  <ASelectOption value="before">Before</ASelectOption>
                  <ASelectOption value="after">After</ASelectOption>
                </ASelect>
              </ACol>
            </ARow>
          </ACol>
        </ARow>
      </ACollapsePanel>
    </ACollapse>
    <div class="sql-result-wrap">
      <Codemirror v-model="formattedSQL" class="sql-result" />
    </div>
    <ADivider class="mb-0">
      <AButton @click="onClickExpandToggle" shape="round">
        {{ expandToggle === "revert" ? "Fit" : "Revert" }}
      </AButton>
    </ADivider>
    <div
      class="position-absolute d-flex align-items-center"
      style="top: 24px; right: 24px"
    >
      <AButton
        danger
        type="primary"
        class="me-1 px-2"
        @click="onClickDeleteResult"
      >
        <div class="d-flex align-items-center">
          <DeleteOutlined />
        </div>
      </AButton>
      <AButton class="me-1" @click="onClickCopy">Copy</AButton>
    </div>
  </ACard>
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
