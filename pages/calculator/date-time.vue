<script setup lang="ts">
import ToolPageLayout from "~/components/common/ToolPageLayout.vue";
import { ref } from "vue";
import DateDurationCalculator from "~/components/calculator/DateDurationCalculator.vue";
import DateDDayCalculator from "~/components/calculator/DateDDayCalculator.vue";
import { breakpointsBootstrapV5 } from "@vueuse/core";
import DateIncrementCalculator from "~/components/calculator/DateIncrementCalculator.vue";

const { t } = useI18n();
const localePath = useLocalePath();

const breakpoints = useBreakpoints(breakpointsBootstrapV5);
const isMobileOrTablet = breakpoints.smaller("lg");

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
      name: "Text Length Calculator",
      item: `https://tools.jongwoo.me${localePath("/calculator/date-time")}`,
    },
  ],
}));

const tabOptions = [
  {
    label: t("calculator.date_time.tab_options.date_difference"),
    icon: "pi pi-calendar",
    value: 0,
  },
  {
    label: t("calculator.date_time.tab_options.d_day"),
    icon: "pi pi-calendar",
    value: 1,
  },
  {
    label: t("calculator.date_time.tab_options.date_increment"),
    icon: "pi pi-calendar-plus",
    value: 2,
  },
];
const activeTabKey = ref(0);
</script>

<template>
  <Head>
    <Title>{{ t("calculator.date_time.head.title") }}</Title>
    <Meta name="description" :content="t('calculator.date_time.head.description')" />
  </Head>
  <ToolPageLayout :title="t('calculator.date_time.title')">
    <Card>
      <template #content>
        <Dropdown
          v-show="isMobileOrTablet"
          class="w-100 mb-3"
          :options="tabOptions"
          option-value="value"
          option-label="label"
          v-model:model-value="activeTabKey"
        />
        <TabMenu v-show="!isMobileOrTablet" class="mb-3" :model="tabOptions" v-model:active-index="activeTabKey" />
        <div v-if="activeTabKey === 0">
          <DateDurationCalculator />
        </div>
        <div v-else-if="activeTabKey === 1">
          <DateDDayCalculator />
        </div>
        <div v-else-if="activeTabKey === 2">
          <DateIncrementCalculator />
        </div>
      </template>
    </Card>
  </ToolPageLayout>
</template>

<style scoped lang="scss"></style>
