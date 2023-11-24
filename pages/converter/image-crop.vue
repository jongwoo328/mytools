<script lang="ts" setup>
import { computed, Ref, ref, watch } from "vue";
import { useImageUtil } from "@/composables/useImageUtil";
import { v4 } from "uuid";
import { breakpointsBootstrapV5, useMagicKeys } from "@vueuse/core";
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
      name: "Image Cropper",
      item: `https://tools.jongwoo.me${localePath("/converter/image-crop")}`,
    },
  ],
}));

const { asyncBlobToBase64 } = useImageUtil();
const image = ref() as Ref<HTMLImageElement>;
const imageInput = ref() as Ref<HTMLInputElement>;
const cropper = ref();
const cropperImageSource = ref("https://s3.ap-northeast-2.amazonaws.com/public-store.jongwoo.me/tools/ghost.png");

const selectedAspectRatio: Ref<"Custom" | number> = ref(16 / 9);
const customRatioWidth = ref(1.618);
const customRatioHeight = ref(1);
const customCropWidth = ref(100);
const customCropHeight = ref(100);
const customCropTop = ref(0);
const customCropLeft = ref(0);
const isCropperLocked = ref(false);

const breakpoints = useBreakpoints(breakpointsBootstrapV5);
const isSmallScreen = breakpoints.smallerOrEqual("sm");

type CropBoxData = {
  width: number;
  height: number;
  top: number;
  left: number;
};

const syncCropBoxAndInput = (cropBoxData: CropBoxData) => {
  const { width, height, top, left } = cropBoxData;
  customCropWidth.value = Math.round(width);
  customCropHeight.value = Math.round(height);
  customCropTop.value = Math.round(top);
  customCropLeft.value = Math.round(left);
  cropper.value.setCropBoxData({
    width: Math.round(width),
    height: Math.round(height),
    top: Math.round(top),
    left: Math.round(left),
  });
};

const aspectRatioOptions = [
  {
    label: "1:1",
    value: 1,
  },
  {
    label: "4:3",
    value: 4 / 3,
  },
  {
    label: "16:9",
    value: 16 / 9,
  },
  {
    label: t("converter.image_crop.options.aspect_ratio.options.custom"),
    value: "Custom",
  },
  {
    label: t("converter.image_crop.options.aspect_ratio.options.free"),
    value: -1,
  },
];

watch([selectedAspectRatio, customRatioWidth, customRatioHeight], ([selectedRatio, width, height]) => {
  if (selectedRatio === "Custom") {
    cropper.value.setAspectRatio(width / height);
  } else if (selectedRatio === -1) {
    cropper.value.setAspectRatio(null);
  } else {
    cropper.value.setAspectRatio(selectedRatio);
  }
  const cropBoxData = cropper.value.getCropBoxData();
  syncCropBoxAndInput(cropBoxData);
});
watch(isCropperLocked, () => {
  if (isCropperLocked.value) {
    cropper.value.disable();
  } else {
    cropper.value.enable();
  }
});

const onCropperReady = () => {
  const cropBoxData = cropper.value.getCropBoxData();
  syncCropBoxAndInput(cropBoxData);
};

const onCropResize = (e: any) => {
  const cropBoxData = e?.target?.cropper?.cropBoxData;
  if (!cropBoxData) {
    return;
  }
  syncCropBoxAndInput(cropBoxData);
};

const calcHeightFromWidth = (width: number, cropBoxData: CropBoxData) => {
  if (selectedAspectRatio.value === "Custom") {
    return width / (customRatioWidth.value / customRatioHeight.value);
  } else if (selectedAspectRatio.value === -1) {
    return cropBoxData.height;
  } else {
    return width / selectedAspectRatio.value;
  }
};

const calcWidthFromHeight = (height: number, cropBoxData: CropBoxData) => {
  if (selectedAspectRatio.value === "Custom") {
    return height * (customRatioWidth.value / customRatioHeight.value);
  } else if (selectedAspectRatio.value === -1) {
    return cropBoxData.width;
  } else {
    return height * selectedAspectRatio.value;
  }
};

watch(customCropWidth, (value, oldValue) => {
  if (value === oldValue) {
    return;
  }
  const cropBoxData = cropper.value.getCropBoxData();

  syncCropBoxAndInput({
    ...cropBoxData,
    width: value,
    height: calcHeightFromWidth(value, cropBoxData),
  });
});

watch(customCropHeight, (value, oldValue) => {
  if (value === oldValue) {
    return;
  }
  const cropBoxData = cropper.value.getCropBoxData();
  syncCropBoxAndInput({
    ...cropBoxData,
    height: value,
    width: calcWidthFromHeight(value, cropBoxData),
  });
});

watch(customCropTop, (value, oldValue) => {
  if (value === oldValue) {
    return;
  }
  const cropBoxData = cropper.value.getCropBoxData();
  syncCropBoxAndInput({
    ...cropBoxData,
    top: value,
  });
});

watch(customCropLeft, (value, oldValue) => {
  if (value === oldValue) {
    return;
  }
  const cropBoxData = cropper.value.getCropBoxData();
  syncCropBoxAndInput({
    ...cropBoxData,
    left: value,
  });
});

const onChangeInput = async (e: Event) => {
  const el = e.target as HTMLInputElement;
  const files = el.files as FileList;
  const file = files[0];
  if (!file) {
    return;
  }
  cropper.value.replace(await asyncBlobToBase64(file));
};

const rotate = (degree: number) => {
  cropper.value.rotate(degree);
};

const zoom = (ratio: number) => {
  cropper.value.relativeZoom(ratio);
};

const move = (offsetX: number, offsetY: number) => {
  const cropBoxData = cropper.value.getCropBoxData();
  syncCropBoxAndInput({
    ...cropBoxData,
    left: cropBoxData.left + offsetX,
    top: cropBoxData.top + offsetY,
  });
};

const save = () => {
  cropper.value.getCroppedCanvas().toBlob((blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = `${v4()}.png`;
    a.href = url;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
};

const reset = () => {
  cropper.value.reset();
};

const buttonSideWidth = computed(() => {
  if (isSmallScreen.value) {
    return 64;
  }
  return 44;
});
const buttonSideWidthPixel = computed(() => buttonSideWidth.value + "px");

const moveUp = () => {
  move(0, -1);
};
const moveDown = () => {
  move(0, 1);
};

const moveLeft = () => {
  move(-1, 0);
};

const moveRight = () => {
  move(1, 0);
};

const useKeyboardArrow = ref(true);
const keys = useMagicKeys();
const pressUp = keys["Control+Shift+Up"];
const pressDown = keys["Control+Shift+Down"];
const pressLeft = keys["Control+Shift+Left"];
const pressRight = keys["Control+Shift+Right"];
watch([pressUp, pressRight, pressLeft, pressDown], () => {
  if (!useKeyboardArrow.value) {
    return;
  }
  if (pressUp.value) {
    moveUp();
  }
  if (pressLeft.value) {
    moveLeft();
  }
  if (pressRight.value) {
    moveRight();
  }
  if (pressDown.value) {
    moveDown();
  }
});
</script>

<template>
  <Head>
    <Title>{{ t("converter.image_crop.head.title") }}</Title>
    <Meta name="description" :content="t('converter.image_crop.head.description')" />
  </Head>
  <ToolPageLayout :title="t('converter.image_crop.title')">
    <Card>
      <template #content>
        <div class="row w-100 m-0">
          <div class="pb-1 pb-lg-0 pe-lg-2 d-flex justify-content-center align-items-center col col-12 col-lg-8">
            <vue-cropper
              ref="cropper"
              class="w-100"
              :check-orientation="false"
              :check-cross-origin="false"
              :aspect-ratio="selectedAspectRatio"
              :src="cropperImageSource"
              @ready="onCropperReady"
              @cropmove="onCropResize"
              :style="{ height: '100%', width: '100%' }"
            />
          </div>
          <div class="col col-12 col-lg-4">
            <img class="d-none" ref="image" alt="Added image" src="" />
            <input
              ref="imageInput"
              id="crop-image"
              class="d-none"
              type="file"
              accept="image/*"
              @change="onChangeInput"
            />
            <div class="mt-2 mt-lg-0">
              <Button class="d-block w-100" @click="save">
                {{ t("converter.image_crop.save_btn_label") }}
              </Button>
              <label for="crop-image" class="p-button p-component p-button-outlined d-block w-100 mt-2">
                {{ t("converter.image_crop.change_image_btn_label") }}
              </label>
            </div>
            <div class="options mt-2 p-2">
              <div class="row option-list">
                <div class="col col-12">
                  <div class="row">
                    <div class="col col-12 d-flex align-items-center mt-2">
                      <label for="aspectRatio">
                        {{ t("converter.image_crop.options.aspect_ratio.label") }}
                      </label>
                    </div>
                    <div class="col col-12 mt-2">
                      <Dropdown
                        id="aspectRatio"
                        :options="aspectRatioOptions"
                        v-model:model-value="selectedAspectRatio"
                        option-label="label"
                        option-value="value"
                        class="w-100"
                        :disabled="isCropperLocked"
                      />
                    </div>
                  </div>
                </div>
                <div class="col col-12">
                  <div class="row">
                    <div class="col col-12 mt-2">
                      <label for="">
                        {{ t("converter.image_crop.options.custom_ratio.label") }}
                      </label>
                    </div>
                    <div class="col col-12 mt-2">
                      <div class="row justify-content-between">
                        <div class="pe-0" style="width: 45%">
                          <InputNumber
                            :disabled="selectedAspectRatio !== 'Custom' || isCropperLocked"
                            class="w-100"
                            show-buttons
                            :step="0.1"
                            input-class="w-100 prevent-auto-zoom"
                            :min="1"
                            :max="30"
                            v-model:model-value="customRatioWidth"
                          />
                        </div>
                        <div style="width: 10%" class="d-flex justify-content-center align-items-center">
                          <span class="fs-4 fw-light">/</span>
                        </div>
                        <div class="ps-0" style="width: 45%">
                          <InputNumber
                            :disabled="selectedAspectRatio !== 'Custom' || isCropperLocked"
                            class="w-100"
                            show-buttons
                            :step="0.1"
                            input-class="w-100 prevent-auto-zoom"
                            :min="1"
                            :max="30"
                            v-model:model-value="customRatioHeight"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col col-12">
                  <div class="row">
                    <div class="col col-12 mt-2">
                      <label for="">
                        {{ t("converter.image_crop.options.crop_size.label") }}
                      </label>
                    </div>
                    <div class="col col-12 mt-2">
                      <div class="row justify-content-between">
                        <div class="pe-0" style="width: 45%">
                          <InputNumber
                            :disabled="isCropperLocked"
                            class="w-100"
                            show-buttons
                            :step="1"
                            input-class="w-100 prevent-auto-zoom"
                            :min="1"
                            :max="10000"
                            v-model:model-value="customCropWidth"
                          />
                        </div>
                        <div style="width: 10%" class="d-flex justify-content-center align-items-center">
                          <span class="fs-4 fw-light">/</span>
                        </div>
                        <div class="ps-0" style="width: 45%">
                          <InputNumber
                            :disabled="isCropperLocked"
                            class="w-100"
                            show-buttons
                            :step="1"
                            input-class="w-100 prevent-auto-zoom"
                            :min="1"
                            :max="10000"
                            v-model:model-value="customCropHeight"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col col-12">
                  <div class="row">
                    <div class="col col-12 mt-2">
                      <label for="">
                        {{ t("converter.image_crop.options.crop_position.label") }}
                      </label>
                    </div>
                    <div class="col col-12 mt-2">
                      <div class="row justify-content-between">
                        <div class="pe-0" style="width: 45%">
                          <InputNumber
                            :disabled="isCropperLocked"
                            class="w-100"
                            show-buttons
                            :step="1"
                            input-class="w-100 prevent-auto-zoom"
                            :min="0"
                            :max="10000"
                            v-model:model-value="customCropLeft"
                          />
                        </div>
                        <div style="width: 10%" class="d-flex justify-content-center align-items-center">
                          <span class="fs-4 fw-light">/</span>
                        </div>
                        <div class="ps-0" style="width: 45%">
                          <InputNumber
                            :disabled="isCropperLocked"
                            class="w-100"
                            show-buttons
                            :step="1"
                            input-class="w-100 prevent-auto-zoom"
                            :min="0"
                            :max="10000"
                            v-model:model-value="customCropTop"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col col-12">
                  <div class="row">
                    <div class="col col-12 mt-2">
                      <label for="">
                        {{ t("converter.image_crop.options.control.label") }}
                      </label>
                    </div>
                    <div class="col col-12 row m-0 mt-2">
                      <div class="col col-12 col-sm-6 col-md-4 col-lg-12">
                        <div class="w-100 d-flex">
                          <Button
                            severity="secondary"
                            size="small"
                            icon="pi pi-arrow-left"
                            class="me-1 control-button"
                            @click="moveLeft"
                          />
                          <Button
                            severity="secondary"
                            size="small"
                            icon="pi pi-arrow-up"
                            class="me-1 control-button"
                            @click="moveUp"
                          />
                          <Button
                            severity="secondary"
                            size="small"
                            icon="pi pi-arrow-right"
                            class="me-1 control-button"
                            @click="moveRight"
                          />
                          <Button
                            severity="secondary"
                            size="small"
                            icon="pi pi-arrow-down"
                            class="me-1 control-button"
                            @click="moveDown"
                          />
                        </div>
                      </div>
                      <div class="col col-12 col-sm-6 col-md-4 col-lg-12 mt-1 mt-sm-0 mt-lg-1">
                        <div class="w-100 d-flex">
                          <Button
                            severity="secondary"
                            size="small"
                            icon="pi pi-replay"
                            class="me-1 control-button"
                            @click="rotate(-90)"
                          />
                          <Button
                            severity="secondary"
                            size="small"
                            icon="pi pi-refresh"
                            class="me-1 control-button"
                            @click="rotate(90)"
                          />
                          <Button
                            severity="secondary"
                            size="small"
                            icon="pi pi-search-plus"
                            class="me-1 control-button"
                            @click="zoom(0.1)"
                          />
                          <Button
                            severity="secondary"
                            size="small"
                            icon="pi pi-search-minus"
                            class="me-1 control-button"
                            @click="zoom(-0.1)"
                          />
                        </div>
                      </div>
                      <div class="col col-12 col-sm-6 col-md-4 col-lg-12 mt-1 mt-md-0 mt-lg-1">
                        <div class="w-100 d-flex">
                          <Button
                            :severity="isCropperLocked ? 'danger' : 'secondary'"
                            size="small"
                            icon="pi pi-lock"
                            class="me-1 control-button"
                            @click="isCropperLocked = true"
                          />
                          <Button
                            :severity="isCropperLocked ? 'secondary' : 'danger'"
                            size="small"
                            icon="pi pi-lock-open"
                            class="me-1 control-button"
                            @click="isCropperLocked = false"
                          />
                          <Button
                            severity="secondary"
                            :disabled="isCropperLocked"
                            size="small"
                            icon="pi pi-lock"
                            class="me-1"
                            :style="`width: calc(0.25rem + ${buttonSideWidth * 2}px)`"
                            @click="reset"
                          >
                            {{ t("converter.image_crop.options.control.reset") }}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <span>
                      {{ t("converter.image_crop.options.control_configuration.label") }}
                    </span>
                    <div class="col col-12 mt-2 px-4 d-flex">
                      <div>
                        <InputSwitch class="d-inline-block" input-id="useKeyboardArrow" v-model="useKeyboardArrow" />
                      </div>
                      <label class="ms-3" for="useKeyboardArrow" style="text-wrap: initial">
                        <span>
                          {{ t("converter.image_crop.options.control_configuration.use_keyboard_arrow") }}
                        </span>
                        <span>
                          (<kbd>Control</kbd> + <kbd>Shift</kbd> + <kbd>←</kbd>,<kbd>↑</kbd>,<kbd>↓</kbd>,<kbd>→</kbd>)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </ToolPageLayout>
</template>

<style lang="scss" scoped>
.control-button {
  width: v-bind("buttonSideWidthPixel");
  height: v-bind("buttonSideWidthPixel");
}
</style>
