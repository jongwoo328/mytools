<script setup lang="ts">
const colorMode = useColorMode();
const { t } = useI18n();

const toggleColorMode = () => {
  if (colorMode.value === "dark") {
    colorMode.value = "light";
    colorMode.preference = "light";
  } else {
    colorMode.value = "dark";
    colorMode.preference = "dark";
  }
};

const switchColorModeHelpText = computed(() => {
  return t(`common.colorTheme.${colorMode.value}.help`);
});
</script>

<template>
  <ToggleButton @click="toggleColorMode" v-tooltip.bottom="switchColorModeHelpText">
    <template #default>
      <i
        class="pi"
        :class="{
          'pi-moon': colorMode.value === 'dark',
          'pi-sun': colorMode.value === 'light',
        }"
      />
    </template>
  </ToggleButton>
</template>

<style scoped lang="scss"></style>
