<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import { format } from "sql-formatter";
import { v4 } from "uuid";
import { SelectableSQLLanguage, SQLResult } from "@/types/SQLResult";
import SQLResultList from "@/components/formatter/SQLResultList.vue";
import PageTitle from "@/components/common/PageTitle.vue";
import PageHeading from "@/components/common/PageHeading.vue";

const SQLFormatterResults: Ref<SQLResult[]> = ref([]);
const sqlLanguageOptions = [
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
    label: "Transact-SQL",
    value: "transactsql",
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
];

const sqlInput = ref("");
const sqlLanguage = ref<SelectableSQLLanguage>("sql");
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
  <Head>
    <Title>SQL Formatter</Title>
  </Head>
  <PageTitle title="SQL Formatter" />
  <section>
    <div class="mb-2 d-flex justify-content-between align-items-center">
      <PageHeading class="d-inline-block m-0" :level="3" :size="6" weight="600"> SQL</PageHeading>
      <Dropdown
        size="small"
        :options="sqlLanguageOptions"
        option-label="label"
        option-value="value"
        v-model:model-value="sqlLanguage"
      />
    </div>
    <Textarea
      auto-resize
      v-model:model-value="sqlInput"
      style="min-height: 400px"
      class="prevent-auto-zoom d-block w-100"
    />
    <div v-if="isSQLValid" style="height: 14px"></div>
    <span v-else class="float-end text-danger"> Input is not valid SQL </span>
    <Button class="mt-2 d-block w-100" :disabled="!isSQLValid" size="large" @click="onFormatButtonClick">
      Format
    </Button>
  </section>
  <SQLResultList v-model:results="SQLFormatterResults" />
</template>
