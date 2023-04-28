<script lang="ts" setup>
import { PropType } from "vue";

defineProps({
  align: {
    type: String as PropType<"center" | "left" | "top" | "bottom" | "right">,
    default: "center",
  },
  type: {
    type: String as PropType<"dashed" | "dotted" | "solid">,
    default: "solid",
  },
  color: {
    type: String,
    default: "white",
  },
});
</script>

<template>
  <Divider class="result-divider" :align="align" :type="type">
    <slot></slot>
  </Divider>
</template>

<style lang="scss" scoped>
.result-divider::v-deep(.p-divider-content) {
  background-color: v-bind("color");
}
</style>
