<script lang="ts" setup>
import ImageInput from "@/components/converter/ImageInput.vue";
import { computed, Ref, ref, watch } from "vue";
import { SelectProps } from "ant-design-vue";
import { Browser, useBrowser } from "@/composables/useBrowser";
import ImageConverterResultList from "@/components/converter/ImageConverterResultList.vue";
import { v4 } from "uuid";
import { ImageConverterResult } from "@/types/ImageConverterResult";

const browser = useBrowser();

const canvas = ref<HTMLCanvasElement>();
const inputImage: Ref<File | null> = ref(null);
const imageObj: Ref<HTMLImageElement> = ref(new Image());
const isImageLoaded = ref(false);
const imageConverterResultList: Ref<ImageConverterResult[]> = ref([]);

const convertTo = ref(null);
const convertTypes = computed<SelectProps["options"]>(() => {
  const list = [
    {
      label: "PNG",
      value: "image/png",
      disabled: "image/png" === inputImage?.value?.type,
    },
    {
      label: "JPEG",
      value: "image/jpeg",
      disabled: "image/jpeg" === inputImage?.value?.type,
    },
    {
      label: "WEBP",
      value: "image/webp",
      disabled:
        "image.webp" === inputImage?.value?.type ||
        browser.browserType.value === Browser.Safari,
    },
  ];
  return list.filter((item) => item.value !== inputImage.value?.type);
});

const onClickConvert = () => {
  if (!inputImage.value || !canvas.value || !convertTo.value) {
    return;
  }
  imageConverterResultList.value.push({
    id: v4(),
    objectURL: canvas.value.toDataURL(convertTo.value),
    originalName: inputImage.value.name,
    type: convertTo.value,
    originalType: inputImage.value.type,
  });
};

watch(inputImage, (n, o) => {
  if (!inputImage.value) {
    return;
  }
  isImageLoaded.value = false;
  convertTo.value = null;

  imageObj.value.src = URL.createObjectURL(inputImage.value);
  imageObj.value.onload = () => {
    if (!canvas.value) {
      return;
    }
    canvas.value.width = imageObj.value.width;
    canvas.value.height = imageObj.value.height;
    canvas.value.getContext("2d")?.drawImage(imageObj.value, 0, 0);
    isImageLoaded.value = true;
  };
});
</script>

<template>
  <ATypographyTitle :level="2">Image Converter</ATypographyTitle>
  <section>
    <div class="mb-3">
      <ATypographyTitle :level="3">Added Image</ATypographyTitle>
      <ATypographyText
        >Only Support JPEG, PNG, WEBP(except Safari)</ATypographyText
      >
    </div>
    <canvas ref="canvas" v-show="false"></canvas>
    <ACard>
      <ARow>
        <ACol :span="24" :lg="16">
          <ARow>
            <div
              class="w-100 h-100 d-flex justify-content-center align-items-center pb-1 pb-lg-0 pe-0 pe-lg-1"
            >
              <ImageInput :upload="true" v-model:file="inputImage" />
            </div>
          </ARow>
        </ACol>
        <ACol
          flex="auto"
          :span="24"
          :lg="8"
          class="px-0 d-flex flex-column justify-content"
        >
          <ACard
            class="h-100"
            :bodyStyle="{
              height: '100%',
            }"
          >
            <ADescriptions class="mb-4" bordered>
              <ADescriptionsItem label="type">{{
                inputImage?.type ?? "No Data"
              }}</ADescriptionsItem>
            </ADescriptions>

            <ATypographyTitle :level="3">Settings</ATypographyTitle>
            <AForm>
              <AFormItem label="Convert to">
                <ASelect
                  placeholder="Select type"
                  v-model:value="convertTo"
                  :options="convertTypes"
                />
              </AFormItem>
            </AForm>

            <AButton
              :disabled="!isImageLoaded || !convertTo"
              class="w-100"
              type="primary"
              @click="onClickConvert"
              >Convert</AButton
            >
          </ACard>
        </ACol>
      </ARow>
    </ACard>
  </section>
  <ImageConverterResultList v-model:results="imageConverterResultList" />
</template>
