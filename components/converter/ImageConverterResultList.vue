<script lang="ts" setup>
import type { ImageConverterResult } from "@/types/ImageConverterResult";
import ImageConverterResultListItem from "@/components/converter/ImageConverterResultListItem.vue";
import ResultDivider from "@/components/common/ResultDivider.vue";
import themeColors from "~/utils/themeColors";

const { t } = useI18n();
const colorMode = useColorMode();

const props = defineProps<{ results: ImageConverterResult[] }>();
const emit = defineEmits<{
  (e: "update:results", results: ImageConverterResult[]): void;
}>();
const onDelete = (id: string) => {
  const index = props.results.findIndex((result) => result.id === id);
  if (index !== -1) {
    emit(
      "update:results",
      props.results.filter((result) => result.id !== id),
    );
  }
};
</script>

<template>
  <ResultDivider v-if="results.length > 0" align="center" :color="themeColors.mainBgColor[colorMode.value]">
    {{ t("converter.image.result_list.divider_text") }}
  </ResultDivider>
  <section class="flex flex-col-reverse">
    <ImageConverterResultListItem
      v-for="(result, idx) in results"
      :key="result.id"
      :index="idx"
      :result="result"
      @delete="onDelete"
    />
  </section>
</template>
