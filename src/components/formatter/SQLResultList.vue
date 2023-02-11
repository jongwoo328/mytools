<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";
import SQLResultListItem from "@/components/formatter/SQLResultListItem.vue";
import { SQLResult } from "@/types/SQLResult";

const props = defineProps<{ results: SQLResult[] }>();
const emit = defineEmits<{
  (e: "update:results", results: SQLResult[]): void;
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
  <section class="mt-5 d-flex flex-column-reverse">
    <SQLResultListItem
      v-for="result in results"
      :key="result.id"
      :result-data="result"
      @delete="onClickDelete"
    >
    </SQLResultListItem>
  </section>
</template>
