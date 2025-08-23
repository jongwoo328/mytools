<script setup lang="ts">
import RgbColor from "~/models/RgbColor";
import CmykColor from "~/models/CmykColor";
import HslColor from "~/models/HslColor";

const { copyData } = useCopy();
const { t } = useI18n();

interface ColorConvertResultProps {
  readonly hex: string;
  readonly showHex?: boolean;
  readonly showRgb?: boolean;
  readonly showCmyk?: boolean;
  readonly showHsl?: boolean;
}

const props = withDefaults(defineProps<ColorConvertResultProps>(), {
  showHex: true,
  showRgb: true,
  showCmyk: true,
  showHsl: true,
});

const hexText = computed(() => {
  return `#${props.hex}`;
});
const rgbText = computed(() => {
  if (!/[0-9a-fA-F]{6}/.test(props.hex)) {
    return "";
  }
  return RgbColor.fromHex(hexText.value).toString();
});
const cmykText = computed(() => {
  if (!/[0-9a-fA-F]{6}/.test(props.hex)) {
    return "";
  }
  return CmykColor.fromHex(hexText.value).toString();
});
const hslText = computed(() => {
  if (!/[0-9a-fA-F]{6}/.test(props.hex)) {
    return "";
  }
  return HslColor.fromHex(hexText.value).toString();
});
</script>

<template>
  <div class="row">
    <div class="col col-12 flex items-center" v-if="showHex">
      <span class="font-bold">
        {{ t("converter.color.options.hex.label") }}
      </span>
      <span class="flex-grow-1 text-end pr-2">{{ hexText }}</span>
      <Button icon="pi pi-copy" class="py-1" size="small" text @click="copyData(hexText)" />
    </div>
    <div class="col col-12 flex items-center" v-if="showHex">
      <span class="font-bold">
        {{ t("converter.color.options.rgb.label") }}
      </span>
      <span class="flex-grow-1 text-end pr-2">{{ rgbText }}</span>
      <Button icon="pi pi-copy" class="py-1" size="small" text @click="copyData(rgbText)" />
    </div>
    <div class="col col-12 flex items-center" v-if="showCmyk">
      <span class="font-bold">
        {{ t("converter.color.options.cmyk.label") }}
      </span>
      <span class="flex-grow-1 text-end pr-2">{{ cmykText }}</span>
      <Button icon="pi pi-copy" class="py-1" size="small" text @click="copyData(cmykText)" />
    </div>
    <div class="col col-12 flex items-center" v-if="showHsl">
      <span class="font-bold">
        {{ t("converter.color.options.hsl.label") }}
      </span>
      <span class="flex-grow-1 text-end pr-2">{{ hslText }}</span>
      <Button icon="pi pi-copy" class="py-1" size="small" text @click="copyData(hslText)" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
