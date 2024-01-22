<script setup lang="ts">
import PageHeading from "~/components/common/PageHeading.vue";
import { DateTime, Duration } from "luxon";
import { breakpointsBootstrapV5 } from "@vueuse/core";
import Text from "~/components/common/Text.vue";
import LottieStar from "@/assets/lottie/star.json";
import { Vue3Lottie } from "vue3-lottie";

const { t } = useI18n();
const breakpoints = useBreakpoints(breakpointsBootstrapV5);
const isMobileOrTablet = breakpoints.smaller("lg");
const dDay = ref<Date>(
  DateTime.now()
    .plus({ day: 1 })
    .set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    })
    .toJSDate(),
);

const remainedTime = ref<Duration>();

let animationRequestId = 0;
const animationRequest = () => {
  animationRequestId = requestAnimationFrame(updateCountDown);
};
const cancelAnimationRequest = () => {
  cancelAnimationFrame(animationRequestId);
};

const updateCountDown = () => {
  const newTime = DateTime.fromJSDate(dDay.value).diffNow(["days", "hours", "minutes", "seconds", "milliseconds"]);

  if (
    (newTime.seconds === 0 && remainedTime.value?.seconds === newTime.seconds) ||
    newTime.seconds !== remainedTime.value?.seconds
  ) {
    remainedTime.value = newTime;
    animationRequest();
    return;
  }

  animationRequest();
};
onMounted(() => {
  animationRequest();
});

const lottieAnimation = ref<InstanceType<typeof Vue3Lottie>>();

const displayTime = computed(() => {
  const seconds =
    (remainedTime.value?.milliseconds ?? 0) > 0 ? (remainedTime.value?.seconds ?? 0) + 1 : remainedTime.value?.seconds;
  return {
    years: remainedTime.value?.years ?? 0,
    months: remainedTime.value?.months ?? 0,
    days: remainedTime.value?.days ?? 0,
    hours: remainedTime.value?.hours ?? 0,
    minutes: remainedTime.value?.minutes ?? 0,
    seconds,
  };
});
const isTimeUp = computed(() => {
  return (
    displayTime.value?.days === 0 &&
    displayTime.value?.hours === 0 &&
    displayTime.value?.minutes === 0 &&
    displayTime.value?.seconds === 0
  );
});
watch(isTimeUp, (value) => {
  if (value) {
    lottieAnimation.value?.play();
  }
});
watch(dDay, () => {
  lottieAnimation.value?.stop();
});

onBeforeUnmount(() => {
  cancelAnimationRequest();
});
</script>

<template>
  <PageHeading class="mb-4" :size="6" :level="2" weight="600">
    {{ t("calculator.date_time.d_day.title") }}
  </PageHeading>
  <Calendar
    class="w-100"
    input-class="text-center"
    v-model="dDay"
    :touch-u-i="isMobileOrTablet"
    date-format="yy-mm-dd"
    show-time
    hour-format="12"
    show-seconds
  />
  <Divider class="mb-4" />
  <div
    class="result p-4 d-flex justify-content-center gap-2 position-relative"
    :class="{ row: isMobileOrTablet, 'm-0': isMobileOrTablet }"
  >
    <Text
      tag="span"
      :text="`${t('common.units.years_n', { n: displayTime?.years })}`"
      bold
      :size="6"
      :style="{
        opacity: displayTime?.years === 0 ? 0.5 : 1,
      }"
    />
    <Text
      tag="span"
      :text="`${t('common.units.months_n', { n: displayTime?.months })}`"
      bold
      :size="6"
      :style="{
        opacity: displayTime?.months === 0 ? 0.5 : 1,
      }"
    />
    <Text
      tag="span"
      :text="`${t('common.units.days_n', { n: displayTime?.days })}`"
      bold
      :size="6"
      :style="{
        opacity: displayTime?.days === 0 ? 0.5 : 1,
      }"
    />
    <Text
      tag="span"
      :text="`${t('common.units.hours_n', { n: displayTime?.hours })}`"
      bold
      :size="6"
      :style="{
        opacity: displayTime?.hours === 0 ? 0.5 : 1,
      }"
    />
    <Text
      tag="span"
      :text="`${t('common.units.minutes_n', { n: displayTime?.minutes })}`"
      bold
      :size="6"
      :style="{
        opacity: displayTime?.minutes === 0 ? 0.5 : 1,
      }"
    />
    <Text
      tag="span"
      :text="`${t('common.units.seconds_n', { n: displayTime?.seconds })}`"
      bold
      :size="6"
      :style="{
        opacity: displayTime?.seconds === 0 ? 0.5 : 1,
      }"
    />
    <Vue3Lottie
      :auto-play="false"
      ref="lottieAnimation"
      class="position-absolute animation"
      :loop="false"
      :animation-data="LottieStar"
    />
  </div>
</template>

<style scoped lang="scss">
.result {
  border-radius: 6px;
  background-color: #f1f3f5;
}

.animation {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(2);
}
</style>
