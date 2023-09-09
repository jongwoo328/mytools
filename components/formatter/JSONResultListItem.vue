<script setup lang="ts">
import { ref } from "vue";
import { JSONResult } from "@/types/JSONResult";
import { copyWithNotification } from "@/utils/copy";
import { MenuItem } from "primevue/menuitem";
import { breakpointsBootstrapV5, useBreakpoints } from "@vueuse/core";
import ResultDivider from "@/components/common/ResultDivider.vue";
import ResultItem from "@/components/common/ResultItem.vue";
import { parseJsonPathToKeyArray } from "@/utils/json";

const emit = defineEmits<{ (e: "delete", id: string): void }>();
const props = defineProps<{
  resultData: JSONResult;
  index: number;
}>();

const breakpoints = useBreakpoints(breakpointsBootstrapV5);
const isMobileOrTablet = breakpoints.smaller("md");

const selected = ref("");
const isSelectedEmpty = computed(() => selected.value.length === 0);

const virtualScroll = ref(true);

const getObjectFromPath = (path: string) => {
  return useLodashGet(props.resultData.result, useLodashTrimStart(path, "$."));
};
const onClickCopyAll = async () => {
  await copyWithNotification(stringifyResult());
};
const onClickSelectedNode = async () => {
  await copyWithNotification(JSON.stringify(getObjectFromPath(selected.value as string), null, 4));
};
const onClickCopyKey = async () => {
  const lastKey =
    parseJsonPathToKeyArray(selected.value)
      .filter((key) => key !== "$")
      .at(-1) ?? "";
  await copyWithNotification(lastKey);
};
const onClickCopyPath = async () => {
  if (selected.value) {
    await copyWithNotification(selected.value);
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
  return JSON.stringify(props.resultData.result, null, 4);
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
    label: "Copy Path",
    icon: "pi pi-copy",
    command: onClickCopyPath,
    style: {
      fontSize: "16px",
    },
    disabled: () => isSelectedEmpty.value,
  },
  {
    label: "Copy Key",
    icon: "pi pi-copy",
    command: onClickCopyKey,
    class: "click-action",
    disabled: () => isSelectedEmpty.value,
  },
  {
    label: "Copy Node",
    icon: "pi pi-copy",
    command: onClickSelectedNode,
    class: "click-action",
    disabled: () => isSelectedEmpty.value,
  },
  {
    label: "Download",
    icon: "pi pi-download",
    command: download,
    class: "click-action",
  },
];
</script>

<template>
  <ResultItem>
    <template #header>
      <div class="d-flex justify-content-between px-4 mt-4" style="height: 32px">
        <span class="fw-bold">
          {{ `# ${index}` }}
        </span>
        <div class="d-flex">
          <Button
            severity="danger"
            class="p-0 me-1"
            icon="pi pi-trash"
            size="small"
            @click="onClickDeleteResult"
            style="width: 32px"
          />
          <Button
            severity="secondary"
            icon="pi pi-refresh"
            class="p-0 me-1"
            size="small"
            @click="onClickResetSelect"
            :disabled="useLodashIsNull(selected)"
            style="width: 32px"
          />
          <SplitButton
            v-show="isMobileOrTablet"
            outlined
            label="Copy All"
            severity="info"
            size="small"
            icon="pi pi-copy"
            :model="clickActions"
            class="click-actions"
            @click="onClickCopyAll"
            :menu-button-props="{ class: 'click-action-button' }"
            plain
          />
          <div v-show="!isMobileOrTablet" class="h-100">
            <Button
              outlined
              label="Copy All"
              size="small"
              icon="pi pi-copy"
              @click="onClickCopyAll"
              class="py-1 px-2 me-1 h-100"
            />
            <Button
              outlined
              label="Copy Path"
              size="small"
              icon="pi pi-copy"
              @click="onClickCopyPath"
              class="py-1 px-2 h-100 me-1"
              :disabled="isSelectedEmpty"
            />
            <Button
              outlined
              label="Copy Key"
              size="small"
              icon="pi pi-copy"
              @click="onClickCopyKey"
              class="py-1 px-2 h-100 me-1"
              :disabled="isSelectedEmpty"
            />
            <Button
              outlined
              label="Copy Node"
              size="small"
              icon="pi pi-copy"
              @click="onClickSelectedNode"
              class="py-1 px-2 h-100 me-1"
              :disabled="isSelectedEmpty"
            />
            <Button
              outlined
              label="Download"
              size="small"
              icon="pi pi-download"
              @click="download"
              class="py-1 px-2 h-100"
            />
          </div>
        </div>
      </div>
    </template>
    <template #conetent>
      <VueJsonPretty
        :data="resultData.result"
        :virtual="virtualScroll"
        selectableType="single"
        :showSelectController="true"
        :showIcon="true"
        v-model:selectedValue="selected"
        rootPath="$"
        class="font-monospace-code"
      />
      <ResultDivider class="mb-0">
        <Button @click="onClickExpandToggle" size="small" outlined class="py-1">
          {{ virtualScroll ? "Fit" : "Revert" }}
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
</style>
