<script setup lang="ts">
import TextDifferenceChecker from "~/components/viewer/TextDifferenceChecker.vue";
import ToolPageLayout from "~/components/common/ToolPageLayout.vue";

useJsonld(() => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Tools For Developer",
      item: "https://tools.jongwoo.me",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Text Difference Checker",
      item: "https://tools.jongwoo.me/viewer/text-diff",
    },
  ],
}));
</script>

<template>
  <Head>
    <Title>Text Difference Checker</Title>
    <Meta name="description" content="View text differences with display in github-like representation." />
  </Head>
  <ToolPageLayout title="Text Difference Checker">
    <Card>
      <template #content>
        <TextDifferenceChecker />
      </template>
    </Card>
  </ToolPageLayout>
</template>

<style scoped lang="scss"></style>
