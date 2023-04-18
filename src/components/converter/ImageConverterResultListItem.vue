<script lang="ts" setup>
import { defineEmits, defineProps, ref } from "vue";
import { ImageConverterResult } from "@/types/ImageConverterResult";
import { copyWithNotification } from "@/utils/copy";
import Card from "primevue/card";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import ProgressSpinner from "primevue/progressspinner";
import CommonToast from "@/components/common/CommonToast.vue";

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

const copyingBase64 = ref(false);
const copyAsBase64 = async () => {
  copyingBase64.value = true;
  await copyWithNotification(props.result.objectURL);
  copyingBase64.value = false;
};

const onClickDeleteResult = () => {
  emit("delete", props.result.id);
};
</script>

<template>
  <CommonToast />
  <Card
    data-aos="fade-up"
    data-aos-once="true"
    data-aos-anchor-placement="bottom"
    class="pt-5 mb-2"
  >
    <template #header>
      <div class="d-flex justify-content-between px-4" style="height: 32px">
        <div class="d-flex align-items-center px-2">
          <span class="fw-bold">{{ `# ${props.index}` }}</span>
        </div>
        <div>
          <Button
            class="me-1 px-2 h-100"
            severity="danger"
            size="small"
            style="width: 32px"
            @click="onClickDeleteResult"
            icon="pi pi-trash"
          >
          </Button>
        </div>
      </div>
    </template>
    <template #content>
      <div class="row image-result-item">
        <div class="h-100 px-3 col col-12 col-lg-8">
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
        </div>
        <div class="col col-12 col-lg-4 py-3 py-lg-0 image-result-control">
          <div
            class="d-flex w-100 flex-column justify-content-start"
            style="flex: 1"
          >
            <span class="fs-5">Download as:</span>
            <div class="d-flex">
              <InputText
                v-model:model-value="downloadFileName"
                :placeholder="downloadFileNamePlaceholder"
                style="flex: 1"
              />
              <span
                class="align-self-center"
                style="font-size: 1.2rem; padding-left: 10px"
              >
                {{ "." + props.result.type.split("/").at(-1) }}
              </span>
            </div>
          </div>
          <Button
            class="mt-3 mt-lg-0 mb-2 d-block"
            @click="copyAsBase64"
            :disabled="copyingBase64"
            severity="secondary"
            style="height: 44px"
          >
            <template v-if="copyingBase64">
              <ProgressSpinner class="h-100" strokeWidth="10" />
            </template>
            <template v-else> Copy as Base64 </template>
          </Button>
          <Button
            class="d-block"
            @click="onClickDownload"
            severity="primary"
            style="height: 44px"
          >
            Download
          </Button>
        </div>
      </div>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.image-result-item {
  max-height: 600px;
}

.image-result-display {
  max-height: 550px;
  & img {
    max-height: 450px;
    max-width: 100%;
  }
}

.skeleton-image {
  height: 300px;
}

.image-result-control {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > button.download {
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
    & > button.download {
      height: 20%;
    }
  }
}
</style>
