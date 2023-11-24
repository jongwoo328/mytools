<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import { v4 } from "uuid";
import JSONResultList from "@/components/formatter/JSONResultList.vue";
import { JSONResult } from "@/types/JSONResult";
import PageHeading from "@/components/common/PageHeading.vue";
import ToolPageLayout from "~/components/common/ToolPageLayout.vue";

const { t } = useI18n();
const localePath = useLocalePath();

useJsonld(() => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: t("title"),
      item: `https://tools.jongwoo.me${localePath("/")}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "JSON Formatter",
      item: `https://tools.jongwoo.me${localePath("/formatter/json")}`,
    },
  ],
}));

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
    <Title>{{ t("formatter.json.head.title") }}</Title>
    <Meta name="description" :content="t('formatter.json.head.description')" />
  </Head>
  <ToolPageLayout :title="t('formatter.json.title')">
    <PageHeading class="d-block align-middle" :level="2" :size="6" weight="600" style="height: 44px; line-height: 2">
      {{ t("formatter.json.json_text_input_label") }}
    </PageHeading>
    <Textarea
      auto-resize
      v-model:model-value="jsonInput"
      style="min-height: 400px"
      class="prevent-auto-zoom d-block w-100"
    />
    <div v-if="isJsonValid" style="height: 14px"></div>
    <span v-else class="float-end text-danger">
      {{ t("formatter.json.json_text_input_invalid_message") }}
    </span>
    <Button class="mt-2 w-100 d-block" :disabled="!isJsonValid" @click="onFormatButtonClick" size="large">
      {{ t("formatter.json.json_format_btn_label") }}
    </Button>
    <JSONResultList v-model:results="JSONFormatResults" />
  </ToolPageLayout>
</template>
