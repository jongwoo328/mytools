<script setup lang="ts">
import RgbColor from "~/models/RgbColor";
import { copyWithNotification } from "~/utils/copy";
import CmykColor from "~/models/CmykColor";
import HslColor from "~/models/HslColor";

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
    <div class="col col-12 d-flex align-items-center" v-if="showHex">
      <span class="result-item-name fw-bold">HEX</span>
      <span class="flex-grow-1 text-end pe-2">{{ hexText }}</span>
      <Button class="py-1" size="small" text @click="copyWithNotification(hexText)">Copy</Button>
    </div>
    <div class="col col-12 d-flex align-items-center" v-if="showHex">
      <span class="result-item-name fw-bold">RGB</span>
      <span class="flex-grow-1 text-end pe-2">{{ rgbText }}</span>
      <Button class="py-1" size="small" text @click="copyWithNotification(rgbText)">Copy</Button>
    </div>
    <div class="col col-12 d-flex align-items-center" v-if="showCmyk">
      <span class="result-item-name fw-bold">CMYK</span>
      <span class="flex-grow-1 text-end pe-2">{{ cmykText }}</span>
      <Button class="py-1" size="small" text @click="copyWithNotification(cmykText)">Copy</Button>
    </div>
    <div class="col col-12 d-flex align-items-center" v-if="showHsl">
      <span class="result-item-name fw-bold">HSL</span>
      <span class="flex-grow-1 text-end pe-2">{{ hslText }}</span>
      <Button class="py-1" size="small" text @click="copyWithNotification(hslText)">Copy</Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.result-item-name {
  padding: 0 2rem;
}
</style>
