<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";
import { ImageConverterResult } from "@/types/ImageConverterResult";
import ImageConverterResultListItem from "@/components/converter/ImageConverterResultListItem.vue";

const props = defineProps<{ results: ImageConverterResult[] }>();
const emit = defineEmits<{
  (e: "update:results", results: ImageConverterResult[]): void;
}>();
const onDelete = (id: string) => {
  const index = props.results.findIndex((result) => result.id === id);
  if (index !== -1) {
    emit(
      "update:results",
      props.results.filter((result) => result.id !== id)
    );
  }
};
</script>

<template>
  <section class="mt-5 d-flex flex-column-reverse">
    <ImageConverterResultListItem
      v-for="result in results"
      :key="result.id"
      :result="result"
      @delete="onDelete"
    />
  </section>
</template>
