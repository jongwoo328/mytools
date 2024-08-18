<script setup lang="ts">
const colorMode = useColorMode();
const toggleColorMode = () => {
  if (colorMode.value === "dark") {
    colorMode.value = "light";
    colorMode.preference = "light";
  } else {
    colorMode.value = "dark";
    colorMode.preference = "dark";
  }
};
</script>

<template>
  <ToggleButton @click="toggleColorMode" v-tooltip.bottom="'test'">
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
