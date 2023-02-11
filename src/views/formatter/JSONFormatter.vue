<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import { v4 } from "uuid";
import JSONResultList from "@/components/formatter/JSONResultList.vue";
import { JSONResult } from "@/types/JSONResult";

const jsonInput = ref("");
const isJsonValid = computed(() => {
  return validateJSONInput();
});
const JSONFormatResults: Ref<JSONResult[]> = ref([]);

const validateJSONInput = () => {
  try {
    JSON.parse(jsonInput.value);
    return true;
  } catch (err) {
    return false;
  }
};

const onFormatButtonClick = () => {
  JSONFormatResults.value.push({
    id: v4(),
    result: JSON.parse(jsonInput.value),
  });
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
      style="height: 48px"
      @click="onFormatButtonClick"
      >Format</AButton
    >
  </section>
  <JSONResultList v-model:results="JSONFormatResults" />
</template>
