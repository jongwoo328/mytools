<script lang="ts" setup>
import { computed, type Ref, ref } from "vue";
import { DateTime, FixedOffsetZone, SystemZone } from "luxon";
import { offsetList, EpochTimeConvertTimeUnit } from "@/constants/time";
import { type UnionFromAsConst } from "~/utils/type";

const { copyData } = useCopy();
const { t } = useI18n();

const defaultDateTime = DateTime.now();

const dateInput = ref(defaultDateTime.toJSDate());
const date = computed(() => {
  return DateTime.fromJSDate(dateInput.value).toFormat("yyyy-LL-dd");
});

const timeInput = ref(defaultDateTime.toJSDate());
const time = computed(() => {
  return DateTime.fromJSDate(timeInput.value).toFormat("HH:mm:ss");
});

const milliseconds = ref(Number(defaultDateTime.toFormat("S")));
const offset = ref(new SystemZone().offset(Date.now()));
const useMilliseconds = ref(false);

const resultUnit: Ref<UnionFromAsConst<typeof EpochTimeConvertTimeUnit>> = ref(EpochTimeConvertTimeUnit.SECONDS);

const resultEpoch = computed(() => {
  const millisecond = useMilliseconds.value ? milliseconds.value : 0;
  const dateTime = `${date.value}T${time.value}.${millisecond}`;

  const epochMs = DateTime.fromISO(dateTime, {
    zone: FixedOffsetZone.instance(offset.value).name,
  }).toMillis();

  switch (resultUnit.value) {
    case EpochTimeConvertTimeUnit.SECONDS:
      return Math.floor(epochMs / 1000);
    case EpochTimeConvertTimeUnit.MILLISECONDS:
      return epochMs;
    default:
      throw new TypeError(`Invalid Unit: ${resultUnit.value}`);
  }
});
const unitOptions = [
  {
    label: "s",
    value: EpochTimeConvertTimeUnit.SECONDS,
  },
  {
    label: "ms",
    value: EpochTimeConvertTimeUnit.MILLISECONDS,
  },
];

const onClickCopy = async () => {
  await copyData(resultEpoch.value.toString());
};

const setNow = () => {
  const now = DateTime.now();
  dateInput.value = now.toJSDate();
  timeInput.value = now.toJSDate();
  milliseconds.value = Number(now.toFormat("S"));
};
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="col-span-full lg:col-span-5">
      <div class="w-full mb-1 flex justify-between">
        <Button @click="setNow" severity="secondary" size="small">
          {{ t("converter.epoch.time_to_epoch.set_now_btn_label") }}
        </Button>
        <div class="flex items-center">
          <Checkbox v-model:model-value="useMilliseconds" binary id="useMilliseconds" />
          <label class="ml-1" for="useMilliseconds">
            {{ t("converter.epoch.time_to_epoch.options.use_milliseconds") }}
          </label>
        </div>
      </div>
      <div class="grid grid-cols-12">
        <div class="col-span-full" :class="{ 'xl:col-span-5': useMilliseconds, 'xl:col-span-6': !useMilliseconds }">
          <DatePicker v-model:model-value="dateInput" class="w-full h-full prevent-auto-zoom" date-format="yy-mm-dd" />
        </div>
        <div
          class="col-span-full mt-2 mt-xl-0"
          :class="{
            'col-span-12': !useMilliseconds,
            'col-span-6': useMilliseconds,
            'xl:col-span-4': useMilliseconds,
            'xl:col-span-6': !useMilliseconds,
          }"
        >
          <DatePicker
            class="w-full h-full prevent-auto-zoom"
            time-only
            v-model:model-value="timeInput"
            hour-format="24"
            show-seconds
          />
        </div>
        <div
          v-if="useMilliseconds"
          class="col-span-full mt-2 mt-xl-0"
          :class="{
            'col-span-6': useMilliseconds,
            'col-span-full': !useMilliseconds,
            'xl:col-span-3': useMilliseconds,
            'xl:col-span-6': !useMilliseconds,
          }"
        >
          <InputGroup class="">
            <InputNumber
              :min="0"
              :max="999"
              input-class="w-full prevent-auto-zoom"
              v-model:model-value="milliseconds"
            />
            <InputGroupAddon>ms</InputGroupAddon>
          </InputGroup>
        </div>
        <div class="col-span-full mt-2">
          <Select
            :options="offsetList"
            option-value="value"
            option-label="label"
            v-model:model-value="offset"
            class="w-full prevent-auto-zoom"
          />
        </div>
      </div>
    </div>
    <div class="col-span-full lg:col-span-2 flex justify-center items-center">
      <Button class="hidden lg:block h-[40px]" icon="pi pi-angle-right" outlined disable />
      <Button class="lg:hidden my-4" icon="pi pi-angle-down" outlined disabled />
    </div>
    <div class="col-span-full lg:col-span-5">
      <div class="flex w-full epoch-time-config mb-1 justify-end">
        <div>
          <SelectButton
            :options="unitOptions"
            v-model:model-value="resultUnit"
            option-label="label"
            option-value="value"
            :unselectable="true"
          />
        </div>
      </div>
      <div class="m-0 mt-2" style="height: 38px">
        <span class="h-full w-full mb-0 flex items-center epoch-time pl-2 common-border-radius">
          {{ resultEpoch }}
        </span>
      </div>
      <Button @click="onClickCopy" class="w-full block mt-2">
        {{ t("converter.epoch.time_to_epoch.copy_btn_label") }}
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.epoch-time {
  background-color: #f1f3f5;
  font-size: 1.1rem;
}

.dark-mode .epoch-time {
  background-color: #212529;
}
</style>
