<script lang="ts" setup>
import JSONResultListItem from "@/components/formatter/JSONResultListItem.vue";
import { JSONResult } from "@/types/JSONResult";
import ResultDivider from "@/components/common/ResultDivider.vue";

const { t } = useI18n();

const props = defineProps<{ results: JSONResult[] }>();
const emit = defineEmits<{
  (e: "update:results", results: JSONResult[]): void;
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
  <ResultDivider v-if="results.length > 0" align="center" color="#f0f2f5">
    {{ t("formatter.json.result_list.divider_text") }}
  </ResultDivider>
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
