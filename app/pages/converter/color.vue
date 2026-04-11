<script setup lang="ts">
import ColorConvertResult from "~/components/converter/ColorConvertResult.vue";
import ToolPageLayout from "~/components/common/ToolPageLayout.vue";
import { color, isColorString } from "use-color";

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
      name: t("converter.color.title"),
      item: `https://tools.jongwoo.me${localePath("/converter/color")}`,
    },
  ],
}));

const pickedHexColor = ref("000000");
const inputColorText = ref("#000000");
const hexInput = computed(() => {
  try {
    return color(inputColorText.value).toHex().slice(1);
  } catch {
    return "";
  }
});

const isValidColor = ref(true);
watch(inputColorText, (newVal) => {
  isValidColor.value = isColorString(newVal);
});
</script>

<template>
  <Head>
    <Title>{{ t("converter.color.head.title") }}</Title>
    <Meta name="description" :content="t('converter.color.head.description')" />
  </Head>
  <ToolPageLayout :title="t('converter.color.title')" :description="t('converter.color.description')">
    <Card>
      <template #content>
        <div class="m-0">
          <ColorPicker v-model="pickedHexColor" class="w-full" :pt="{ preview: { class: 'color-picker' } }" />
          <ColorConvertResult class="mt-4" :hex="pickedHexColor" />
        </div>
      </template>
    </Card>
    <Card class="mt-4">
      <template #content>
        <div class="m-0">
          <p>{{ t("converter.color.color_input_description") }}</p>
          <InputText v-model="inputColorText" class="w-full" :invalid="!isValidColor" />
          <p v-if="!isValidColor" class="mt-1 text-red-500">{{ t("converter.color.color_input_invalid_message") }}</p>
          <ColorConvertResult v-if="isValidColor" class="mt-4" :hex="hexInput" />
        </div>
      </template>
    </Card>
  </ToolPageLayout>
</template>

<style scoped lang="scss">
:deep(.color-picker) {
  width: 100%;
  height: 100px;
}
</style>
