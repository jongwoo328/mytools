<script setup lang="ts">
import PageHeading from "~/components/common/PageHeading.vue";
import Text from "~/components/common/Text.vue";
import { breakpointsBootstrapV5 } from "@vueuse/core";
import type { CalculationInfo } from "~/types/TimeIncrementCalculatorTypes";
import { DateTime, Duration } from "luxon";
import { v4 } from "uuid";

const { t } = useI18n();
const breakpoints = useBreakpoints(breakpointsBootstrapV5);
const isMobileOrTablet = breakpoints.smaller("lg");

const referenceTime = ref<Date>(new Date());
const calculations = ref<CalculationInfo[]>([]);

const addCalculation = () => {
  calculations.value.push({
    $key: v4(),
    type: "plus",
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  });
};
const result = computed(() => {
  return calculations.value.reduce((prev, curr) => {
    const duration = Duration.fromObject({
      years: curr.year,
      months: curr.month,
      days: curr.day,
      hours: curr.hour,
      minutes: curr.minute,
      seconds: curr.second,
    });
    if (curr.type === "plus") {
      return prev.plus(duration);
    }
    return prev.minus(duration);
  }, DateTime.fromJSDate(referenceTime.value));
});

const inputStyle = {
  borderTopRightRadius: "0",
  borderBottomRightRadius: "0",
};
const inputAddonStyle = {
  borderLeft: 0,
};
const onClickCalculationType = (calculation: CalculationInfo) => {
  if (calculation.type === "plus") {
    calculation.type = "minus";
  } else {
    calculation.type = "plus";
  }
};
const onClickDeleteCalculation = (index: number) => {
  calculations.value.splice(index, 1);
};

const onClickReset = () => {
  calculations.value = [];
};
</script>

<template>
  <PageHeading class="mb-4" :size="6" :level="2" weight="600">
    {{ t("calculator.date_time.date_increment.title") }}
  </PageHeading>
  <Text :text="t('calculator.date_time.date_increment.date_input.label')" bold :size="5" class="mb-2" />
  <DatePicker
    class="w-100"
    input-class="text-center"
    v-model="referenceTime"
    :touch-u-i="isMobileOrTablet"
    date-format="yy-mm-dd"
    show-time
    show-seconds
    hour-format="12"
  />
  <div class="d-flex justify-content-between align-items-center mt-4 mb-3">
    <Text tag="span" :text="t('calculator.date_time.date_increment.calculation.label')" bold :size="5" />
    <Button @click="onClickReset" icon="pi pi-trash" severity="danger" size="small" />
  </div>
  <div>
    <div
      data-aos="fade-left"
      data-aos-anchor-placement="bottom"
      v-for="(calculation, index) in calculations"
      :key="calculation.$key"
      class="d-flex justify-content-between mb-4 common-border-radius calculation-item"
    >
      <div class="d-flex flex-column" style="flex: 1; width: 100%">
        <div class="d-flex justify-content-between align-items-center px-1">
          <Button
            :icon="{ pi: true, 'pi-plus': calculation.type === 'plus', 'pi-minus': calculation.type === 'minus' }"
            :severity="calculation.type === 'plus' ? 'success' : 'warning'"
            @click="onClickCalculationType(calculation)"
          />
          <Button icon="pi pi-times" size="small" outlined severity="danger" @click="onClickDeleteCalculation(index)" />
        </div>
        <div class="row m-0 mt-2 w-100">
          <InputGroup
            class="d-flex align-items-stretch datetime-number-input col col-12 col-md-6 col-lg-4 px-1 mb-1"
            unstyled
          >
            <InputNumber
              show-buttons
              increment-button-class="increment-button"
              button-layout="horizontal"
              :min="0"
              v-model="calculation.year"
              style="flex: 1; width: 100%"
              :input-style="inputStyle"
              placeholder="0"
              input-class="w-100 prevent-auto-zoom"
            />
            <InputGroupAddon :style="inputAddonStyle">
              {{ t("common.units.years") }}
            </InputGroupAddon>
          </InputGroup>
          <InputGroup
            class="d-flex align-items-stretch datetime-number-input col col-12 col-md-6 col-lg-4 px-1 mb-1"
            unstyled
          >
            <InputNumber
              show-buttons
              increment-button-class="increment-button"
              button-layout="horizontal"
              v-model="calculation.month"
              :min="0"
              :max="9999"
              style="flex: 1; width: 100%"
              :input-style="inputStyle"
              placeholder="0"
              input-class="w-100 prevent-auto-zoom"
            />
            <InputGroupAddon :style="inputAddonStyle">
              {{ t("common.units.months") }}
            </InputGroupAddon>
          </InputGroup>
          <InputGroup
            class="d-flex align-items-stretch datetime-number-input col col-12 col-md-6 col-lg-4 px-1 mb-1"
            unstyled
          >
            <InputNumber
              show-buttons
              increment-button-class="increment-button"
              button-layout="horizontal"
              v-model="calculation.day"
              :min="0"
              :max="9999"
              style="flex: 1; width: 100%"
              :input-style="inputStyle"
              placeholder="0"
              input-class="w-100 prevent-auto-zoom"
            />
            <InputGroupAddon :style="inputAddonStyle">
              {{ t("common.units.days") }}
            </InputGroupAddon>
          </InputGroup>
          <InputGroup
            class="d-flex align-items-stretch datetime-number-input col col-12 col-md-6 col-lg-4 px-1 mb-1"
            unstyled
          >
            <InputNumber
              show-buttons
              increment-button-class="increment-button"
              button-layout="horizontal"
              v-model="calculation.hour"
              :min="0"
              :max="9999"
              style="flex: 1; width: 100%"
              :input-style="inputStyle"
              placeholder="0"
              input-class="w-100 prevent-auto-zoom"
            />
            <InputGroupAddon :style="inputAddonStyle">
              {{ t("common.units.hours") }}
            </InputGroupAddon>
          </InputGroup>
          <InputGroup
            class="d-flex align-items-stretch datetime-number-input col col-12 col-md-6 col-lg-4 px-1 mb-1"
            unstyled
          >
            <InputNumber
              show-buttons
              increment-button-class="increment-button"
              button-layout="horizontal"
              v-model="calculation.minute"
              :min="0"
              :max="9999"
              style="flex: 1; width: 100%"
              :input-style="inputStyle"
              placeholder="0"
              input-class="w-100 prevent-auto-zoom"
            />
            <InputGroupAddon :style="inputAddonStyle">
              {{ t("common.units.minutes") }}
            </InputGroupAddon>
          </InputGroup>
          <InputGroup
            class="d-flex align-items-stretch datetime-number-input col col-12 col-md-6 col-lg-4 px-1 mb-1"
            unstyled
          >
            <InputNumber
              show-buttons
              increment-button-class="increment-button"
              button-layout="horizontal"
              v-model="calculation.second"
              :min="0"
              :max="9999"
              style="flex: 1; width: 100%"
              :input-style="inputStyle"
              placeholder="0"
              input-class="w-100 prevent-auto-zoom"
            />
            <InputGroupAddon :style="inputAddonStyle">
              {{ t("common.units.seconds") }}
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </div>
  </div>
  <Button class="w-100 d-block" @click="addCalculation">
    {{ t("calculator.date_time.date_increment.calculation.button.add_calculation") }}
  </Button>
  <Divider class="mb-4" />
  <PageHeading class="mb-4" :size="6" :level="2" weight="600">
    {{ t("calculator.date_time.date_increment.result") }}
  </PageHeading>
  <div class="result common-border-radius p-4 d-flex justify-content-center">
    <Text tag="span" :text="result.toFormat('yyyy-MM-dd HH:mm:ss')" :size="5" bold />
  </div>
</template>

<style scoped lang="scss">
.calculation-item {
  padding: 1rem;
  border: 1px solid #dee2e6;
}

.result {
  background-color: #f1f3f5;
}

.datetime-number-input {
  &:deep(.increment-button) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>
