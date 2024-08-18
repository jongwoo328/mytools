<script setup lang="ts">
import PageHeading from "~/components/common/PageHeading.vue";
import Text from "~/components/common/Text.vue";
import { ref } from "vue";
import { DateTime, Duration } from "luxon";
import { breakpointsBootstrapV5 } from "@vueuse/core";

const { t } = useI18n();
const breakpoints = useBreakpoints(breakpointsBootstrapV5);
const isMobileOrTablet = breakpoints.smaller("lg");

const inputDateFrom = ref<Date>();
const inputTimeFrom = ref<Date>();
const useTimeFrom = ref(false);
const disableUseTimeFrom = ref(false);
const inputDateTo = ref<Date>();
const inputTimeTo = ref<Date>();
const setStartDateToNow = ref(false);
const disableSetStartDateToNow = ref(false);

const useTimeTo = ref(false);
const disableUseTimeTo = ref(false);
const includeEndDate = ref(false);
const disableIncludeEndDate = ref(false);
const setEndDateToNow = ref(false);
const disableSetEndDateToNow = ref(false);

const dateFrom = computed(() => {
  return DateTime.fromJSDate(inputDateFrom.value as Date).set({
    hour: inputTimeFrom.value?.getHours() ?? 0,
    minute: inputTimeFrom.value?.getMinutes() ?? 0,
    second: inputTimeFrom.value?.getSeconds() ?? 0,
    millisecond: inputTimeFrom.value?.getMilliseconds() ?? 0,
  });
});
const dateTo = computed(() => {
  return DateTime.fromJSDate(inputDateTo.value as Date).set({
    hour: inputTimeTo.value?.getHours() ?? 0,
    minute: inputTimeTo.value?.getMinutes() ?? 0,
    second: inputTimeTo.value?.getSeconds() ?? 0,
    millisecond: inputTimeTo.value?.getMilliseconds() ?? 0,
  });
});

const diff = ref<Duration>();

let animationRequestId = 0;
const animationRequest = () => {
  animationRequestId = requestAnimationFrame(updateDiff);
};
const cancelAnimationRequest = () => {
  cancelAnimationFrame(animationRequestId);
};

const updateDiff = () => {
  const estimatedDateTo = setEndDateToNow.value
    ? DateTime.now()
    : includeEndDate.value
      ? dateTo.value.plus({ days: 1 })
      : dateTo.value;
  const estimatedDateFrom = setStartDateToNow.value ? DateTime.now() : dateFrom.value;
  const newDiff = estimatedDateTo.diff(estimatedDateFrom, [
    "years",
    "months",
    "days",
    "hours",
    "minutes",
    "seconds",
    "milliseconds",
  ]);

  if (setEndDateToNow.value) {
    if ((newDiff.seconds === 0 && newDiff.seconds === diff.value?.seconds) || newDiff.seconds !== diff.value?.seconds) {
      diff.value = newDiff;
    }

    animationRequest();
    return;
  }
  if ((newDiff.seconds === 0 && newDiff.seconds === diff.value?.seconds) || newDiff.seconds !== diff.value?.seconds) {
    diff.value = newDiff;
  }

  animationRequest();
};

const displayTime = computed(() => {
  const seconds = (diff.value?.milliseconds ?? 0) > 0 ? (diff.value?.seconds ?? 0) + 1 : diff.value?.seconds;
  return {
    years: diff.value?.years ?? 0,
    months: diff.value?.months ?? 0,
    days: diff.value?.days ?? 0,
    hours: diff.value?.hours ?? 0,
    minutes: diff.value?.minutes ?? 0,
    seconds,
  };
});

onMounted(() => {
  const current = DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toJSDate();
  inputDateFrom.value = current;
  inputTimeFrom.value = current;
  inputDateTo.value = current;
  inputTimeTo.value = current;

  animationRequest();
});

watch(useTimeTo, (value) => {
  if (value) {
    includeEndDate.value = false;
    disableIncludeEndDate.value = true;
    disableSetEndDateToNow.value = true;
  } else {
    disableIncludeEndDate.value = false;
    disableSetEndDateToNow.value = false;
    inputTimeTo.value = DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toJSDate();
  }
});
watch(includeEndDate, (value) => {
  if (value) {
    useTimeTo.value = false;
    disableUseTimeTo.value = true;
    disableSetEndDateToNow.value = true;
  } else {
    disableUseTimeTo.value = false;
    disableSetEndDateToNow.value = false;
  }
});
watch(setEndDateToNow, (value) => {
  if (value) {
    useTimeTo.value = false;
    includeEndDate.value = false;
    disableUseTimeTo.value = true;
    disableIncludeEndDate.value = true;
  } else {
    disableUseTimeTo.value = false;
    disableIncludeEndDate.value = false;
  }
});

watch(useTimeFrom, (value) => {
  if (value) {
    disableSetStartDateToNow.value = true;
  } else {
    disableSetStartDateToNow.value = false;
    inputTimeFrom.value = DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toJSDate();
  }
});
watch(setStartDateToNow, (value) => {
  if (value) {
    useTimeFrom.value = false;
    disableUseTimeFrom.value = true;
  } else {
    disableUseTimeFrom.value = false;
  }
});

onBeforeUnmount(() => {
  cancelAnimationRequest();
});
</script>

<template>
  <PageHeading class="mb-4" :size="6" :level="2" weight="600">
    {{ t("calculator.date_time.date_difference.title") }}
  </PageHeading>
  <div class="row">
    <div class="col col-12 mb-3 col-lg-6 mb-lg-0">
      <Text class="mb-2" :text="t('calculator.date_time.date_difference.date_from.label')" :size="5" />
      <DatePicker
        :touch-u-i="isMobileOrTablet"
        date-format="yy-mm-dd"
        class="w-100"
        v-model="inputDateFrom"
        :disabled="setStartDateToNow"
      />
      <div class="d-flex justify-content-end mt-2 flex-wrap">
        <div>
          <Checkbox v-model="useTimeFrom" binary id="useTimeFrom" :disabled="disableUseTimeFrom" />
          <label for="useTimeFrom" class="ms-1">
            {{ t("calculator.date_time.date_difference.date_from.options.use_time") }}
          </label>
        </div>
        <div class="ms-2">
          <Checkbox :disabled="disableSetStartDateToNow" v-model="setStartDateToNow" binary id="setStartDateToNow" />
          <label :style="{ opacity: disableSetStartDateToNow ? 0.5 : 1 }" for="setStartDateToNow" class="ms-1">
            {{ t("calculator.date_time.date_difference.date_from.options.use_now") }}
          </label>
        </div>
      </div>
      <DatePicker
        class="w-100 mt-2"
        v-if="useTimeFrom"
        v-model="inputTimeFrom"
        :touch-u-i="isMobileOrTablet"
        time-only
        show-seconds
        hour-format="12"
      />
    </div>
    <div class="col col-12 col-lg-6">
      <Text class="mb-2" :text="t('calculator.date_time.date_difference.date_to.label')" :size="5" />
      <DatePicker
        :touch-u-i="isMobileOrTablet"
        date-format="yy-mm-dd"
        class="w-100"
        v-model="inputDateTo"
        :disabled="setEndDateToNow"
      />
      <div class="d-flex justify-content-end mt-2 flex-wrap">
        <div>
          <Checkbox :disabled="disableIncludeEndDate" v-model="includeEndDate" binary id="includeEndDate" />
          <label :style="{ opacity: disableIncludeEndDate ? 0.5 : 1 }" for="includeEndDate" class="ms-1">
            {{ t("calculator.date_time.date_difference.date_to.options.include_end_date") }}
          </label>
        </div>
        <div class="ms-2">
          <Checkbox :disabled="disableUseTimeTo" v-model="useTimeTo" binary id="useTimeTo" />
          <label :style="{ opacity: disableUseTimeTo ? 0.5 : 1 }" for="useTimeTo" class="ms-1">
            {{ t("calculator.date_time.date_difference.date_to.options.use_time") }}
          </label>
        </div>
        <div class="ms-2">
          <Checkbox :disabled="disableSetEndDateToNow" v-model="setEndDateToNow" binary id="setEndDateToNow" />
          <label :style="{ opacity: disableSetEndDateToNow ? 0.5 : 1 }" for="setEndDateToNow" class="ms-1">
            {{ t("calculator.date_time.date_difference.date_to.options.use_now") }}
          </label>
        </div>
      </div>
      <DatePicker
        class="w-100 mt-2"
        v-if="useTimeTo"
        v-model="inputTimeTo"
        :touch-u-i="isMobileOrTablet"
        time-only
        show-seconds
        hour-format="12"
      />
    </div>
  </div>
  <Divider class="pb-4" />
  <PageHeading class="mb-2" :size="6" :level="2" weight="600">
    {{ t("calculator.date_time.date_difference.result") }}
  </PageHeading>
  <ClientOnly>
    <div
      class="result p-4 d-flex justify-content-center gap-2"
      :class="{ row: isMobileOrTablet, 'm-0': isMobileOrTablet }"
    >
      <Text
        tag="span"
        :style="{ opacity: displayTime?.years === 0 ? 0.5 : 1 }"
        :text="`${t('common.units.years_n', { n: displayTime?.years })}`"
        bold
        :size="6"
      />
      <Text
        tag="span"
        :style="{ opacity: displayTime?.months === 0 ? 0.5 : 1 }"
        :text="`${t('common.units.months_n', { n: displayTime?.months })}`"
        bold
        :size="6"
      />
      <Text
        tag="span"
        :style="{ opacity: displayTime?.days === 0 ? 0.5 : 1 }"
        :text="`${t('common.units.days_n', { n: displayTime?.days })}`"
        bold
        :size="6"
      />
      <Text
        tag="span"
        :style="{ opacity: displayTime?.hours === 0 ? 0.5 : 1 }"
        :text="`${t('common.units.hours_n', { n: displayTime?.hours })}`"
        bold
        :size="6"
      />
      <Text
        tag="span"
        :style="{ opacity: displayTime?.minutes === 0 ? 0.5 : 1 }"
        :text="`${t('common.units.minutes_n', { n: displayTime?.minutes })}`"
        bold
        :size="6"
      />
      <Text
        tag="span"
        :style="{ opacity: displayTime?.seconds === 0 ? 0.5 : 1 }"
        :text="`${t('common.units.seconds_n', { n: displayTime?.seconds })}`"
        bold
        :size="6"
      />
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
.result {
  border-radius: 6px;
  background-color: #f1f3f5;
}

.dark-mode {
  .result {
    background-color: #2d2d2d;
  }
}
</style>
