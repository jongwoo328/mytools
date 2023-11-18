<script lang="ts" setup>
import EpochConverterEpochForm from "@/components/converter/EpochConverterEpochForm.vue";
import EpochConverterDateTimeForm from "@/components/converter/EpochConverterDateTimeForm.vue";
import PageHeading from "@/components/common/PageHeading.vue";
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
      name: "Epoch Converter",
      item: `https://tools.jongwoo.me${localePath("/converter/epoch")}`,
    },
  ],
}));
</script>

<template>
  <Head>
    <Title>{{ $t("converter.epoch.head.title") }}</Title>
    <Meta name="description" :content="$t('converter.epoch.head.description')" />
  </Head>
  <ToolPageLayout :title="$t('converter.epoch.title')">
    <div class="row mt-3">
      <div class="col col-12 mb-2">
        <Card>
          <template #header>
            <div class="px-4 pt-4">
              <PageHeading class="mb-4" :level="2" :size="6" weight="600">
                {{ $t("converter.epoch.epoch_to_iso8601.title") }}
              </PageHeading>
            </div>
          </template>
          <template #content>
            <EpochConverterEpochForm />
          </template>
        </Card>
      </div>
      <div class="col col-12 mt-2">
        <Card>
          <template #header>
            <div class="px-4 pt-4">
              <PageHeading :level="2" :size="6" weight="600">
                {{ $t("converter.epoch.time_to_epoch.title") }}
              </PageHeading>
            </div>
          </template>
          <template #content>
            <EpochConverterDateTimeForm />
          </template>
        </Card>
      </div>
    </div>
  </ToolPageLayout>
</template>
