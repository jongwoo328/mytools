<script lang="ts" setup>
import ImageInput from "@/components/converter/ImageInput.vue";
import { computed, Ref, ref, watch } from "vue";
import { Browser, useBrowser } from "@/composables/useBrowser";
import ImageConverterResultList from "@/components/converter/ImageConverterResultList.vue";
import { v4 } from "uuid";
import { ImageConverterResult } from "@/types/ImageConverterResult";
import { useImageUtil } from "@/composables/useImageUtil";
import { createEmptyFile, isEmptyFile } from "@/utils/file";
import PageHeading from "@/components/common/PageHeading.vue";
import { createEmptyImageElement } from "~/utils/HTMLImage";
import ToolPageLayout from "~/components/common/ToolPageLayout.vue";

const { t } = useI18n();
const localePath = useLocalePath();

useJsonld(() => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: t("title"),
      item: `https://tools.jongwoo.me${localePath("/")}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Image Converter",
      item: `https://tools.jongwoo.me${localePath("/converter/image")}`,
    },
  ],
}));

const browser = useBrowser();
const { copyData } = useCopy();
const { asyncBlobToBase64 } = useImageUtil();

const canvas = ref<HTMLCanvasElement>();
const inputImage = ref<File>(createEmptyFile());
const inputImageType = ref(t("converter.image.image_type.no_data"));
const imageObj: Ref<HTMLImageElement> = ref(createEmptyImageElement());
const isConvertLoading = ref(false);
const isImageLoaded = ref(false);
const imageConverterResultList: Ref<Array<ImageConverterResult>> = ref([]);

const convertTo: Ref<string> = ref("");
const convertTypes = computed<{ label: string; value: string }[]>(() => {
  const list = [];

  if (inputImage.value?.type !== "image/png") {
    list.push({
      label: t("converter.image.settings.convert_to.options.png"),
      value: "image/png",
    });
  }
  if (inputImage.value?.type !== "image/jpeg") {
    list.push({
      label: t("converter.image.settings.convert_to.options.jpeg"),
      value: "image/jpeg",
    });
  }
  if (inputImage.value?.type !== "image/webp" && browser.browserType.value !== Browser.Safari) {
    list.push({
      label: t("converter.image.settings.convert_to.options.webp"),
      value: "image/webp",
    });
  }
  return list;
});

const onClickConvert = async () => {
  if (!convertTo.value) {
    return;
  }
  isConvertLoading.value = true;
  canvas.value?.toBlob(async (blob: Blob | null) => {
    if (isEmptyFile(inputImage.value) || !canvas.value || !convertTo.value || !blob) {
      isConvertLoading.value = false;
      return;
    }
    const imageUrl = await asyncBlobToBase64(blob);
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
  if (isEmptyFile(inputImage.value)) {
    return;
  }

  copyingBase64.value = true;
  await new Promise((r) => setTimeout(r, 0));
  await copyData(await asyncBlobToBase64(inputImage.value));
  copyingBase64.value = false;
};

watch(inputImage, () => {
  if (isEmptyFile(inputImage.value)) {
    return;
  }

  isImageLoaded.value = false;
  convertTo.value = "";
  inputImageType.value = inputImage.value.type;

  imageObj.value.src = URL.createObjectURL(inputImage.value);
  imageObj.value.onload = () => {
    if (!canvas.value) {
      return;
    }
    if ("width" in canvas.value) {
      canvas.value.width = imageObj.value.width;
    }
    if ("height" in canvas.value) {
      canvas.value.height = imageObj.value.height;
    }
    if ("getContext" in canvas.value) {
      canvas.value.getContext("2d")?.drawImage(imageObj.value, 0, 0);
    }
    isImageLoaded.value = true;
  };
});
</script>

<template>
  <Head>
    <Title>{{ t("converter.image.head.title") }}</Title>
    <Meta name="description" :content="t('converter.image.head.description')" />
  </Head>
  <ToolPageLayout :title="t('converter.image.title')" :description="t('converter.image.description')">
    <PageHeading :level="2" :size="6" weight="600">
      {{ t("converter.image.image_input_label") }}
    </PageHeading>
    <canvas ref="canvas" v-show="false" />
    <Card>
      <template #content>
        <div class="row m-0">
          <div class="col col-12 col-lg-8 px-0">
            <div class="row m-0 h-100">
              <div class="w-100 h-100 d-flex justify-content-center align-items-center pb-1 pb-lg-0 pe-lg-1">
                <ImageInput :upload="true" v-model:file="inputImage" />
              </div>
            </div>
          </div>
          <div class="col col-12 col-lg-4 d-flex flex-column justify-content mt-3 mt-lg-0">
            <div class="mb-4 mb-lg-5">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon px-5">
                  {{ t("converter.image.image_type_label") }}
                </span>
                <InputText :disabled="true" v-model:model-value="inputImageType" class="text-center" />
              </div>
              <Button
                @click="copyAsBase64"
                severity="info"
                class="w-100 d-block mt-2"
                :disabled="!isImageLoaded && copyingBase64"
                style="height: 44px"
              >
                <template v-if="copyingBase64">
                  <ProgressSpinner class="h-100" strokeWidth="10" />
                </template>
                <template v-else>
                  {{ t("converter.image.copy_as_base64_btn_label") }}
                </template>
              </Button>
            </div>
            <PageHeading :level="3" :size="6" weight="600">
              {{ t("converter.image.settings.label") }}
            </PageHeading>
            <div class="mt-2">
              <span class="mt-1 fs-5 d-block">
                {{ t("converter.image.settings.convert_to.label") }}
              </span>
              <Dropdown
                :options="convertTypes"
                option-label="label"
                option-value="value"
                v-model:model-value="convertTo"
                class="w-100"
              />
            </div>
            <Button
              :disabled="!isImageLoaded || !convertTo || isConvertLoading"
              class="w-100 d-flex justify-content-center align-items-center mt-3"
              style="height: 44px"
              @click="onClickConvert"
            >
              <template v-if="!isConvertLoading">
                {{ t("converter.image.convert_btn_label") }}
              </template>
              <template v-else>
                <ProgressSpinner class="h-100" stroke-width="10" />
              </template>
            </Button>
          </div>
        </div>
      </template>
    </Card>
    <ImageConverterResultList v-model:results="imageConverterResultList" />
  </ToolPageLayout>
</template>
