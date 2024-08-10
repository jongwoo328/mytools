<script setup lang="ts">
import { computed, type Ref, ref } from "vue";
import { format } from "sql-formatter";
import { v4 } from "uuid";
import type { SelectableSQLLanguage, SQLResult } from "@/types/SQLResult";
import SQLResultList from "@/components/formatter/SQLResultList.vue";
import PageHeading from "@/components/common/PageHeading.vue";
import ToolPageLayout from "~/components/common/ToolPageLayout.vue";

const { t } = useI18n();
const localePath = useLocalePath();

useJsonld(() => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: t("title"),
      item: `https://tools.jongwoo.me${localePath("/")}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "SQL Formatter",
      item: `https://tools.jongwoo.me${localePath("/formatter/sql")}`,
    },
  ],
}));

const SQLFormatterResults: Ref<SQLResult[]> = ref([]);
const sqlLanguageOptions = [
  {
    label: t("formatter.sql.sql_language_options.sql"),
    value: "sql",
  },
  {
    label: t("formatter.sql.sql_language_options.mysql"),
    value: "mysql",
  },
  {
    label: t("formatter.sql.sql_language_options.mariadb"),
    value: "mariadb",
  },
  {
    label: t("formatter.sql.sql_language_options.transactsql"),
    value: "transactsql",
  },
  {
    label: t("formatter.sql.sql_language_options.postgresql"),
    value: "postgresql",
  },
  {
    label: t("formatter.sql.sql_language_options.amazonredshift"),
    value: "redshift",
  },
  {
    label: t("formatter.sql.sql_language_options.spark"),
    value: "spark",
  },
  {
    label: t("formatter.sql.sql_language_options.snowflake"),
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
    <Title>{{ t("formatter.sql.head.title") }}</Title>
    <Meta name="description" :content="t('formatter.sql.head.description')" />
  </Head>
  <ToolPageLayout :title="t('formatter.sql.title')">
    <div class="mb-2 d-flex justify-content-between align-items-center">
      <PageHeading class="d-inline-block m-0" :level="2" :size="6" weight="600">
        {{ t("formatter.sql.sql_input_label") }}
      </PageHeading>
      <Select
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
    <span v-else class="float-end text-danger">
      {{ t("formatter.sql.sql_input_invalid_message") }}
    </span>
    <Button class="mt-2 d-block w-100" :disabled="!isSQLValid" size="large" @click="onFormatButtonClick">
      {{ t("formatter.sql.sql_format_btn_label") }}
    </Button>
    <SQLResultList v-model:results="SQLFormatterResults" />
  </ToolPageLayout>
</template>
