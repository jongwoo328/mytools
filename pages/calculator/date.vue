<script setup lang="ts">
import ToolPageLayout from "~/components/common/ToolPageLayout.vue";
import { ref } from "vue";
import DateDurationCalculator from "~/components/calculator/DateDurationCalculator.vue";
import DateDDayCalculator from "~/components/calculator/DateDDayCalculator.vue";
import { breakpointsBootstrapV5 } from "@vueuse/core";
import DateIncremetCalculator from "~/components/calculator/DateIncremetCalculator.vue";

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
      item: `https://tools.jongwoo.me${localePath("/calculator/date")}`,
    },
  ],
}));

const tabOptions = [
  {
    label: "날짜(시간) 간격 계산",
    icon: "pi pi-calendar",
    value: 0,
  },
  {
    label: "D-Day 계산",
    icon: "pi pi-calendar",
    value: 1,
  },
  {
    label: "날짜(시간) 증분 계산",
    icon: "pi pi-calendar-plus",
    value: 2,
  },
];
const activeTabKey = ref(0);
</script>

<template>
  <Head>
    <Title>타이틀</Title>
    <Meta name="description" content="설명" />
  </Head>
  <ToolPageLayout title="날짜 계산기">
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
          <DateIncremetCalculator />
        </div>
      </template>
    </Card>
  </ToolPageLayout>
</template>

<style scoped lang="scss"></style>
