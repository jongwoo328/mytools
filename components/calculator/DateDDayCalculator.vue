<script setup lang="ts">
import PageHeading from "~/components/common/PageHeading.vue";
import { DateTime, Duration } from "luxon";
import { breakpointsBootstrapV5 } from "@vueuse/core";
import Text from "~/components/common/Text.vue";
import LottieStar from "@/assets/lottie/star.json";
import { Vue3Lottie } from "vue3-lottie";

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
  <PageHeading class="mb-4" :size="6" :level="2" weight="600">D-Day 입력</PageHeading>
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
  <Divider />
  <div class="result p-4 d-flex justify-content-center gap-2 position-relative">
    <Text
      tag="span"
      :text="`${displayTime?.days}일`"
      bold
      :size="6"
      :style="{
        opacity: displayTime?.days === 0 ? 0.5 : 1,
      }"
    />
    <Text
      tag="span"
      :text="`${displayTime?.hours}시간`"
      bold
      :size="6"
      :style="{
        opacity: displayTime?.hours === 0 ? 0.5 : 1,
      }"
    />
    <Text
      tag="span"
      :text="`${displayTime?.minutes}분`"
      bold
      :size="6"
      :style="{
        opacity: displayTime?.minutes === 0 ? 0.5 : 1,
      }"
    />
    <Text
      tag="span"
      :text="`${(displayTime?.seconds ?? 0).toString().padStart(2, '0')}초`"
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
