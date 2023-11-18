<script setup lang="ts">
import TextDifferenceChecker from "~/components/viewer/TextDifferenceChecker.vue";
import ToolPageLayout from "~/components/common/ToolPageLayout.vue";

const { t: $t } = useI18n();
const localePath = useLocalePath();

useJsonld(() => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: $t("title"),
      item: `https://tools.jongwoo.me${localePath("/")}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: $t("viewer.text-diff.title"),
      item: `https://tools.jongwoo.me${localePath("/viewer/text-diff")}`,
    },
  ],
}));
</script>

<template>
  <Head>
    <Title>{{ $t("viewer.text-diff.head.title") }}</Title>
    <Meta name="description" :content="$t('viewer.text-diff.head.description')" />
  </Head>
  <ToolPageLayout :title="$t('viewer.text-diff.title')">
    <Card>
      <template #content>
        <TextDifferenceChecker />
      </template>
    </Card>
  </ToolPageLayout>
</template>

<style scoped lang="scss"></style>
