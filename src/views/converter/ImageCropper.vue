<script lang="ts" setup>
import PageTitle from "@/components/common/PageTitle.vue";
import { Ref, ref, watch } from "vue";
import { useImageUtil } from "@/composables/useImageUtil";
import {
  DownCircleOutlined,
  LeftCircleOutlined,
  LockOutlined,
  RightCircleOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  UnlockOutlined,
  UpCircleOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons-vue";
import { v4 } from "uuid";

const { asyncBlobToBase64 } = useImageUtil();
const image = ref() as Ref<HTMLImageElement>;
const imageInput = ref() as Ref<HTMLInputElement>;
const cropper = ref();
const cropperImageSource = ref(
  "https://images.unsplash.com/photo-1636622433525-127afdf3662d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=100"
);

const selectedAspectRatio: Ref<null | number> = ref(16 / 9);
const customRatioWidth = ref(1.618);
const customRatioHeight = ref(1);
const customCropWidth = ref(100);
const customCropHeight = ref(100);
const customCropTop = ref(0);
const customCropLeft = ref(0);
const isCropperLocked = ref(false);

const syncCropBoxAndInput = (cropBoxData: {
  width: number;
  height: number;
  top: number;
  left: number;
}) => {
  const { width, height, top, left } = cropBoxData;
  customCropWidth.value = Math.floor(width);
  customCropHeight.value = Math.floor(height);
  customCropTop.value = Math.floor(top);
  customCropLeft.value = Math.floor(left);
  cropper.value.setCropBoxData({
    width: Math.floor(width),
    height: Math.floor(height),
    top: Math.floor(top),
    left: Math.floor(left),
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
    label: "Custom",
    value: null,
  },
  {
    label: "Free",
    value: -1,
  },
];

watch(
  [selectedAspectRatio, customRatioWidth, customRatioHeight],
  ([selectedRatio, width, height]) => {
    if (selectedRatio === null) {
      cropper.value.setAspectRatio(width / height);
    } else if (selectedRatio === -1) {
      cropper.value.setAspectRatio(null);
    } else {
      cropper.value.setAspectRatio(selectedRatio);
    }
    const cropBoxData = cropper.value.getCropBoxData();
    syncCropBoxAndInput(cropBoxData);
  }
);
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

const onCropResize = (e) => {
  const cropBoxData = e?.target?.cropper?.cropBoxData;
  if (!cropBoxData) {
    return;
  }
  syncCropBoxAndInput(cropBoxData);
};
watch(
  [customCropWidth, customCropHeight, customCropTop, customCropLeft],
  ([width, height, top, left]) => {
    const cropBoxData = cropper?.value?.getCropBoxData();
    if (!cropBoxData) {
      return;
    }
    cropper.value.setCropBoxData({
      left: Math.floor(left),
      top: Math.floor(top),
      width: Math.floor(width),
      height: Math.floor(height),
    });
  },
  { immediate: true }
);

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
</script>

<template>
  <PageTitle title="Image Cropper" />
  <ACard>
    <ARow>
      <ACol
        :span="24"
        :lg="16"
        class="pb-1 pb-lg-0 pe-0 pe-lg-2 d-flex justify-content-center align-items-center"
      >
        <vue-cropper
          ref="cropper"
          :aspect-ratio="selectedAspectRatio"
          :src="cropperImageSource"
          @ready="onCropperReady"
          @cropmove="onCropResize"
        />
      </ACol>
      <ACol :span="24" :lg="8">
        <img class="d-none" ref="image" alt="Added image" src="" />
        <input
          ref="imageInput"
          id="crop-image"
          class="d-none"
          type="file"
          accept="image/*"
          @change="onChangeInput"
        />

        <div class="options p-2">
          <ARow class="option-list">
            <ACol :span="24">
              <ARow>
                <ACol :span="12">
                  <label for="aspectRatio">Aspect Ratio</label>
                </ACol>
                <ACol :span="12">
                  <ASelect
                    id="aspectRatio"
                    v-model:value="selectedAspectRatio"
                    :options="aspectRatioOptions"
                    size="small"
                    class="w-100"
                    :disabled="isCropperLocked"
                  />
                </ACol>
              </ARow>
            </ACol>
            <ACol :span="24">
              <ARow>
                <ACol :span="12">
                  <label for="">Custom Ratio</label>
                </ACol>
                <ACol :span="12">
                  <ARow justify="space-between">
                    <ACol :span="11">
                      <AInputNumber
                        :disabled="
                          selectedAspectRatio !== null || isCropperLocked
                        "
                        class="w-100"
                        :min="1"
                        :max="30"
                        v-model:value="customRatioWidth"
                        size="small"
                      />
                    </ACol>
                    <ACol>
                      <span>/</span>
                    </ACol>
                    <ACol :span="11">
                      <AInputNumber
                        :disabled="
                          selectedAspectRatio !== null || isCropperLocked
                        "
                        class="w-100"
                        :min="1"
                        :max="30"
                        v-model:value="customRatioHeight"
                        size="small"
                      />
                    </ACol>
                  </ARow>
                </ACol>
              </ARow>
            </ACol>
            <ACol :span="24">
              <ARow>
                <ACol :span="12">
                  <label for="">Crop Size (W/H)</label>
                </ACol>
                <ACol :span="12">
                  <ARow justify="space-between">
                    <ACol :span="11">
                      <AInputNumber
                        class="w-100"
                        :min="1"
                        :max="10000"
                        v-model:value="customCropWidth"
                        :disabled="isCropperLocked"
                        size="small"
                      />
                    </ACol>
                    <ACol>
                      <span>/</span>
                    </ACol>
                    <ACol :span="11">
                      <AInputNumber
                        class="w-100"
                        :min="1"
                        :max="10000"
                        v-model:value="customCropHeight"
                        :disabled="isCropperLocked"
                        size="small"
                      />
                    </ACol>
                  </ARow>
                </ACol>
              </ARow>
            </ACol>
            <ACol :span="24">
              <ARow>
                <ACol :span="12">
                  <label for="">Crop Position (X/Y)</label>
                </ACol>
                <ACol :span="12">
                  <ARow justify="space-between">
                    <ACol :span="11">
                      <AInputNumber
                        class="w-100"
                        :min="0"
                        :max="10000"
                        v-model:value="customCropLeft"
                        :disabled="isCropperLocked"
                        size="small"
                      />
                    </ACol>
                    <ACol>
                      <span>/</span>
                    </ACol>
                    <ACol :span="11">
                      <AInputNumber
                        class="w-100"
                        :min="0"
                        :max="10000"
                        v-model:value="customCropTop"
                        :disabled="isCropperLocked"
                        size="small"
                      />
                    </ACol>
                  </ARow>
                </ACol>
              </ARow>
            </ACol>
            <ACol :span="24">
              <ARow>
                <ACol :span="12">
                  <label for="">Control</label>
                </ACol>
                <ACol :span="12">
                  <ARow>
                    <ACol
                      :span="12"
                      :md="6"
                      :lg="12"
                      class="d-flex justify-content-start"
                    >
                      <ARadioGroup
                        class="control-buttons mb-2"
                        size="small"
                        option-type="button"
                        :disabled="isCropperLocked"
                      >
                        <ARadioButton
                          value="rotate-left"
                          size="small"
                          @click="rotate(-90)"
                        >
                          <RotateLeftOutlined />
                        </ARadioButton>
                        <ARadioButton
                          value="rotate-right"
                          size="small"
                          @click="rotate(90)"
                        >
                          <RotateRightOutlined />
                        </ARadioButton>
                      </ARadioGroup>
                    </ACol>
                    <ACol
                      :span="12"
                      :md="6"
                      :lg="12"
                      class="d-flex justify-content-start"
                    >
                      <ARadioGroup
                        class="control-buttons"
                        size="small"
                        option-type="button"
                        :disabled="isCropperLocked"
                      >
                        <ARadioButton
                          value="in"
                          size="small"
                          @click="zoom(0.1)"
                        >
                          <ZoomInOutlined />
                        </ARadioButton>
                        <ARadioButton
                          value="out"
                          size="small"
                          @click="zoom(-0.1)"
                        >
                          <ZoomOutOutlined />
                        </ARadioButton>
                      </ARadioGroup>
                    </ACol>
                    <ACol
                      :span="20"
                      :md="12"
                      :lg="22"
                      :xl="18"
                      class="d-flex justify-content-start mb-0 mb-lg-2 mb-xl-0"
                    >
                      <ARadioGroup
                        class="control-buttons"
                        size="small"
                        option-type="button"
                        :disabled="isCropperLocked"
                      >
                        <ARadioButton
                          value="left"
                          size="small"
                          @click="move(-10, 0)"
                        >
                          <LeftCircleOutlined />
                        </ARadioButton>
                        <ARadioButton
                          value="down"
                          size="small"
                          @click="move(0, 10)"
                        >
                          <DownCircleOutlined />
                        </ARadioButton>
                        <ARadioButton
                          value="up"
                          size="small"
                          @click="move(0, -10)"
                        >
                          <UpCircleOutlined />
                        </ARadioButton>
                        <ARadioButton
                          value="right"
                          size="small"
                          @click="move(10, 0)"
                        >
                          <RightCircleOutlined />
                        </ARadioButton>
                      </ARadioGroup>
                    </ACol>
                    <ACol class="mt-2" :span="24">
                      <ARadioGroup
                        class="w-100 control-buttons"
                        size="small"
                        option-type="button"
                        v-model:value="isCropperLocked"
                      >
                        <ARadioButton :value="true" class="w-50" size="small">
                          <LockOutlined />
                        </ARadioButton>
                        <ARadioButton :value="false" class="w-50" size="small">
                          <UnlockOutlined />
                        </ARadioButton>
                      </ARadioGroup>
                    </ACol>
                    <ACol :span="24" class="mt-1">
                      <AButton
                        :disabled="isCropperLocked"
                        block
                        size="small"
                        @click="reset"
                      >
                        Reset</AButton
                      >
                    </ACol>
                  </ARow>
                </ACol>
              </ARow>
            </ACol>
          </ARow>
        </div>
        <label for="crop-image" class="ant-btn ant-btn-block ant-btn-lg mt-2">
          Change Image
        </label>
        <AButton @click="save" size="large" class="mt-2" block type="primary"
          >Save</AButton
        >
      </ACol>
    </ARow>
  </ACard>
</template>

<style lang="scss" scoped>
.options {
  background-color: rgb(241, 243, 245);
  border: 1px solid lightgray;
  .option-list {
    & > div {
      margin-bottom: 0.5rem;
    }
  }
}

.control-buttons {
  &::v-deep(span.anticon svg) {
    vertical-align: baseline;
  }
  &::v-deep(label span:last-child) {
    width: 100%;
  }
}
</style>
