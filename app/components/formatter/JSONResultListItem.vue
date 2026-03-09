<script setup lang="ts">
import { ref } from "vue";
import type { MenuItem } from "primevue/menuitem";
import { breakpointsBootstrapV5, useBreakpoints } from "@vueuse/core";
import ResultDivider from "~/components/common/ResultDivider.vue";
import ResultItem from "~/components/common/ResultItem.vue";
import { parseJsonPathToKeyArray } from "~/utils/json";
import jp from "jsonpath";
import type { JSONResult } from "~~/types/JSONResult";

const { t } = useI18n();
const { copyData } = useCopy();
const colorMode = useColorMode();

const emit = defineEmits<{ (e: "delete", id: string): void }>();
const props = defineProps<{
  resultData: JSONResult;
  index: number;
}>();

const breakpoints = useBreakpoints(breakpointsBootstrapV5);
const isMobileOrTablet = breakpoints.smaller("md");

const selected = ref("");
const isSelectedEmpty = computed(() => selected.value.length === 0);
const isFormatTypeMinified = computed(() => formatType.value === "minified");

const virtualScroll = ref(true);

type FormatType = "formatted" | "minified";
const formatType = ref<FormatType>("formatted");
const formatTypeOptions = [
  {
    label: t("formatter.json.result_list.format_type_options.formatted"),
    value: "formatted",
  },
  {
    label: t("formatter.json.result_list.format_type_options.minified"),
    value: "minified",
  },
];
const minifiedResult = ref(JSON.stringify(props.resultData.result));

const onClickCopyAll = async () => {
  await copyData(stringifyResult());
};
const onClickSelectedNode = async () => {
  if (isJSONObject(props.resultData.result) || isJSONArray(props.resultData.result)) {
    console.log(props.resultData.result, selected.value);
    console.log(jp.query(props.resultData.result, selected.value));
    await copyData(JSON.stringify(jp.query(props.resultData.result, selected.value)[0], null, 4));
  } else {
    await copyData(JSON.stringify(props.resultData.result, null, 4));
  }
};
const onClickCopyKey = async () => {
  const lastKey =
    parseJsonPathToKeyArray(selected.value)
      .filter((key) => key !== "$")
      .at(-1) ?? "";
  await copyData(lastKey);
};
const onClickCopyPath = async () => {
  if (selected.value) {
    await copyData(selected.value);
  }
};

const onClickResetSelect = () => {
  selected.value = "";
};
const onClickExpandToggle = () => {
  virtualScroll.value = !virtualScroll.value;
};
const onClickDeleteResult = () => {
  emit("delete", props.resultData.id);
};

const stringifyResult = () => {
  return JSON.stringify(props.resultData.result, null, formatType.value === "formatted" ? 4 : 0);
};

const download = () => {
  const a = document.createElement("a");
  const blob = new Blob([stringifyResult()], { type: "application/json" });
  a.download = `${props.resultData.id}.json`;
  a.href = URL.createObjectURL(blob);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const clickActions: MenuItem[] = [
  {
    label: t("formatter.json.result_list.actions.copy_path"),
    icon: "pi pi-copy",
    command: onClickCopyPath,
    style: {
      fontSize: "16px",
    },
    disabled: () => isSelectedEmpty.value,
  },
  {
    label: t("formatter.json.result_list.actions.copy_key"),
    icon: "pi pi-copy",
    command: onClickCopyKey,
    class: "click-action",
    disabled: () => isSelectedEmpty.value,
  },
  {
    label: t("formatter.json.result_list.actions.copy_node"),
    icon: "pi pi-copy",
    command: onClickSelectedNode,
    class: "click-action",
    disabled: () => isSelectedEmpty.value,
  },
  {
    label: t("formatter.json.result_list.actions.download"),
    icon: "pi pi-download",
    command: download,
    class: "click-action",
  },
];
</script>

<template>
  <ResultItem>
    <template #header>
      <div style="height: 64px" class="flex items-center justify-between px-4 pt-4 pb-2">
        <span class="block font-bold">
          {{ `# ${index}` }}
        </span>
        <Select
          option-label="label"
          option-value="value"
          :options="formatTypeOptions"
          size="small"
          class="format-type-select p-0"
          v-model="formatType"
          :model="formatTypeOptions"
        />
      </div>
      <div class="flex justify-end px-4" style="height: 32px">
        <div class="flex gap-1">
          <Button
            severity="danger"
            class="p-0"
            icon="pi pi-trash"
            size="small"
            @click="onClickDeleteResult"
            style="width: 32px"
          />
          <Button
            severity="secondary"
            icon="pi pi-refresh"
            class="p-0"
            size="small"
            @click="onClickResetSelect"
            :disabled="isSelectedEmpty"
            style="width: 32px"
          />
          <SplitButton
            v-show="isMobileOrTablet"
            outlined
            :label="t('formatter.json.result_list.actions.copy_all')"
            size="small"
            icon="pi pi-copy"
            :model="clickActions"
            class="click-actions"
            @click="onClickCopyAll"
            :menu-button-props="{ class: 'click-action-button' }"
            plain
          />
          <div v-show="!isMobileOrTablet" class="h-full">
            <Button
              outlined
              :label="t('formatter.json.result_list.actions.copy_all')"
              size="small"
              icon="pi pi-copy"
              @click="onClickCopyAll"
              class="mr-1 h-full px-2 py-1"
            />
            <Button
              outlined
              :label="t('formatter.json.result_list.actions.copy_path')"
              size="small"
              icon="pi pi-copy"
              @click="onClickCopyPath"
              class="mr-1 h-full px-2 py-1"
              :disabled="isSelectedEmpty || isFormatTypeMinified"
            />
            <Button
              outlined
              :label="t('formatter.json.result_list.actions.copy_key')"
              size="small"
              icon="pi pi-copy"
              @click="onClickCopyKey"
              class="mr-1 h-full px-2 py-1"
              :disabled="isSelectedEmpty || isFormatTypeMinified"
            />
            <Button
              outlined
              :label="t('formatter.json.result_list.actions.copy_node')"
              size="small"
              icon="pi pi-copy"
              @click="onClickSelectedNode"
              class="mr-1 h-full px-2 py-1"
              :disabled="isSelectedEmpty || isFormatTypeMinified"
            />
            <Button
              outlined
              :label="t('formatter.json.result_list.actions.download')"
              size="small"
              icon="pi pi-download"
              @click="download"
              class="h-full px-2 py-1"
            />
          </div>
        </div>
      </div>
    </template>
    <template #conetent>
      <div v-if="formatType === 'formatted'">
        <VueJsonPretty
          :theme="colorMode.value"
          :data="resultData.result"
          :virtual="virtualScroll"
          selectableType="single"
          :showSelectController="true"
          :showIcon="true"
          v-model:selectedValue="selected"
          rootPath="$"
          class="font-monospace-code"
        />
        <ResultDivider class="mb-0" color="var(--p-content-background)">
          <Button @click="onClickExpandToggle" size="small" outlined class="py-1">
            {{
              virtualScroll
                ? t("formatter.json.result_list.expand_toggle_btn_label.fit")
                : t("formatter.json.result_list.expand_toggle_btn_label.revert")
            }}
          </Button>
        </ResultDivider>
      </div>
      <div v-else-if="formatType === 'minified'">
        <Textarea
          auto-resize
          v-model="minifiedResult"
          disabled
          style="min-height: 400px; max-height: 650px"
          class="prevent-auto-zoom font-monospace-code block w-full overflow-y-scroll text-black"
        />
      </div>
    </template>
  </ResultItem>
</template>

<style lang="scss" scoped>
.sql-result {
  &:deep(.cm-line) {
    font-family:
      Monaco,
      Menlo,
      Consolas,
      Bitstream Vera Sans Mono,
      monospace;
  }
}

.format-type-select {
  &:deep(.p-select-label) {
    line-height: 1;
  }
}
</style>
