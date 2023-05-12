<script lang="ts" setup>
import { computed, Ref, ref } from "vue";
import { DateTime, FixedOffsetZone, SystemZone } from "luxon";
import { offsetList } from "@/constants/time";
import { copyWithNotification } from "@/utils/copy";
import CommonToast from "@/components/common/CommonToast.vue";

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
const resultUnit: Ref<"s" | "ms"> = ref("s");

const resultEpoch = computed(() => {
  const millisec = useMilliseconds.value ? milliseconds.value : 0;
  const dateTime = `${date.value}T${time.value}.${millisec}`;

  const epochMs = DateTime.fromISO(dateTime, {
    zone: FixedOffsetZone.instance(offset.value).name,
  }).toMillis();

  switch (resultUnit.value) {
    case "s":
      return Math.floor(epochMs / 1000);
    case "ms":
      return epochMs;
    default:
      throw new TypeError(`Invalid Unit: ${resultUnit.value}`);
  }
});
const unitOptions = [
  {
    label: "s",
    value: "s",
  },
  {
    label: "ms",
    value: "ms",
  },
];

const onClickCopy = async () => {
  await copyWithNotification(resultEpoch.value.toString());
};

const setNow = () => {
  const now = DateTime.now();
  dateInput.value = now.toJSDate();
  timeInput.value = now.toJSDate();
  milliseconds.value = Number(now.toFormat("S"));
};
</script>

<template>
  <CommonToast />
  <div class="row">
    <div class="col col-12 col-lg-5">
      <div class="w-100 mb-1 d-flex justify-content-between">
        <Button @click="setNow" severity="secondary" size="small">Now</Button>
        <div class="d-flex align-items-center">
          <Checkbox
            v-model:model-value="useMilliseconds"
            binary
            id="useMilliseconds"
          />
          <label class="ms-2" for="useMilliseconds">Use Milliseconds</label>
        </div>
      </div>
      <div class="row">
        <div
          class="col col-12"
          :class="{ 'col-xl-5': useMilliseconds, 'col-xl-6': !useMilliseconds }"
        >
          <Calendar
            v-model:model-value="dateInput"
            class="w-100"
            date-format="yy-mm-dd"
          />
        </div>
        <div
          class="col mt-1"
          :class="{
            'col-12': !useMilliseconds,
            'col-6': useMilliseconds,
            'col-xl-4': useMilliseconds,
            'col-xl-6': !useMilliseconds,
          }"
        >
          <Calendar
            class="w-100"
            time-only
            v-model:model-value="timeInput"
            hour-format="24"
            show-seconds
          />
        </div>
        <div
          v-if="useMilliseconds"
          class="col"
          :class="{
            'col-6': useMilliseconds,
            'col-12': !useMilliseconds,
            'col-xl-3': useMilliseconds,
            'col-xl-6': !useMilliseconds,
          }"
        >
          <div class="p-inputgroup">
            <InputNumber
              :min="0"
              :max="999"
              input-class="w-100 prevent-auto-zoom"
              v-model:model-value="milliseconds"
            />
            <span class="p-inputgroup-addon">ms</span>
          </div>
        </div>
        <div class="col col-12 mt-1">
          <Dropdown
            :options="offsetList"
            option-value="value"
            option-label="label"
            v-model:model-value="offset"
            class="w-100"
          />
        </div>
      </div>
    </div>
    <div
      class="col col-12 col-lg-2 d-flex justify-content-center align-items-center"
    >
      <Button
        class="d-none d-lg-block"
        icon="pi pi-angle-right"
        outlined
        disable
      />
      <Button
        style="height: 35px"
        class="d-lg-none my-4"
        icon="pi pi-angle-down"
        outlined
        disabled
      />
    </div>
    <div class="col col-12 col-lg-5">
      <div class="d-flex w-100 epoch-time-config mb-1 justify-content-end">
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
      <div class="row m-0 mt-2" style="height: 38px">
        <span
          class="h-100 w-100 mb-0 d-flex align-items-center epoch-time ps-2 common-border-radius"
        >
          {{ resultEpoch }}
        </span>
      </div>
      <Button @click="onClickCopy" class="w-100 d-block mt-2">Copy</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.epoch-time {
  background-color: #f1f3f5;
  font-size: 1.1rem;
}
</style>