<script setup lang="ts">
import { computed, type Ref, ref } from "vue";
import { v4 } from "uuid";
import JSONResultList from "~/components/formatter/JSONResultList.vue";
import type { JSONResult } from "~~/types/JSONResult";
import PageHeading from "~/components/common/PageHeading.vue";
import ToolPageLayout from "~/components/common/ToolPageLayout.vue";
import { json } from "@codemirror/lang-json";

const { codemirrorTheme } = useCodeMirror();

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
  } catch {
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
    <PageHeading class="block align-middle" :level="2" :size="6" weight="600" style="height: 44px; line-height: 2">
      {{ t("formatter.json.json_text_input_label") }}
    </PageHeading>
    <div class="common-border-radius overflow-hidden border border-gray-300 dark:border-gray-800">
      <Codemirror v-model="jsonInput" class="font-monospace-code json-input" :extensions="[json(), codemirrorTheme]" />
    </div>
    <div v-if="isJsonValid" style="height: 14px"></div>
    <span v-else class="float-end text-red-600">
      {{ t("formatter.json.json_text_input_invalid_message") }}
    </span>
    <Button class="mt-4 block w-full" :disabled="!isJsonValid" @click="onFormatButtonClick" size="large">
      {{ t("formatter.json.json_format_btn_label") }}
    </Button>
    <JSONResultList v-model:results="JSONFormatResults" />
  </ToolPageLayout>
</template>

<style lang="scss" scoped>
.json-input:deep(.cm-editor, .cm-scroller) {
  min-height: 300px;
}
</style>
