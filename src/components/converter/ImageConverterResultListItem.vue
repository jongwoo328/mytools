<script lang="ts" setup>
import { defineEmits, defineProps, ref } from "vue";
import { ImageConverterResult } from "@/types/ImageConverterResult";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons-vue";

const props = defineProps<{ result: ImageConverterResult; index: number }>();
const emit = defineEmits<{ (e: "delete", id: string): void }>();

const discreteFileNameWithNameAndType = (
  fileName: string
): [string, string] => {
  const index = fileName.lastIndexOf(".");
  return [fileName.substring(0, index), fileName.substring(index)];
};
const downloadFileName = ref("");
const downloadFileNamePlaceholder = ref(
  discreteFileNameWithNameAndType(props.result.originalName)[0]
);
const onClickDownload = () => {
  const a = document.createElement("a");
  const type = props.result.type.split("/").at(-1);
  if (downloadFileName.value) {
    a.download = `${downloadFileName.value}.${type}`;
  } else {
    a.download = `${downloadFileNamePlaceholder.value}.${type}`;
  }
  a.href = props.result.objectURL;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const onClickDeleteResult = () => {
  emit("delete", props.result.id);
};
</script>

<template>
  <ACard class="pt-5 mb-2">
    <ATypographyText
      :strong="true"
      class="position-absolute"
      style="left: 24px; top: 28px"
      >{{ `# ${index}` }}</ATypographyText
    >
    <ARow class="image-result-item">
      <ACol class="h-100 px-3" :span="24" :lg="16">
        <div
          class="image-result-display w-100 h-100 d-flex justify-content-center align-items-center"
        >
          <img
            loading="lazy"
            style="object-fit: contain"
            :src="result.objectURL"
            alt=""
          />
        </div>
      </ACol>
      <ACol :span="24" :lg="8" class="py-3 py-lg-0 image-result-control">
        <div class="d-flex flex-column justify-content-start" style="flex: 1">
          <ATypographyTitle :level="5">Download</ATypographyTitle>
          <div class="d-flex">
            <AInput
              v-model:value="downloadFileName"
              :placeholder="downloadFileNamePlaceholder"
            />
            <ATypographyText style="font-size: 1.2rem; padding-left: 10px">{{
              "." + props.result.type.split("/").at(-1)
            }}</ATypographyText>
          </div>
        </div>
        <AButton
          type="primary"
          class="d-flex align-items-center justify-content-center mt-3 mt-lg-0"
          @click="onClickDownload"
        >
          <download-outlined /> Download</AButton
        >
      </ACol>
    </ARow>
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
    </div>
  </ACard>
</template>

<style lang="scss" scoped>
.image-result-item {
  max-height: 600px;
}

.image-result-display {
  max-height: 400px;
  & img {
    max-height: 300px;
  }
}

.skeleton-image {
  height: 300px;
}

.image-result-control {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > button {
    min-height: 48px;
  }
}

@media (max-width: 768px) {
  .image-result-display {
    & img {
      max-height: 260px;
    }
  }

  .skeleton-image {
    height: 260px;
  }

  .image-result-control {
    display: flex;
    justify-content: space-between;
    & > div {
      width: 70%;
    }
    & > button {
      height: 20%;
    }
  }
}
</style>
