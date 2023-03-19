<script lang="ts" setup>
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons-vue";
import { computed, Ref, ref } from "vue";
import { DateTime, FixedOffsetZone, SystemZone } from "luxon";
import { offsetList } from "@/constants/time";
import { copyWithNotification } from "@/utils/copy";

const defaultDateTime = DateTime.now();

const date = ref(defaultDateTime.toFormat("yyyy-LL-dd"));
const time = ref(defaultDateTime.toFormat("HH:mm:ss"));
const milliseconds = ref(defaultDateTime.toFormat("S"));
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
  date.value = now.toFormat("yyyy-LL-dd");
  time.value = now.toFormat("HH:mm:ss");
  milliseconds.value = now.toFormat("S");
};
</script>

<template>
  <ARow>
    <ACol :span="24" :lg="11">
      <ARow class="mb-1" justify="space-between" align="middle">
        <ACol>
          <AButton @click="setNow">Now</AButton>
        </ACol>
        <ACol>
          <ACheckbox v-model:checked="useMilliseconds">
            Use Milliseconds
          </ACheckbox>
        </ACol>
      </ARow>
      <ARow>
        <ACol class="mb-1" :span="24" :lg="useMilliseconds ? 11 : 12">
          <ADatePicker
            class="w-100"
            value-format="YYYY-MM-DD"
            format="YYYY-MM-DD"
            size="large"
            v-model:value="date"
          />
        </ACol>
        <ACol :span="useMilliseconds ? 12 : 24" :lg="useMilliseconds ? 7 : 12">
          <ATimePicker
            class="w-100 mb-1"
            value-format="HH:mm:ss"
            format="HH:mm:ss"
            size="large"
            v-model:value="time"
          />
        </ACol>
        <ACol
          v-if="useMilliseconds"
          :span="useMilliseconds ? 12 : 24"
          :lg="useMilliseconds ? 6 : 12"
        >
          <AInputNumber
            addonAfter="ms"
            :controls="false"
            :min="0"
            :max="999"
            size="large"
            class="w-100 h-100 millisec-input"
            v-model:value="milliseconds"
          />
        </ACol>
        <ACol :span="24">
          <ASelect v-model:value="offset" class="w-100" :options="offsetList" />
        </ACol>
      </ARow>
    </ACol>
    <ACol :span="24" :lg="2">
      <ARow class="w-100 h-100 d-flex m-0 align-items-center" justify="center">
        <CaretDownOutlined class="h4 d-lg-none" />
        <CaretRightOutlined class="h4 d-none d-lg-block" />
      </ARow>
    </ACol>
    <ACol :span="24" :lg="11">
      <ARow class="epoch-time-config mb-1" justify="end">
        <ARadioGroup
          v-model:value="resultUnit"
          :options="unitOptions"
          option-type="button"
        ></ARadioGroup>
      </ARow>
      <ARow style="height: 38px">
        <ATypographyText
          class="h-100 w-100 mb-0 d-flex align-items-center epoch-time ps-2"
        >
          {{ resultEpoch }}
        </ATypographyText>
      </ARow>
      <AButton @click="onClickCopy" type="primary" class="mt-3" block>
        Copy
      </AButton>
    </ACol>
  </ARow>
</template>

<style lang="scss" scoped>
.epoch-time {
  background-color: #f1f3f5;
  font-size: 1.1rem;
}

.epoch-time-config {
  height: initial;
}

@media (min-width: 992px) {
  .epoch-time-config {
    min-height: 32px;
  }
}
</style>
