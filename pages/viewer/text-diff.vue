<script setup lang="ts">
import PageTitle from "@/components/common/PageTitle.vue";
import TextDifferenceChecker from "~/components/viewer/TextDifferenceChecker.vue";
</script>

<template>
  <Head>
    <Title>Text Difference Checker</Title>
    <Meta name="description" content="View text differences with display in github-like representation." />
  </Head>
  <PageTitle title="Text Difference Checker" />
  <Card>
    <template #content>
      <TextDifferenceChecker />
    </template>
  </Card>
</template>

<style scoped lang="scss"></style>
