<script setup lang="ts">
import ToolPageLayout from "@/components/common/ToolPageLayout.vue";
import { ref, Ref } from "vue";
import { createEmptyFile } from "@/utils/file";
import { FileUploadSelectEvent } from "primevue/fileupload";
import PageHeading from "@/components/common/PageHeading.vue";
import { humanReadableBytes } from "~/utils/unit";

useJsonld(() => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Tools For Developer",
      item: "https://tools.jongwoo.me",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Text Length Calculator",
      item: "https://tools.jongwoo.me/calculator/text-length",
    },
  ],
}));

const tabOptions = [
  { label: "Text", icon: "pi pi-pencil" },
  { label: "File", icon: "pi pi-file" },
];
const activeTabKey = ref(0);

const textInput = ref("");
const uploadFile: Ref<File> = ref(createEmptyFile());

const onFileChange = (e: FileUploadSelectEvent) => {
  uploadFile.value = e.files[0];
};
const onClear = () => {
  uploadFile.value = createEmptyFile();
};

const readFileAsync = (file: File) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => {
      res(reader.result);
    };
    reader.onerror = rej;
    reader.readAsText(file, "UTF-8");
  });
};

const result = asyncComputed(async () => {
  let textLength = 0;
  let textLengthWithoutSpaces = 0;
  let bytes = 0;
  if (activeTabKey.value === 0) {
    // input text
    textLength = textInput.value.length;
    textLengthWithoutSpaces = textInput.value.replace(/\s/g, "").length;
    bytes = new Blob([textInput.value]).size;
  } else if (activeTabKey.value === 1) {
    // file
    const fileText = (await readFileAsync(uploadFile.value)) as string;
    textLength = fileText.length;
    textLengthWithoutSpaces = fileText.replace(/\s/g, "").length;
    bytes = new Blob([fileText]).size;
  }
  return {
    textLength: new Intl.NumberFormat("en-US").format(textLength),
    textLengthWithoutSpaces: new Intl.NumberFormat("en-US").format(textLengthWithoutSpaces),
    bytes: `${new Intl.NumberFormat("en-US").format(bytes)} (${humanReadableBytes(bytes)})`,
  };
});
</script>

<template>
  <Head>
    <Title>Text Length Calculator</Title>
    <Meta name="description" content="Calculate UTF-8 text length (with/without spaces) and bytes." />
  </Head>
  <ToolPageLayout title="Text Length Calculator">
    <Card>
      <template #content>
        <PageHeading :size="6" :level="2" weight="600">Input</PageHeading>
        <TabMenu class="mb-3" :model="tabOptions" v-model:active-index="activeTabKey" />
        <div v-show="activeTabKey === 0">
          <Textarea
            v-model:model-value.lazy="textInput"
            style="min-height: 300px"
            class="prevent-auto-zoom d-block w-100"
          />
        </div>
        <div v-show="activeTabKey === 1">
          <div
            style="min-height: 200px; border: 1px solid #ced4da"
            class="d-flex flex-column justify-content-center align-items-center common-border-radius"
          >
            <FileUpload
              :show-upload-button="false"
              :show-cancel-button="false"
              :multiple="false"
              accept="text/*, application/json,
              application/ld+json, application/xml, application/yaml,
              application/x-sh, application/xhtml+xml"
              mode="basic"
              custom-upload
              class="w-100 position-relative mb-2"
              @select="onFileChange"
              @clear="onClear"
            />
          </div>
        </div>
        <PageHeading class="mt-4" :size="6" :level="2" weight="600"> Result</PageHeading>
        <div class="row mt-4">
          <p class="col col-6">Length</p>
          <p class="col col-6">: {{ result?.textLength ?? "0" }}</p>
          <p class="col col-6">Length (Without spaces)</p>
          <p class="col col-6">: {{ result?.textLengthWithoutSpaces ?? "0" }}</p>
          <p class="col col-6">Bytes</p>
          <p class="col col-6">: {{ result?.bytes ?? "0" }}</p>
        </div>
      </template>
    </Card>
  </ToolPageLayout>
</template>

<style scoped lang="scss"></style>
