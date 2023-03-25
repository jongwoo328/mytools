<script lang="ts" setup>
import PageTitle from "@/components/common/PageTitle.vue";
import { Ref, ref } from "vue";
import * as Papa from "papaparse";
import { ParseError, ParseResult } from "papaparse";
import { JSONResult } from "@/types/JSONResult";
import { v4 } from "uuid";
import JSONResultList from "@/components/formatter/JSONResultList.vue";
import { InboxOutlined } from "@ant-design/icons-vue";
import { InternalUploadFile } from "ant-design-vue/es/upload/interface";

const activeTabKey = ref("text");
const activeCollapseKey = ref([]);
const csvTextInput = ref("");
const headerIncluded = ref(true);
const parseFromFileErrors: Ref<Array<ParseError>> = ref([]);
const encodingOptions = [
  { label: "UTF-8", value: "UTF-8" },
  { label: "EUC-KR", value: "EUC-KR" },
  { label: "CP949", value: "CP949" },
];
const selectedEncoding: Ref<"UTF-8" | "EUC_KR" | "CP949"> = ref("UTF-8");

const uploadFile: Ref<Array<InternalUploadFile>> = ref([]);

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
  if (uploadFile.value.length > 0) {
    const file = uploadFile.value[0].originFileObj;
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

const onFileChange = () => {
  parseFromFileErrors.value = [];
};
</script>
<template>
  <PageTitle title="CSV to JSON Converter" />
  <div class="mb-3">
    <ATypographyTitle :level="3">CSV File or Text</ATypographyTitle>
  </div>

  <ACard>
    <ACollapse :bordered="false">
      <ACollapsePanel
        v-model:activeKey="activeCollapseKey"
        :key="1"
        header="Options"
      >
        <ARow>
          <ACol class="mb-1" :span="24" :md="12">
            <label class="me-2" for="include-header">Header included</label>
            <ASwitch
              v-model:checked="headerIncluded"
              id="include-header"
              size="small"
            />
          </ACol>
          <ACol :span="24" :md="12">
            <label class="me-2" for="file-encoding">Encoding</label>
            <ASelect
              :disabled="activeTabKey === 'text'"
              size="small"
              v-model:value="selectedEncoding"
              :options="encodingOptions"
              id="file-encoding"
            />
          </ACol>
        </ARow>
      </ACollapsePanel>
    </ACollapse>
    <ATabs class="mt-2" v-model:active-key="activeTabKey" type="card">
      <ATabPane tab="Text" key="text">
        <ATextarea
          :autoSize="{
            minRows: 13,
            maxRows: 13,
          }"
          :allowClear="true"
          v-model:value="csvTextInput"
          class="prevent-auto-zoom"
        ></ATextarea>
        <AButton
          style="height: 48px"
          class="mt-2"
          @click="parseFromText"
          block
          type="primary"
          >Parse</AButton
        >
      </ATabPane>
      <ATabPane tab="File" key="file">
        <AUploadDragger
          v-model:file-list="uploadFile"
          name="file"
          :before-upload="() => false"
          :show-upload-list="true"
          accept="text/csv"
          :multiple="false"
          :max-count="1"
          @change="onFileChange"
        >
          <div v-if="uploadFile.length > 0">
            <p class="ant-upload-text">
              {{ uploadFile[0].name }}
            </p>
            <p class="ant-upload-text">
              {{ `(${uploadFile[0].size} Bytes)` }}
            </p>
          </div>
          <div v-else>
            <p class="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p class="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </div>
        </AUploadDragger>
        <ATypographyText
          v-for="(error, idx) in parseFromFileErrors"
          :key="idx"
          class="d-block text-end"
          type="danger"
        >
          {{ error.message }}
        </ATypographyText>
        <AButton
          style="height: 48px"
          class="mt-2"
          @click="parseFromFile"
          block
          type="primary"
          >Parse</AButton
        >
      </ATabPane>
    </ATabs>
  </ACard>
  <JSONResultList :results="convertResultList" />
</template>

<style lang="scss" scoped>
.ant-card {
  &::v-deep(.ant-collapse-item) {
    border: none;
  }
  &::v-deep(.ant-collapse-header) {
    align-items: center;
  }
  &::v-deep(.ant-collapse-header > div) {
    display: flex;
    align-items: center;
  }
  &::v-deep(.ant-upload.ant-upload-drag) {
    height: 200px;
  }
  &::v-deep(.ant-upload-btn) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
