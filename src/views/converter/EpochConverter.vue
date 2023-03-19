<script lang="ts" setup>
import PageTitle from "@/components/common/PageTitle.vue";
import EpochConverterEpochForm from "@/components/converter/EpochConverterEpochForm.vue";
import EpochConverterDateTimeForm from "@/components/converter/EpochConverterDateTimeForm.vue";
</script>

<template>
  <PageTitle title="Epoch Converter" />
  <ARow>
    <ACol class="mb-2" :span="24">
      <ACard>
        <ATypographyTitle class="mb-4" :level="3">
          Epoch️<span class="mx-3">➡️</span> Time(ISO8601)
        </ATypographyTitle>
        <EpochConverterEpochForm />
      </ACard>
    </ACol>
    <ACol :span="24">
      <ACard>
        <ATypographyTitle :level="3">
          Time ️<span class="mx-3">➡️</span> Epoch
        </ATypographyTitle>
        <EpochConverterDateTimeForm />
      </ACard>
    </ACol>
  </ARow>
</template>
