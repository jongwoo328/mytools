<script lang="ts" setup>
import { computed, Ref, ref } from "vue";
import { DateTime, SystemZone } from "luxon";
import { offsetList } from "@/constants/time";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons-vue";
import { copyWithNotification } from "@/utils/copy";

const epochInput = ref(DateTime.now().toUnixInteger());
const unit: Ref<"s" | "ms"> = ref("s");
const unitOptions = [
  { label: "s", value: "s" },
  { label: "ms", value: "ms" },
];
const offset = ref(new SystemZone().offset(Date.now()));

const ISODateTime = computed(() => {
  let isoFormattedTime;
  const option = {
    includeOffset: useOffset.value,
    suppressMilliseconds: omitMilliseconds.value,
  };
  switch (unit.value) {
    case "s":
      isoFormattedTime = DateTime.fromSeconds(epochInput.value)
        .toUTC(offset.value)
        .toISO(option);
      break;
    case "ms":
      isoFormattedTime = DateTime.fromMillis(epochInput.value)
        .toUTC(offset.value)
        .toISO(option);
      break;
    default:
      return `Invalid Unit: ${unit.value}`;
  }

  if (useTimeDelimiter.value) {
    return isoFormattedTime;
  }
  return isoFormattedTime.replace("T", " ");
});

const useTimeDelimiter = ref(true);
const useOffset = ref(true);
const omitMilliseconds = ref(false);

const onClickCopy = async () => {
  await copyWithNotification(ISODateTime.value);
};
const setNow = () => {
  epochInput.value = Date.now();
  unit.value = "ms";
};
</script>

<template>
  <ARow justify="space-between">
    <ACol :span="24" :lg="11">
      <ARow class="mb-1" justify="space-between">
        <ACol>
          <AButton @click="setNow">Now</AButton>
        </ACol>
        <ACol>
          <ARadioGroup
            option-type="button"
            v-model:value="unit"
            :options="unitOptions"
          />
        </ACol>
      </ARow>
      <AInputNumber
        size="large"
        class="w-100 input-number"
        :controls="false"
        v-model:value="epochInput"
      />
    </ACol>
    <ACol class="my-2 m-lg-0" :span="24" :lg="2">
      <ARow class="w-100 h-100 d-flex m-0 align-items-center" justify="center">
        <CaretDownOutlined class="h4 d-lg-none" />
        <CaretRightOutlined class="h4 d-none d-lg-block" />
      </ARow>
    </ACol>
    <ACol :span="24" :lg="11">
      <ARow class="mb-1 iso-format-config" align="middle">
        <ACheckbox v-model:checked="useTimeDelimiter">Use Delimiter</ACheckbox>
        <ACheckbox v-model:checked="useOffset">Use Offset</ACheckbox>
        <ACheckbox v-model:checked="omitMilliseconds"
          >Omit Milliseconds</ACheckbox
        >
      </ARow>
      <ARow style="height: 38px">
        <ATypographyText
          class="h-100 w-100 mb-0 d-flex align-items-center formatted-time ps-2"
        >
          {{ ISODateTime }}
        </ATypographyText>
      </ARow>
      <ARow>
        <ASelect
          v-model:value="offset"
          class="w-100 my-1"
          :options="offsetList"
        />
      </ARow>
      <AButton class="mt-2" block type="primary" @click="onClickCopy"
        >Copy</AButton
      >
    </ACol>
  </ARow>
</template>

<style lang="scss" scoped>
.input-number {
  &::v-deep(input) {
    text-align: end;
  }
}

.formatted-time {
  background-color: #f1f3f5;
  font-size: 1.1rem;
}

.iso-format-config {
  height: initial;
}

@media (min-width: 992px) {
  .iso-format-config {
    min-height: 32px;
  }
}
</style>
