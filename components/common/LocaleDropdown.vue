<script setup lang="ts">
import Dropdown, { DropdownPassThroughOptions } from "primevue/dropdown";
import TranslationIcon from "~/components/svg/TranslationIcon.vue";
import { breakpointsBootstrapV5 } from "@vueuse/core";
import { ref } from "vue";
import { PassThrough } from "primevue/ts-helpers";

const { locale, availableLocales, t } = useI18n();
const router = useRouter();
const switchLocalePath = useSwitchLocalePath();

const breakpoints = useBreakpoints(breakpointsBootstrapV5);
const isMobileOrTablet = breakpoints.smaller("lg");

const dropdown = ref<Dropdown | null>(null);
const openDropdown = () => {
  dropdown.value?.show();
};
const dropdownPassThrough = computed<PassThrough<DropdownPassThroughOptions>>(() => ({
  input: { class: isMobileOrTablet.value ? "py-1" : "" },
}));
const dropdownStyle = computed<Partial<CSSStyleDeclaration>>(() => {
  const style = {
    backgroundColor: "#f8f9fa",
    border: "none",
  };
  if (isMobileOrTablet.value) {
    return { ...style, height: "30px" };
  }
  return style;
});

const localeOptions = computed(() =>
  availableLocales.map((locale) => ({
    label: t(`common.locales.${locale}`),
    value: locale,
  })),
);

watch(locale, () => {
  router.replace(switchLocalePath(locale.value));
});
</script>

<template>
  <div class="d-flex">
    <TranslationIcon size="20" @click="openDropdown" class="pe-2" cursor-pointer />
    <Dropdown
      ref="dropdown"
      :style="dropdownStyle"
      :options="localeOptions"
      option-value="value"
      option-label="label"
      v-model="locale"
      :pt="dropdownPassThrough"
    />
  </div>
</template>

<style scoped lang="scss"></style>
