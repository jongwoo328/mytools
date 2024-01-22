<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: "p" | "span";
    text?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    color?: CSSStyleDeclaration["color"];
    size: number;
  }>(),
  {
    tag: "p",
    color: "black",
    bold: false,
    italic: false,
    underline: false,
    text: "",
    size: 4,
  },
);
</script>

<template>
  <component
    :is="tag"
    :style="{
      color,
      fontWeight: bold ? 'bold' : undefined,
      fontStyle: italic ? 'italic' : undefined,
      textDecoration: underline ? 'underline' : undefined,
      fontSize: `${size * 0.25}rem`,
      margin: 0,
    }"
  >
    <slot>{{ text }}</slot>
  </component>
</template>

<style scoped lang="scss"></style>
