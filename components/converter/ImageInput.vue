<script lang="ts" setup>
import { computed, type Ref, ref } from "vue";
import type { FileUploadSelectEvent } from "primevue/fileupload";
import { breakpointsBootstrapV5 } from "@vueuse/core";
import { createEmptyImageElement } from "~/utils/HTMLImage";

const { t } = useI18n();
const props = defineProps<{ file: File }>();
const emit = defineEmits<{ (e: "update:file", file: File): void }>();

const file: Ref<File> = ref(props.file);
const image = ref<HTMLImageElement>(createEmptyImageElement());
const isUploaded = computed(() => !isEmptyFile(file.value));
const breakpoints = useBreakpoints(breakpointsBootstrapV5);
const isMobileOrTablet = breakpoints.smaller("lg");

const onSelect = (event: FileUploadSelectEvent) => {
  const inputFile = event.files[0];
  if (!inputFile) {
    return;
  }

  file.value = inputFile;
  emit("update:file", inputFile);

  const reader = new FileReader();
  reader.onload = (e: ProgressEvent<FileReader>) => {
    if (e.target && e.target.result) {
      image.value.src = e.target.result as string;
    }
  };

  // change file to blob
  const blob = new Blob([inputFile], { type: inputFile.type });
  reader.readAsDataURL(blob);
};

const onClear = () => {
  if (image.value) {
    image.value.src = "#";
    file.value = createEmptyFile();
  }
};

const fileInputMinHeight = computed(() => {
  if (isMobileOrTablet.value) {
    return "300px";
  } else {
    return "500px";
  }
});
const imageUploadBackground = computed(() => {
  if (isUploaded.value) {
    return "transparent";
  } else {
    return "#f0f2f5";
  }
});
</script>

<template>
  <div
    class="d-flex flex-column justify-content-center w-100 common-border-radius"
    :class="{ 'align-items-center': !isUploaded }"
    :style="`min-height: ${fileInputMinHeight}; background-color: ${imageUploadBackground}`"
  >
    <FileUpload
      :show-upload-button="false"
      :show-cancel-button="false"
      :multiple="false"
      accept="image/*"
      mode="basic"
      custom-upload
      class="upload w-100 position-relative mb-2"
      @select="onSelect"
      @clear="onClear"
      :choose-label="t('converter.image.image_input_btn_label')"
    >
    </FileUpload>
    <img alt="uploaded image" ref="image" src="#" class="w-100 h-100" v-show="isUploaded" style="object-fit: contain" />
  </div>
</template>

<style lang="scss" scoped>
.upload {
  &:deep(div.ant-upload:first-of-type) {
    width: 100%;
    height: 0;
    padding-top: 100%;
    box-sizing: content-box;
  }

  &:deep(span.ant-upload:first-of-type) {
    position: absolute;
    top: 0;
  }

  &:deep(div.ant-upload-select) {
    display: block;
    margin: 0;
  }

  &:deep(div.ant-upload-select > span) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
