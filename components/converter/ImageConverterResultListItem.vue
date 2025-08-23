<script lang="ts" setup>
import { ref } from "vue";
import type { ImageConverterResult } from "@/types/ImageConverterResult";

const { copyData } = useCopy();
const { t } = useI18n();

const props = defineProps<{ result: ImageConverterResult; index: number }>();
const emit = defineEmits<{ (e: "delete", id: string): void }>();

const discreteFileNameWithNameAndType = (fileName: string): [string, string] => {
  const index = fileName.lastIndexOf(".");
  return [fileName.substring(0, index), fileName.substring(index)];
};
const downloadFileName = ref("");
const downloadFileNamePlaceholder = ref(discreteFileNameWithNameAndType(props.result.originalName)[0]);
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
  await copyData(props.result.objectURL);
  copyingBase64.value = false;
};

const onClickDeleteResult = () => {
  emit("delete", props.result.id);
};
</script>

<template>
  <Card data-aos="fade-up" data-aos-once="true" data-aos-anchor-placement="bottom" class="pt-5 mb-2">
    <template #header>
      <div class="flex justify-between px-4" style="height: 32px">
        <div class="flex items-center px-2">
          <span class="font-bold">{{ `# ${props.index}` }}</span>
        </div>
        <div>
          <Button
            class="mr-1 px-2 h-full"
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
      <div class="grid grid-cols-12 image-result-item">
        <div class="h-full px-3 col-span-full lg:col-span-8">
          <div class="image-result-display w-full h-full flex justify-center items-center">
            <img loading="lazy" style="object-fit: contain" :src="result.objectURL" alt="" />
          </div>
        </div>
        <div class="col-span-full lg:col-span-4 py-3 lg:py-0 flex flex-col justify-between image-result-control">
          <div class="flex w-full flex-col justify-start" style="flex: 1">
            <span class="fs-5">{{ t("converter.image.result_list.file_name_label") }}</span>
            <div class="flex">
              <InputText
                v-model:model-value="downloadFileName"
                :placeholder="downloadFileNamePlaceholder"
                style="flex: 1"
              />
              <span class="self-center" style="font-size: 1.2rem; padding-left: 10px">
                {{ "." + props.result.type.split("/").at(-1) }}
              </span>
            </div>
          </div>
          <Button
            class="mt-3 lg:mt-0 mb-2 block"
            @click="copyAsBase64"
            :disabled="copyingBase64"
            severity="secondary"
            style="height: 44px"
          >
            <template v-if="copyingBase64">
              <ProgressSpinner class="h-full" strokeWidth="10" />
            </template>
            <template v-else>
              {{ t("converter.image.result_list.actions.copy_as_base64_btn_label") }}
            </template>
          </Button>
          <Button class="block" @click="onClickDownload" severity="primary" style="height: 44px">
            {{ t("converter.image.result_list.actions.download_btn_label") }}
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
    & > div {
      width: 70%;
    }

    & > button.download {
      height: 20%;
    }
  }
}
</style>
