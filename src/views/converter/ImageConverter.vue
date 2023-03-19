<script lang="ts" setup>
import ImageInput from "@/components/converter/ImageInput.vue";
import { computed, Ref, ref, watch } from "vue";
import { SelectProps } from "ant-design-vue";
import { Browser, useBrowser } from "@/composables/useBrowser";
import ImageConverterResultList from "@/components/converter/ImageConverterResultList.vue";
import { v4 } from "uuid";
import { ImageConverterResult } from "@/types/ImageConverterResult";
import { LoadingOutlined } from "@ant-design/icons-vue";
import { useImageUtil } from "@/composables/useImageUtil";
import PageTitle from "@/components/common/PageTitle.vue";
import { copyWithNotification } from "@/utils/copy";

const browser = useBrowser();
const { blobToBase64 } = useImageUtil();

const canvas = ref<HTMLCanvasElement>();
const inputImage: Ref<File | null> = ref(null);
const imageObj: Ref<HTMLImageElement> = ref(new Image());
const isConvertLoading = ref(false);
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

const onClickConvert = async () => {
  if (!convertTo.value) {
    return;
  }
  isConvertLoading.value = true;
  canvas.value?.toBlob(async (blob: Blob | null) => {
    if (!inputImage.value || !canvas.value || !convertTo.value || !blob) {
      return;
    }
    const imageUrl = await blobToBase64(blob);
    imageConverterResultList.value.push({
      id: v4(),
      objectURL: imageUrl,
      originalName: inputImage.value.name,
      type: convertTo.value,
      originalType: inputImage.value.type,
    });
    isConvertLoading.value = false;
  }, convertTo.value);
};

const copyingBase64 = ref(false);
const copyAsBase64 = async () => {
  if (!inputImage.value) {
    return;
  }

  copyingBase64.value = true;
  await new Promise((r) => setTimeout(r, 0));
  await copyWithNotification(await blobToBase64(inputImage.value));
  copyingBase64.value = false;
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
  <PageTitle title="Image Converter" />
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
            <div class="mb-4 mb-lg-5">
              <ADescriptions class="mb-4" bordered>
                <ADescriptionsItem label="type">{{
                  inputImage?.type ?? "No Data"
                }}</ADescriptionsItem>
              </ADescriptions>
              <AButton
                @click="copyAsBase64"
                :disabled="!isImageLoaded && copyingBase64"
                size="large"
                block
              >
                <template v-if="copyingBase64">
                  <LoadingOutlined />
                </template>
                <template v-else> Copy as Base64 </template>
              </AButton>
            </div>

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
              :disabled="!isImageLoaded || !convertTo || isConvertLoading"
              class="w-100 d-flex justify-content-center align-items-center"
              type="primary"
              size="large"
              @click="onClickConvert"
            >
              <template v-if="!isConvertLoading">Convert</template>
              <template v-else>
                <LoadingOutlined />
              </template>
            </AButton>
          </ACard>
        </ACol>
      </ARow>
    </ACard>
  </section>
  <ImageConverterResultList v-model:results="imageConverterResultList" />
</template>
