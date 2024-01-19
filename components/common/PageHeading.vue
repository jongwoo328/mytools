<script setup lang="ts">
import { type PropType, computed } from "vue";

const props = defineProps({
  level: {
    type: Number as PropType<1 | 2 | 3 | 4 | 5>,
    required: true,
  },
  bold: { type: Boolean as PropType<boolean>, required: false, default: false },
  size: {
    type: Number as PropType<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10>,
    required: true,
  },
  weight: { type: String, required: false, default: "normal" },
});

const fontSize = computed(() => `${props.size * 0.25}rem`);
</script>

<template>
  <h1 v-if="level === 1">
    <slot></slot>
  </h1>
  <h2 v-else-if="level === 2">
    <slot></slot>
  </h2>
  <h3 v-else-if="level === 3">
    <slot></slot>
  </h3>
  <h4 v-else-if="level === 4">
    <slot></slot>
  </h4>
  <h5 v-else-if="level === 5">
    <slot></slot>
  </h5>
</template>

<style scoped>
h1,
h2,
h3,
h4,
h5 {
  font-size: v-bind("fontSize");
  font-weight: v-bind("weight");
}
</style>
