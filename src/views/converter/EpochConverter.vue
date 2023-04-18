<script lang="ts" setup>
import PageTitle from "@/components/common/PageTitle.vue";
import EpochConverterEpochForm from "@/components/converter/EpochConverterEpochForm.vue";
import EpochConverterDateTimeForm from "@/components/converter/EpochConverterDateTimeForm.vue";
import PageHeading from "@/components/common/PageHeading.vue";
import Card from "primevue/card";
</script>

<template>
  <PageTitle title="Epoch Converter" />
  <div class="row mt-3">
    <div class="col col-12 mb-2">
      <Card>
        <template #header>
          <div class="px-4 pt-4">
            <PageHeading class="mb-4" :level="3" :size="6" weight="600">
              Epoch️<span class="mx-3">➡️</span> Time(ISO8601)
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
            <PageHeading :level="3" :size="6" weight="600">
              Time ️<span class="mx-3">➡️</span> Epoch
            </PageHeading>
          </div>
        </template>
        <template #content>
          <EpochConverterDateTimeForm />
        </template>
      </Card>
    </div>
  </div>
</template>
