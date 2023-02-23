<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import {
  DeleteOutlined,
  DownOutlined,
  ReloadOutlined,
} from "@ant-design/icons-vue";
import _ from "lodash";
import VueJsonPretty from "vue-json-pretty";
import { useClipboard } from "@vueuse/core";
import { JSONResult } from "@/types/JSONResult";
import { notification } from "ant-design-vue";

const emit = defineEmits<{ (e: "delete", id: string): void }>();
const props = defineProps<{
  resultData: JSONResult;
  index: number;
}>();
enum ActionType {
  COPY_ALL = "COPY_ALL",
  COPY_PATH = "COPY_PATH",
  COPY_NODE = "COPY_NODE",
}

const selected = ref<string | null>(null);
const virtualScroll = ref(true);

const { copy } = useClipboard({ legacy: true });

const getObjectFromPath = (path: string) => {
  return _.get(props.resultData.result, _.trimStart(path, "$."));
};
const onClickCopyAll = async () => {
  try {
    await copy(JSON.stringify(props.resultData.result, null, 4));
    notification.success({
      message: "Copied!",
      duration: 2.5,
    });
  } catch {
    notification.error({
      message: "Failed",
      duration: 2.5,
    });
  }
};
const onClickSelectedNode = async () => {
  try {
    await copy(
      JSON.stringify(getObjectFromPath(selected.value as string), null, 4)
    );
    notification.success({
      message: "Copied!",
      duration: 2.5,
    });
  } catch {
    notification.error({
      message: "Failed",
      duration: 2.5,
    });
  }
};
const onClickCopyPath = async () => {
  if (selected.value) {
    try {
      await copy(selected.value);
      notification.success({
        message: "Copied!",
        duration: 2.5,
      });
    } catch {
      notification.error({
        message: "Failed",
        duration: 2.5,
      });
    }
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
const handleMenuClick = (a) => {
  console.log(a);
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
      class="d-none d-md-flex align-items-center position-absolute button-container"
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
    <div class="d-flex d-md-none position-absolute button-container">
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
      <ADropdown>
        <template #overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item @click="onClickCopyAll" :key="ActionType.COPY_ALL">
              Copy All
            </a-menu-item>
            <a-menu-item
              :disabled="_.isNull(selected)"
              :key="ActionType.COPY_NODE"
              @click="onClickSelectedNode"
            >
              Copy Selected Node
            </a-menu-item>
            <a-menu-item
              :disabled="_.isNull(selected)"
              :key="ActionType.COPY_PATH"
              @click="onClickCopyPath"
            >
              Copy Path
            </a-menu-item>
          </a-menu>
        </template>
        <a-button>
          Actions
          <DownOutlined />
        </a-button>
      </ADropdown>
    </div>
  </ACard>
</template>

<style lang="scss" scoped>
.button-container {
  top: 24px;
  right: 24px;
}
</style>
