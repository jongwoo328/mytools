<script lang="ts" setup>
import PageTitle from "@/components/common/PageTitle.vue";
import { Ref, ref } from "vue";
import * as Papa from "papaparse";
import { ParseError, ParseResult } from "papaparse";
import { JSONResult } from "@/types/JSONResult";
import { v4 } from "uuid";
import JSONResultList from "@/components/formatter/JSONResultList.vue";
import PageHeading from "@/components/common/PageHeading.vue";
import { FileUploadSelectEvent } from "primevue/fileupload";
import { createEmptyFile, isEmptyFile } from "~/utils/file";

const enum CsvToJsonEncodingType {
  UTF8 = "UTF-8",
  EUC_KR = "EUC-KR",
  CP949 = "CP949",
}

const activeTabKey = ref(0);
const tabOptions = [
  { label: "Text", icon: "pi pi-pencil" },
  { label: "File", icon: "pi pi-file" },
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
    <Title>CSV to JSON Converter</Title>
    <Meta name="description" content="Converting CSV to JSON. Upload file is also available." />
  </Head>
  <PageTitle title="CSV to JSON Converter" />
  <div class="mb-3">
    <PageHeading :level="2" :size="6" weight="600" style="height: 44px; line-height: 2"> CSV File or Text</PageHeading>
  </div>
  <Card>
    <template #content>
      <Panel toggleable>
        <template #header>Configuration</template>
        <template #default>
          <div class="row">
            <div class="col col-12 col-lg-6 d-flex justify-content-start row">
              <label class="col col-6 align-self-center" for="">Header Included</label>
              <InputSwitch class="col col-6 align-self-center" v-model:model-value="headerIncluded" />
            </div>
            <div class="col col-12 col-lg-6 d-flex justify-content-start row mt-2">
              <label class="col col-6 align-self-center" for="">Encoding</label>
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
        <Button class="w-100 d-block mt-2" size="large" @click="parseFromText"> Parse</Button>
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
            class="upload w-100 position-relative mb-2"
            @select="onFileChange"
            @clear="onClear"
          />
        </div>
        <span v-for="(error, idx) in parseFromFileErrors" :key="idx" class="d-block text-end text-danger">
          {{ error.message }}
        </span>
        <Button class="w-100 d-block mt-2" size="large" @click="parseFromFile"> Parse</Button>
      </div>
    </template>
  </Card>
  <JSONResultList :results="convertResultList" />
</template>

<style lang="scss" scoped></style>
