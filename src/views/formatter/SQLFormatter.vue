<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import { SelectProps } from "ant-design-vue";
import { format } from "sql-formatter";
import { v4 } from "uuid";
import { SelectableSQLLanguage, SQLResult } from "@/types/SQLResult";
import SQLResultList from "@/components/formatter/SQLResultList.vue";

const SQLFormatterResults: Ref<SQLResult[]> = ref([]);
const sqlLanguageOptions = ref<SelectProps["options"]>([
  {
    label: "SQL",
    value: "sql",
  },
  {
    label: "MySQL",
    value: "mysql",
  },
  {
    label: "MariaDB",
    value: "mariadb",
  },
  {
    label: "PostgreSQL",
    value: "postgresql",
  },
  {
    label: "Amazon Redshift",
    value: "redshift",
  },
  {
    label: "Spark",
    value: "spark",
  },
  {
    label: "Snowflake",
    value: "snowflake",
  },
]);

const sqlInput = ref("");
const sqlLanguage: Ref<SelectableSQLLanguage> = ref("sql");
const isSQLValid = computed(() => {
  try {
    format(sqlInput.value, { language: sqlLanguage.value });
  } catch (er) {
    return false;
  }
  return true;
});

const onFormatButtonClick = () => {
  SQLFormatterResults.value.push({
    id: v4(),
    sql: sqlInput.value,
    language: sqlLanguage.value,
  });
};
</script>

<template>
  <ATypographyTitle>SQL Formatter</ATypographyTitle>
  <section>
    <ATypographyTitle class="d-inline-block" :level="3">SQL</ATypographyTitle>
    <div class="float-end">
      <ASelect
        style="width: 140px"
        :options="sqlLanguageOptions"
        v-model:value="sqlLanguage"
      ></ASelect>
    </div>
    <ATextarea
      :autoSize="{
        minRows: 13,
        maxRows: 13,
      }"
      :allowClear="true"
      v-model:value="sqlInput"
    ></ATextarea>
    <div v-if="isSQLValid" style="height: 24px"></div>
    <ATypographyText v-else class="float-end" type="danger">
      Input is not valid SQL
    </ATypographyText>
    <AButton
      class="mt-2"
      block
      type="primary"
      :disabled="!isSQLValid"
      style="height: 48px"
      @click="onFormatButtonClick"
      >Format</AButton
    >
  </section>
  <SQLResultList v-model:results="SQLFormatterResults" />
</template>
