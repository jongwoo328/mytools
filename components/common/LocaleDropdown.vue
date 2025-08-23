<script setup lang="ts">
import TranslationIcon from "~/components/svg/TranslationIcon.vue";
import { breakpointsBootstrapV5 } from "@vueuse/core";
import { ref } from "vue";
import Select from "primevue/select";

const { locale, availableLocales, t } = useI18n();
const router = useRouter();
const switchLocalePath = useSwitchLocalePath();

const breakpoints = useBreakpoints(breakpointsBootstrapV5);
const isMobileOrTablet = breakpoints.smaller("lg");

const select = ref<typeof Select | null>(null);
const openSelect = () => {
  select.value?.show();
};
const selectPassThrough = computed(() => ({
  label: { class: isMobileOrTablet.value ? "py-1" : "" },
}));
const selectStyle = computed<Partial<CSSStyleDeclaration>>(() => {
  if (isMobileOrTablet.value) {
    return { height: "30px" };
  }
  return {};
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
  <div class="flex">
    <TranslationIcon size="20" @click="openSelect" class="pr-2" cursor-pointer />
    <Select
      ref="select"
      :style="selectStyle"
      :options="localeOptions"
      option-value="value"
      option-label="label"
      v-model="locale"
      :pt="selectPassThrough"
    />
  </div>
</template>

<style scoped lang="scss"></style>
