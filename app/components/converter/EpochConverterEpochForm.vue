<script lang="ts" setup>
import { computed, type Ref, ref } from "vue";
import { DateTime, SystemZone } from "luxon";
import { EpochTimeConvertTimeUnit, offsetList } from "~~/constants/time";
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
  <div class="grid grid-cols-12 justify-between">
    <div class="col-span-full flex flex-col items-center justify-center lg:col-span-5">
      <div class="m-0 mb-1 flex w-full justify-between">
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
      <InputNumber class="input-number w-full" input-class="prevent-auto-zoom" v-model:model-value="epochInput" />
    </div>
    <div class="col-span-full flex items-center justify-center lg:col-span-2">
      <Button class="hidden h-[40px] lg:block" icon="pi pi-angle-right" outlined disabled />
      <Button class="my-4 lg:hidden" icon="pi pi-angle-down" outlined disabled />
    </div>
    <div class="col-span-full lg:col-span-5">
      <div class="mb-1 grid grid-cols-12 justify-start">
        <div class="col-span-6 mb-1 xl:col-span-4">
          <Checkbox binary v-model:model-value="useTimeDelimiter" id="useDelimiter" />
          <label class="ml-1" for="useDelimiter">
            {{ t("converter.epoch.epoch_to_iso8601.options.use_delimiter") }}
          </label>
        </div>
        <div class="col-span-6 mb-1 xl:col-span-4">
          <Checkbox binary v-model:model-value="useOffset" id="useOffset" />
          <label class="ml-1" for="useOffset">
            {{ t("converter.epoch.epoch_to_iso8601.options.use_offset") }}
          </label>
        </div>
        <div class="col-span-full mb-1 lg:col-span-6 xl:col-span-5 2xl:col-span-4">
          <Checkbox binary v-model:model-value="omitMilliseconds" id="omitMilliseconds" />
          <label class="ml-2" for="omitMilliseconds">
            {{ t("converter.epoch.epoch_to_iso8601.options.omit_milliseconds") }}
          </label>
        </div>
      </div>
      <div class="m-0" style="height: 38px">
        <span class="formatted-time common-border-radius mb-0 flex h-full w-full items-center pl-2">
          {{ ISODateTime }}
        </span>
      </div>
      <div class="mt-2 mb-0 w-full">
        <Select
          :options="offsetList"
          option-value="value"
          option-label="label"
          v-model:model-value="offset"
          class="w-full"
        />
      </div>
      <Button class="mt-2 block w-full" @click="onClickCopy">
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
