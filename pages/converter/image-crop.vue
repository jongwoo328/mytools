<script lang="ts" setup>
import { computed, type Ref, ref, watch } from "vue";
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

const syncCropBoxToInput = () => {
  const { width, height, top, left } = cropper.value.getCropBoxData();
  customCropWidth.value = width;
  customCropHeight.value = height;
  customCropTop.value = top;
  customCropLeft.value = left;
};

const syncInputToCropBox = () => {
  cropper.value.setCropBoxData({
    width: customCropWidth.value,
    height: customCropHeight.value,
    top: customCropTop.value,
    left: customCropLeft.value,
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
  syncInputToCropBox();
});

watch(isCropperLocked, () => {
  if (isCropperLocked.value) {
    cropper.value.disable();
  } else {
    cropper.value.enable();
  }
});

const onCropperReady = () => {
  syncCropBoxToInput();
};

const onCropResize = (e: any) => {
  const cropBoxData = e?.target?.cropper?.cropBoxData;
  if (!cropBoxData) {
    return;
  }
  syncCropBoxToInput();
};

watch(customCropWidth, (value, oldValue) => {
  if (value === oldValue) {
    return;
  }
  syncInputToCropBox();
  syncCropBoxToInput();
});

watch(customCropHeight, (value, oldValue) => {
  if (value === oldValue) {
    return;
  }
  syncInputToCropBox();
  syncCropBoxToInput();
});

watch(customCropTop, (value, oldValue) => {
  if (value === oldValue) {
    return;
  }
  syncInputToCropBox();
});

watch(customCropLeft, (value, oldValue) => {
  if (value === oldValue) {
    return;
  }
  syncInputToCropBox();
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
  cropper.value.setCropBoxData({
    left: cropBoxData.left + offsetX,
    top: cropBoxData.top + offsetY,
  });
  syncCropBoxToInput();
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
  syncCropBoxToInput();
};

const buttonSideWidth = computed(() => {
  if (isSmallScreen.value) {
    return 64;
  }
  return 44;
});

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
        <div class="grid grid-cols-12 w-full m-0">
          <div class="pb-1 lg:pb-0 lg:pr-2 flex justify-center items-center col-span-full lg:col-span-8">
            <vue-cropper
              ref="cropper"
              class="w-full"
              :check-orientation="false"
              :check-cross-origin="false"
              :aspect-ratio="selectedAspectRatio"
              src="/static/images/ghost.png"
              @ready="onCropperReady"
              @cropmove="onCropResize"
              :style="{ height: '100%', width: '100%' }"
            />
          </div>
          <div class="col-span-full lg:col-span-4">
            <img class="hidden" ref="image" alt="Added image" src="" />
            <input
              ref="imageInput"
              id="crop-image"
              class="hidden"
              type="file"
              accept="image/*"
              @change="onChangeInput"
            />
            <div class="mt-2 lg:mt-0">
              <Button class="block w-full" @click="save">
                {{ t("converter.image_crop.save_btn_label") }}
              </Button>
              <label for="crop-image" class="p-button p-component p-button-outlined block w-full mt-2 text-center">
                {{ t("converter.image_crop.change_image_btn_label") }}
              </label>
            </div>
            <div class="options mt-2 p-2">
              <div class="grid grid-cols-12 option-list">
                <div class="col-span-full">
                  <div class="grid">
                    <div class="col-span-full flex items-center mt-2">
                      <label for="aspectRatio">
                        {{ t("converter.image_crop.options.aspect_ratio.label") }}
                      </label>
                    </div>
                    <div class="col-span-full mt-2">
                      <Select
                        id="aspectRatio"
                        :options="aspectRatioOptions"
                        v-model:model-value="selectedAspectRatio"
                        option-label="label"
                        option-value="value"
                        class="w-full"
                        :disabled="isCropperLocked"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-span-full">
                  <div class="grid">
                    <div class="col-span-full mt-2">
                      <label for="">
                        {{ t("converter.image_crop.options.custom_ratio.label") }}
                      </label>
                    </div>
                    <div class="col-span-full mt-2">
                      <div class="flex justify-between">
                        <div class="pr-0" style="width: 45%">
                          <InputNumber
                            :disabled="selectedAspectRatio !== 'Custom' || isCropperLocked"
                            class="w-full"
                            show-buttons
                            :step="0.1"
                            input-class="w-full prevent-auto-zoom"
                            :min="1"
                            :max="30"
                            v-model:model-value="customRatioWidth"
                          />
                        </div>
                        <div style="width: 10%" class="flex justify-center items-center">
                          <span class="text-xl font-light">/</span>
                        </div>
                        <div class="pl-0" style="width: 45%">
                          <InputNumber
                            :disabled="selectedAspectRatio !== 'Custom' || isCropperLocked"
                            class="w-full"
                            show-buttons
                            :step="0.1"
                            input-class="w-full prevent-auto-zoom"
                            :min="1"
                            :max="30"
                            v-model:model-value="customRatioHeight"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-span-full">
                  <div class="grid">
                    <div class="col-span-full mt-2">
                      <label for="">
                        {{ t("converter.image_crop.options.crop_size.label") }}
                      </label>
                    </div>
                    <div class="col-span-full mt-2">
                      <div class="flex justify-between">
                        <div class="pr-0" style="width: 45%">
                          <InputNumber
                            :disabled="isCropperLocked"
                            class="w-full"
                            show-buttons
                            :step="1"
                            input-class="w-full prevent-auto-zoom"
                            :min="1"
                            :max="10000"
                            v-model:model-value="customCropWidth"
                          />
                        </div>
                        <div style="width: 10%" class="flex justify-center items-center">
                          <span class="text-xl font-light">/</span>
                        </div>
                        <div class="pl-0" style="width: 45%">
                          <InputNumber
                            :disabled="isCropperLocked"
                            class="w-full"
                            show-buttons
                            :step="1"
                            input-class="w-full prevent-auto-zoom"
                            :min="1"
                            :max="10000"
                            v-model:model-value="customCropHeight"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-span-full">
                  <div class="grid">
                    <div class="col-span-full mt-2">
                      <label for="">
                        {{ t("converter.image_crop.options.crop_position.label") }}
                      </label>
                    </div>
                    <div class="col-span-full mt-2">
                      <div class="flex justify-between">
                        <div class="pr-0" style="width: 45%">
                          <InputNumber
                            :disabled="isCropperLocked"
                            class="w-full"
                            show-buttons
                            :step="1"
                            input-class="w-full prevent-auto-zoom"
                            :min="0"
                            :max="10000"
                            v-model:model-value="customCropLeft"
                          />
                        </div>
                        <div style="width: 10%" class="flex justify-center items-center">
                          <span class="text-xl font-light">/</span>
                        </div>
                        <div class="pl-0" style="width: 45%">
                          <InputNumber
                            :disabled="isCropperLocked"
                            class="w-full"
                            show-buttons
                            :step="1"
                            input-class="w-full prevent-auto-zoom"
                            :min="0"
                            :max="10000"
                            v-model:model-value="customCropTop"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-span-full">
                  <div class="grid">
                    <div class="col-span-full mt-2">
                      <label for="">
                        {{ t("converter.image_crop.options.control.label") }}
                      </label>
                    </div>
                    <div class="col-span-full grid grid-cols-12 m-0 mt-2">
                      <div class="col-span-full sm:col-span-6 md:col-span-4 lg:col-span-12">
                        <div class="w-full flex">
                          <Button
                            severity="secondary"
                            size="small"
                            icon="pi pi-arrow-left"
                            class="mr-1 control-button"
                            @click="moveLeft"
                          />
                          <Button
                            severity="secondary"
                            size="small"
                            icon="pi pi-arrow-up"
                            class="mr-1 control-button"
                            @click="moveUp"
                          />
                          <Button
                            severity="secondary"
                            size="small"
                            icon="pi pi-arrow-right"
                            class="mr-1 control-button"
                            @click="moveRight"
                          />
                          <Button
                            severity="secondary"
                            size="small"
                            icon="pi pi-arrow-down"
                            class="mr-1 control-button"
                            @click="moveDown"
                          />
                        </div>
                      </div>
                      <div class="col-span-full sm:col-span-6 md:col-span-4 lg:col-span-12 mt-1 sm:mt-0 lg:mt-1">
                        <div class="w-full flex">
                          <Button
                            severity="secondary"
                            size="small"
                            icon="pi pi-replay"
                            class="mr-1 control-button"
                            @click="rotate(-90)"
                          />
                          <Button
                            severity="secondary"
                            size="small"
                            icon="pi pi-refresh"
                            class="mr-1 control-button"
                            @click="rotate(90)"
                          />
                          <Button
                            severity="secondary"
                            size="small"
                            icon="pi pi-search-plus"
                            class="mr-1 control-button"
                            @click="zoom(0.1)"
                          />
                          <Button
                            severity="secondary"
                            size="small"
                            icon="pi pi-search-minus"
                            class="mr-1 control-button"
                            @click="zoom(-0.1)"
                          />
                        </div>
                      </div>
                      <div class="col-span-full sm:col-span-6 md:col-span-4 lg:col-span-12 mt-1 md:mt-0 lg:mt-1">
                        <div class="w-full flex">
                          <Button
                            :severity="isCropperLocked ? 'danger' : 'secondary'"
                            size="small"
                            icon="pi pi-lock"
                            class="mr-1 control-button"
                            @click="isCropperLocked = true"
                          />
                          <Button
                            :severity="isCropperLocked ? 'secondary' : 'danger'"
                            size="small"
                            icon="pi pi-lock-open"
                            class="mr-1 control-button"
                            @click="isCropperLocked = false"
                          />
                          <Button
                            severity="secondary"
                            :disabled="isCropperLocked"
                            size="small"
                            icon="pi pi-lock"
                            class="mr-1"
                            :style="`width: calc(0.25rem + ${buttonSideWidth * 2}px)`"
                            @click="reset"
                          >
                            {{ t("converter.image_crop.options.control.reset") }}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="grid mt-3">
                    <span>
                      {{ t("converter.image_crop.options.control_configuration.label") }}
                    </span>
                    <div class="col-span-full mt-2 px-4 flex">
                      <div>
                        <ToggleSwitch class="d-inline-block" input-id="useKeyboardArrow" v-model="useKeyboardArrow" />
                      </div>
                      <label class="ml-3" for="useKeyboardArrow" style="text-wrap: initial">
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
