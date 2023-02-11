<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons-vue";
import _ from "lodash";
import VueJsonPretty from "vue-json-pretty";
import { useClipboard } from "@vueuse/core";
import { JSONResult } from "@/types/JSONResult";

const selected = ref<string | null>(null);
const virtualScroll = ref(true);
const createdAt = new Date().toLocaleString();

const emit = defineEmits<{ (e: "delete", id: string): void }>();
const props = defineProps<{
  resultData: JSONResult;
}>();

const { copy } = useClipboard({ legacy: true });

const getObjectFromPath = (path: string) => {
  return _.get(props.resultData.result, _.trimStart(path, "$."));
};
const onClickCopyAll = async () => {
  await copy(JSON.stringify(props.resultData.result, null, 4));
};
const onClickSelectedNode = async () => {
  await copy(
    JSON.stringify(getObjectFromPath(selected.value as string), null, 4)
  );
};
const onClickCopyPath = async () => {
  if (selected.value) {
    await copy(selected.value);
  }
};

const onClickResetSelect = () => {
  selected.value = null;
};
const onClickExpandToggle = () => {
  virtualScroll.value = !virtualScroll.value;
};
const onClickDeleteResult = () => {
  emit("delete", props.resultData.id);
};
</script>

<template>
  <ACard class="pt-5 mb-2">
    <ATypographyText class="position-absolute" style="left: 24px; top: 24px">{{
      createdAt
    }}</ATypographyText>
    <VueJsonPretty
      :data="resultData.result"
      :virtual="virtualScroll"
      selectableType="single"
      :showSelectController="true"
      :showIcon="true"
      v-model:selectedValue="selected"
      rootPath="$"
    ></VueJsonPretty>
    <ADivider class="mb-0">
      <AButton @click="onClickExpandToggle" shape="round">
        {{ virtualScroll ? "Fit" : "Revert" }}
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
      <AButton
        @click="onClickResetSelect"
        :disabled="_.isNull(selected)"
        class="me-1 px-2"
      >
        <div class="d-flex align-items-center">
          <ReloadOutlined />
        </div>
      </AButton>
      <AButton
        class="me-1"
        :disabled="_.isNull(selected)"
        @click="onClickCopyPath"
      >
        Copy Path
      </AButton>
      <AButton
        class="me-1"
        :disabled="_.isNull(selected)"
        @click="onClickSelectedNode"
        >Copy Selected Node</AButton
      >
      <AButton @click="onClickCopyAll">Copy All</AButton>
    </div>
  </ACard>
</template>