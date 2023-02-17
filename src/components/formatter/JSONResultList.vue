<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";
import JSONResultListItem from "@/components/formatter/JSONResultListItem.vue";
import { JSONResult } from "@/types/JSONResult";

const props = defineProps<{ results: JSONResult[] }>();
const emit = defineEmits<{
  (e: "update:results", results: JSONResult[]): void;
}>();
const onClickDelete = (id: string) => {
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
  <ADivider v-if="results.length > 0">Results</ADivider>
  <section class="d-flex flex-column-reverse">
    <JSONResultListItem
      v-for="(result, idx) in results"
      :key="result.id"
      :index="idx + 1"
      :result-data="result"
      @delete="onClickDelete"
    />
  </section>
</template>
