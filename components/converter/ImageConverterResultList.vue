<script lang="ts" setup>
import { ImageConverterResult } from "@/types/ImageConverterResult";
import ImageConverterResultListItem from "@/components/converter/ImageConverterResultListItem.vue";
import ResultDivider from "@/components/common/ResultDivider.vue";

const { t } = useI18n();

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
  <ResultDivider v-if="results.length > 0" align="center" color="#f0f2f5">
    {{ t("converter.image.result_list.divider_text") }}
  </ResultDivider>
  <section class="d-flex flex-column-reverse">
    <ImageConverterResultListItem
      v-for="(result, idx) in results"
      :key="result.id"
      :index="idx"
      :result="result"
      @delete="onDelete"
    />
  </section>
</template>
