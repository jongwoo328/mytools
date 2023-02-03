<script setup lang="ts">
import { computed, ref } from "vue";
import { v4 } from "uuid";
import { useJSONFormatterStore } from "@/store/JSONFormatterStore";
import JSONFormatResult from "@/components/JSONFormatResult.vue";

const JSONFormatterStore = useJSONFormatterStore();
const jsonInput = ref("");
const isJsonValid = computed(() => {
  return validateJSONInput();
});

const validateJSONInput = () => {
  try {
    JSON.parse(jsonInput.value);
    return true;
  } catch (err) {
    return false;
  }
};

const onFormatButtonClick = () => {
  JSONFormatterStore.addJSONFormatResult({
    id: v4(),
    result: JSON.parse(jsonInput.value),
  });
};

const convertButtonStyle = {
  height: "48px",
};
</script>

<template>
  <ATypographyTitle>JSON Formatter</ATypographyTitle>
  <section>
    <ATypographyTitle class="d-inline-block" :level="3"
      >JSON text</ATypographyTitle
    >
    <ATextarea
      :autoSize="{
        minRows: 13,
        maxRows: 13,
      }"
      :allowClear="true"
      v-model:value="jsonInput"
    ></ATextarea>
    <div v-if="isJsonValid" style="height: 24px"></div>
    <ATypographyText v-else class="float-end" type="danger">
      Input is not valid JSON
    </ATypographyText>
    <AButton
      class="mt-2"
      block
      type="primary"
      :disabled="!isJsonValid"
      :style="convertButtonStyle"
      @click="onFormatButtonClick"
      >Format</AButton
    >
  </section>
  <section class="mt-5 d-flex flex-column-reverse">
    <JSONFormatResult
      v-for="resultData in JSONFormatterStore.getJSONFormatResults"
      :key="resultData.id"
      :json-object="resultData.result"
      :json-result-id="resultData.id"
    ></JSONFormatResult>
  </section>
</template>
