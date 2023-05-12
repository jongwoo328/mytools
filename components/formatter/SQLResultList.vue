<script lang="ts" setup>
import SQLResultListItem from "@/components/formatter/SQLResultListItem.vue";
import { SQLResult } from "@/types/SQLResult";
import ResultDivider from "@/components/common/ResultDivider.vue";

const props = defineProps<{ results: SQLResult[] }>();
const emit = defineEmits<{
  (e: "update:results", results: SQLResult[]): void;
}>();
const onClickDelete = (id: string) => {
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
  <ResultDivider v-if="results.length > 0" align="center" color="#f0f2f5"> Results </ResultDivider>
  <section class="d-flex flex-column-reverse">
    <SQLResultListItem
      v-for="(result, idx) in results"
      :key="result.id"
      :index="idx"
      :result-data="result"
      @delete="onClickDelete"
    >
    </SQLResultListItem>
  </section>
</template>
