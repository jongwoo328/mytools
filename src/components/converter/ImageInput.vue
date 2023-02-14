<script lang="ts" setup>
import { computed, defineEmits, defineProps, Ref, ref } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { UploadChangeParam } from "ant-design-vue";

const props = defineProps<{ file: File }>();
const emit = defineEmits<{ (e: "update:file", file: File): void }>();

const file: Ref<File | null> = ref(props.file);
const image = ref<HTMLImageElement>();
const isUploaded = computed(() => !!file.value);
const onChange = (info: UploadChangeParam<File>) => {
  if (!info.file) {
    return;
  }
  file.value = info.file;
  emit("update:file", info.file);

  const reader = new FileReader();
  reader.onload = (e: ProgressEvent<FileReader>) => {
    if (image.value && e.target && e.target.result) {
      image.value.src = e.target.result as string;
    }
  };

  reader.readAsDataURL(file.value);
};
</script>

<template>
  <AUpload
    accept="image/*"
    list-type="picture-card"
    class="w-100 position-relative upload"
    :show-upload-list="false"
    style="padding: 2px"
    :before-upload="() => false"
    @change="onChange"
  >
    <img
      alt="uploaded image"
      ref="image"
      src="#"
      class="w-100 h-100"
      v-show="isUploaded"
      style="object-fit: contain"
    />
    <div v-if="!isUploaded">
      <plus-outlined></plus-outlined>
      <div class="ant-upload-text">Upload</div>
    </div>
  </AUpload>
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
