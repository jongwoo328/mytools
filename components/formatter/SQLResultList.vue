<script lang="ts" setup>
import SQLResultListItem from "@/components/formatter/SQLResultListItem.vue";
import type { SQLResult } from "@/types/SQLResult";
import ResultDivider from "@/components/common/ResultDivider.vue";
import themeColors from "~/utils/themeColors";

const { t } = useI18n();
const colorMode = useColorMode();

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
  <ResultDivider v-if="results.length > 0" align="center" :color="themeColors.mainBgColor[colorMode.value]">
    {{ t("formatter.sql.result_list.divider_text") }}
  </ResultDivider>
  <section class="d-flex flex-column-reverse">
    <SQLResultListItem
      v-for="(result, idx) in results"
      :key="result.id"
      :index="idx"
      :result-data="result"
      @delete="onClickDelete"
    />
  </section>
</template>
