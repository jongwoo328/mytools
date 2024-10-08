<script lang="ts" setup>
import { computed, type Ref, ref } from "vue";
import { DateTime, SystemZone } from "luxon";
import { EpochTimeConvertTimeUnit, offsetList } from "@/constants/time";
import { type UnionFromAsConst } from "~/utils/type";

const { copyData } = useCopy();
const { t } = useI18n();

const epochInput = ref(DateTime.now().toUnixInteger());
const unit: Ref<UnionFromAsConst<typeof EpochTimeConvertTimeUnit>> = ref(EpochTimeConvertTimeUnit.SECONDS);
const unitOptions = [
  { label: "s", value: EpochTimeConvertTimeUnit.SECONDS },
  { label: "ms", value: EpochTimeConvertTimeUnit.MILLISECONDS },
];
const offset = ref(new SystemZone().offset(Date.now()));

const ISODateTime = computed(() => {
  let isoFormattedTime;
  let dateTime;
  const option = {
    includeOffset: useOffset.value,
    suppressMilliseconds: omitMilliseconds.value,
  };
  switch (unit.value) {
    case EpochTimeConvertTimeUnit.SECONDS:
      dateTime = DateTime.fromSeconds(epochInput.value);
      isoFormattedTime = dateTime
        .set({
          millisecond: omitMilliseconds.value ? 0 : dateTime.millisecond,
        })
        .toUTC(offset.value)
        .toISO(option);
      break;
    case EpochTimeConvertTimeUnit.MILLISECONDS:
      dateTime = DateTime.fromMillis(epochInput.value);
      isoFormattedTime = dateTime
        .set({
          millisecond: omitMilliseconds.value ? 0 : dateTime.millisecond,
        })
        .toUTC(offset.value)
        .toISO(option);
      break;
    default:
      return `Invalid Unit: ${unit.value}`;
  }

  if (isoFormattedTime === null) {
    return "Invalid Date";
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
  await copyData(ISODateTime.value);
};
const setNow = () => {
  epochInput.value = Date.now();
  unit.value = EpochTimeConvertTimeUnit.MILLISECONDS;
};
</script>

<template>
  <div class="row justify-content-between">
    <div class="col col-12 col-lg-5 d-flex flex-column justify-content-center align-items-center">
      <div class="w-100 m-0 mb-1 d-flex flex-row justify-content-between">
        <Button size="small" severity="secondary" @click="setNow">
          {{ t("converter.epoch.epoch_to_iso8601.set_now_btn_label") }}
        </Button>
        <SelectButton
          :options="unitOptions"
          v-model:model-value="unit"
          option-label="label"
          option-value="value"
          :unselectable="true"
        />
      </div>
      <InputNumber class="w-100 input-number" input-class="prevent-auto-zoom" v-model:model-value="epochInput" />
    </div>
    <div class="col col-12 col-lg-2 d-flex justify-content-center align-items-center">
      <Button class="d-none d-lg-block" icon="pi pi-angle-right" outlined disable />
      <Button style="height: 35px" class="d-lg-none my-4" icon="pi pi-angle-down" outlined disabled />
    </div>
    <div class="col col-12 col-lg-5">
      <div class="row d-flex mb-1 justify-content-start">
        <div class="col-6 col-lg-6 col-xl-4 mb-1">
          <Checkbox binary v-model:model-value="useTimeDelimiter" id="useDelimiter" />
          <label class="ms-1" for="useDelimiter">
            {{ t("converter.epoch.epoch_to_iso8601.options.use_delimiter") }}
          </label>
        </div>
        <div class="col-6 col-lg-6 col-xl-4 mb-1">
          <Checkbox binary v-model:model-value="useOffset" id="useOffset" />
          <label class="ms-2" for="useOffset">
            {{ t("converter.epoch.epoch_to_iso8601.options.use_offset") }}
          </label>
        </div>
        <div class="col-12 col-lg-6 col-xl-5 col-xxl-4 mb-1">
          <Checkbox binary v-model:model-value="omitMilliseconds" id="omitMilliseconds" />
          <label class="ms-2" for="omitMilliseconds">
            {{ t("converter.epoch.epoch_to_iso8601.options.omit_milliseconds") }}
          </label>
        </div>
      </div>
      <div class="row m-0" style="height: 38px">
        <span class="h-100 w-100 mb-0 d-flex align-items-center formatted-time ps-2 common-border-radius">
          {{ ISODateTime }}
        </span>
      </div>
      <div class="w-100 mb-0 mt-2">
        <Select
          :options="offsetList"
          option-value="value"
          option-label="label"
          v-model:model-value="offset"
          class="w-100"
        />
      </div>
      <Button class="mt-2 d-block w-100" @click="onClickCopy">
        {{ t("converter.epoch.epoch_to_iso8601.copy_btn_label") }}
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.formatted-time {
  background-color: #f1f3f5;
  font-size: 1.1rem;
}

.dark-mode .formatted-time {
  background-color: #212529;
}
</style>
