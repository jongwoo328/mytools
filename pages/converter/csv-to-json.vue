<script lang="ts" setup>
import { Ref, ref } from "vue";
import * as Papa from "papaparse";
import { ParseError, ParseResult } from "papaparse";
import { JSONResult } from "@/types/JSONResult";
import { v4 } from "uuid";
import JSONResultList from "@/components/formatter/JSONResultList.vue";
import PageHeading from "@/components/common/PageHeading.vue";
import { FileUploadSelectEvent } from "primevue/fileupload";
import { createEmptyFile, isEmptyFile } from "~/utils/file";
import ToolPageLayout from "~/components/common/ToolPageLayout.vue";

const { t: $t } = useI18n();
const localePath = useLocalePath();

useJsonld(() => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: $t("title"),
      item: `https://tools.jongwoo.me${localePath("/")}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "CSV to JSON Converter",
      item: `https://tools.jongwoo.me${localePath("/converter/csv-to-json")}`,
    },
  ],
}));

const enum CsvToJsonEncodingType {
  UTF8 = "UTF-8",
  EUC_KR = "EUC-KR",
  CP949 = "CP949",
}

const activeTabKey = ref(0);
const tabOptions = [
  {
    label: $t("converter.csv_to_json.options.input_type.text"),
    icon: "pi pi-pencil",
  },
  {
    label: $t("converter.csv_to_json.options.input_type.file"),
    icon: "pi pi-file",
  },
];
const csvTextInput = ref("");
const headerIncluded = ref(true);
const parseFromFileErrors: Ref<Array<ParseError>> = ref([]);
const encodingOptions = [
  { label: "UTF-8", value: "UTF-8" },
  { label: "EUC-KR", value: "EUC-KR" },
  { label: "CP949", value: "CP949" },
];
const selectedEncoding: Ref<CsvToJsonEncodingType> = ref(CsvToJsonEncodingType.UTF8);

const uploadFile: Ref<File> = ref(createEmptyFile());

const convertResultList: Ref<Array<JSONResult>> = ref([]);
const parseFromText = () => {
  const result = Papa.parse(csvTextInput.value, {
    header: headerIncluded.value,
    skipEmptyLines: true,
  });
  convertResultList.value.push({
    id: v4(),
    result: result.data,
  });
};
const parseFromFile = () => {
  if (!isEmptyFile(uploadFile.value)) {
    const file = uploadFile.value;
    Papa.parse(file, {
      header: headerIncluded.value,
      skipEmptyLines: true,
      encoding: selectedEncoding.value,
      complete(results: ParseResult<Record<string, object>>) {
        if (results.errors?.length) {
          parseFromFileErrors.value = results.errors;
        } else {
          convertResultList.value.push({
            id: v4(),
            result: results.data,
          });
        }
      },
    });
  }
};

const onFileChange = (event: FileUploadSelectEvent) => {
  parseFromFileErrors.value = [];
  uploadFile.value = event.files[0];
};
const onClear = () => {
  uploadFile.value = createEmptyFile();
};
</script>
<template>
  <Head>
    <Title>{{ $t("converter.csv_to_json.head.title") }}</Title>
    <Meta name="description" :content="$t('converter.csv_to_json.head.description')" />
  </Head>
  <ToolPageLayout :title="$t('converter.csv_to_json.title')">
    <div class="mb-3">
      <PageHeading :level="2" :size="6" weight="600" style="height: 44px; line-height: 2">
        {{ $t("converter.csv_to_json.csv_input_label") }}
      </PageHeading>
    </div>
    <Card>
      <template #content>
        <Panel toggleable>
          <template #header>{{ $t("converter.csv_to_json.options.label") }}</template>
          <template #default>
            <div class="row">
              <div class="col col-12 col-lg-6 d-flex justify-content-start row">
                <label class="col col-6 align-self-center" for="">
                  {{ $t("converter.csv_to_json.options.header_included.label") }}
                </label>
                <InputSwitch class="col col-6 align-self-center" v-model:model-value="headerIncluded" />
              </div>
              <div class="col col-12 col-lg-6 d-flex justify-content-start row mt-2">
                <label class="col col-6 align-self-center" for="">
                  {{ $t("converter.csv_to_json.options.encoding.label") }}
                </label>
                <Dropdown
                  :options="encodingOptions"
                  class="col col-6"
                  option-label="label"
                  option-value="value"
                  v-model:model-value="selectedEncoding"
                />
              </div>
            </div>
          </template>
        </Panel>
        <TabMenu class="mt-2 mb-3" :model="tabOptions" v-model:active-index="activeTabKey" />
        <div v-show="activeTabKey === 0">
          <Textarea
            auto-resize
            v-model:model-value="csvTextInput"
            style="min-height: 300px"
            class="prevent-auto-zoom d-block w-100"
          />
          <Button class="w-100 d-block mt-2" size="large" @click="parseFromText">
            {{ $t("converter.csv_to_json.parse_btn_label") }}
          </Button>
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
              accept="text/csv"
              mode="basic"
              custom-upload
              class="upload w-100 position-relative mb-2"
              @select="onFileChange"
              @clear="onClear"
              :choose-label="$t('converter.csv_to_json.input_file_btn_label')"
            />
          </div>
          <span v-for="(error, idx) in parseFromFileErrors" :key="idx" class="d-block text-end text-danger">
            {{ error.message }}
          </span>
          <Button class="w-100 d-block mt-2" size="large" @click="parseFromFile">
            {{ $t("converter.csv_to_json.parse_btn_label") }}
          </Button>
        </div>
      </template>
    </Card>
    <JSONResultList :results="convertResultList" />
  </ToolPageLayout>
</template>

<style lang="scss" scoped></style>
