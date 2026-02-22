<script setup lang="ts">
import { color } from "use-color";

const { copyData } = useCopy();
const { t } = useI18n();

interface ColorConvertResultProps {
  readonly hex: string;
}

const props = defineProps<ColorConvertResultProps>();

const propsColor = computed(() => {
  return color(`#${props.hex}`);
});

const hexText = computed(() => {
  return propsColor.value.toHex();
});
const rgbText = computed(() => {
  return propsColor.value.toRgbString();
});
const oklchText = computed(() => {
  return propsColor.value.toOklchString();
});
const hslText = computed(() => {
  return propsColor.value.toHslString();
});
</script>

<template>
  <div class="grid">
    <div class="col-span-full flex items-center">
      <span class="font-bold">
        {{ t("converter.color.options.hex.label") }}
      </span>
      <span class="flex-grow text-end pr-2">{{ hexText }}</span>
      <Button icon="pi pi-copy" class="py-1" size="small" text @click="copyData(hexText)" />
    </div>
    <div class="col-span-full flex items-center">
      <span class="font-bold">
        {{ t("converter.color.options.rgb.label") }}
      </span>
      <span class="flex-grow-1 text-end pr-2">{{ rgbText }}</span>
      <Button icon="pi pi-copy" class="py-1" size="small" text @click="copyData(rgbText)" />
    </div>
    <div class="col-span-full flex items-center">
      <span class="font-bold">
        {{ t("converter.color.options.hsl.label") }}
      </span>
      <span class="flex-grow-1 text-end pr-2">{{ hslText }}</span>
      <Button icon="pi pi-copy" class="py-1" size="small" text @click="copyData(hslText)" />
    </div>
    <div class="col-span-full flex items-center">
      <span class="font-bold">
        {{ t("converter.color.options.oklch.label") }}
      </span>
      <span class="flex-grow-1 text-end pr-2">{{ oklchText }}</span>
      <Button icon="pi pi-copy" class="py-1" size="small" text @click="copyData(oklchText)" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
