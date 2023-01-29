<script setup lang="ts">
import { defineProps, ref } from "vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
import _ from "lodash";
import { useCopy } from "@/composables/copy";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { useJSONFormatterStore } from "@/store/JSONFormatterStore";

const selected = ref<string | null>(null);
const virtualScroll = ref(true);
const createdAt = new Date().toLocaleString();

const props = defineProps<{
  jsonObject: object;
  jsonResultId: string;
}>();

const { copyStringToClipboard } = useCopy();
const JSONFormatterStore = useJSONFormatterStore();

function getObjectFromPath(path: string) {
  return _.get(props.jsonObject, _.trimStart(path, "."));
}

async function onClickCopyAll() {
  await copyStringToClipboard(JSON.stringify(props.jsonObject, null, 4));
}

async function onClickSelectedNode() {
  await copyStringToClipboard(
    JSON.stringify(getObjectFromPath(selected.value as string), null, 4)
  );
}

function onClickResetSelect() {
  selected.value = null;
}

function onClickExpandToggle() {
  virtualScroll.value = !virtualScroll.value;
}

function onClickDeleteResult() {
  JSONFormatterStore.deleteJsonFormatResult(props.jsonResultId);
}
</script>

<template>
  <ACard class="pt-5 mb-2">
    <ATypographyText class="position-absolute" style="left: 24px; top: 24px">{{
      createdAt
    }}</ATypographyText>
    <VueJsonPretty
      :data="props.jsonObject"
      :virtual="virtualScroll"
      selectableType="single"
      :showSelectController="true"
      :showIcon="true"
      v-model:selectedValue="selected"
      rootPath=""
    ></VueJsonPretty>
    <ADivider class="mb-0">
      <AButton @click="onClickExpandToggle" shape="round">
        {{ virtualScroll ? "Expand" : "Collapse" }}
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
        class="me-1"
        >Reset Select</AButton
      >
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
