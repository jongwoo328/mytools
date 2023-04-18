<script lang="ts" setup>
import { computed, defineEmits, defineProps, Ref, ref } from "vue";
import FileUpload, { FileUploadSelectEvent } from "primevue/fileupload";
import { breakpointsBootstrapV5, useBreakpoints } from "@vueuse/core";

const props = defineProps<{ file: File }>();
const emit = defineEmits<{ (e: "update:file", file: File): void }>();

const file: Ref<File | null> = ref(props.file);
const image = ref<HTMLImageElement>();
const isUploaded = computed(() => !!file.value);
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
    if (image.value && e.target && e.target.result) {
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
    file.value = null;
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
      class="upload w-100 position-relative mb-2"
      @select="onSelect"
      @clear="onClear"
    >
    </FileUpload>
    <img
      alt="uploaded image"
      ref="image"
      src="#"
      class="w-100 h-100"
      v-show="isUploaded"
      style="object-fit: contain"
    />
  </div>
</template>

<style lang="scss" scoped>
.upload {
  &::v-deep(div.ant-upload:first-of-type) {
    width: 100%;
    height: 0;
    padding-top: 100%;
    box-sizing: content-box;
  }

  &::v-deep(span.ant-upload:first-of-type) {
    position: absolute;
    top: 0;
  }

  &::v-deep(div.ant-upload-select) {
    display: block;
    margin: 0;
  }

  &::v-deep(div.ant-upload-select > span) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
