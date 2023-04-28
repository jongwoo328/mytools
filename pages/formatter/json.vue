<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import { v4 } from "uuid";
import JSONResultList from "@/components/formatter/JSONResultList.vue";
import { JSONResult } from "@/types/JSONResult";
import PageTitle from "@/components/common/PageTitle.vue";
import PageHeading from "@/components/common/PageHeading.vue";

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
  <Head>
    <Title>My Tools : JSON Formatter</Title>
  </Head>
  <PageTitle title="JSON Formatter" />
  <section>
    <PageHeading
      class="d-block align-middle"
      :level="3"
      :size="6"
      weight="600"
      style="height: 44px; line-height: 2"
    >
      JSON text
    </PageHeading>
    <Textarea
      auto-resize
      v-model:model-value="jsonInput"
      style="min-height: 400px"
      class="prevent-auto-zoom d-block w-100"
    />
    <div v-if="isJsonValid" style="height: 14px"></div>
    <span v-else class="float-end text-danger"> Input is not valid JSON </span>
    <Button
      class="mt-2 w-100 d-block"
      :disabled="!isJsonValid"
      @click="onFormatButtonClick"
      size="large"
    >
      Format
    </Button>
  </section>
  <JSONResultList v-model:results="JSONFormatResults" />
</template>
