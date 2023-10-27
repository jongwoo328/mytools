<script setup lang="ts">
import RgbColor from "~/models/RgbColor";
import CmykColor from "~/models/CmykColor";
import HslColor from "~/models/HslColor";
import ColorConvertResult from "~/components/converter/ColorConvertResult.vue";
import ToolPageLayout from "~/components/common/ToolPageLayout.vue";

useJsonld(() => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Tools For Developer",
      item: "https://tools.jongwoo.me",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Color Code Converter",
      item: "https://tools.jongwoo.me/converter/color",
    },
  ],
}));

const rgbPickedColor = ref("000000");
const cmykPickedColor = ref("000000");
const hslPickedColor = ref("000000");
const hexPickedColor = ref("000000");

const hexCode = ref("000000");
const isHexCodeValid = computed(() => {
  return /^[0-9a-fA-F]{6}$/.test(hexCode.value);
});
watch(hexPickedColor, () => {
  if (hexCode.value !== hexPickedColor.value) {
    hexCode.value = hexPickedColor.value;
  }
});
watch(hexCode, () => {
  if (isHexCodeValid.value) {
    hexPickedColor.value = hexCode.value;
  }
});

const rgbRed = ref(0);
const rgbGreen = ref(0);
const rgbBlue = ref(0);
watch(rgbPickedColor, () => {
  const rgbColor = RgbColor.fromHex(`#${rgbPickedColor.value}`);
  if (rgbRed.value !== rgbColor.red) {
    rgbRed.value = rgbColor.red;
  }
  if (rgbGreen.value !== rgbColor.green) {
    rgbGreen.value = rgbColor.green;
  }
  if (rgbBlue.value !== rgbColor.blue) {
    rgbBlue.value = rgbColor.blue;
  }
});

watch([rgbRed, rgbGreen, rgbBlue], () => {
  const r = rgbRed.value.toString(16).padStart(2, "0");
  const g = rgbGreen.value.toString(16).padStart(2, "0");
  const b = rgbBlue.value.toString(16).padStart(2, "0");
  rgbPickedColor.value = RgbColor.fromHex(`#${r}${g}${b}`).toHex().slice(1);
});

const cmykCyan = ref(0);
const cmykMagenta = ref(0);
const cmykYellow = ref(0);
const cmykKey = ref(100);
watch(cmykPickedColor, () => {
  const cmykColor = CmykColor.fromHex(`#${cmykPickedColor.value}`);
  if (cmykCyan.value !== cmykColor.cyan) {
    cmykCyan.value = cmykColor.cyan;
  }
  if (cmykMagenta.value !== cmykColor.magenta) {
    cmykMagenta.value = cmykColor.magenta;
  }
  if (cmykYellow.value !== cmykColor.yellow) {
    cmykYellow.value = cmykColor.yellow;
  }
  if (cmykKey.value !== cmykColor.key) {
    cmykKey.value = cmykColor.key;
  }
});
watch([cmykCyan, cmykMagenta, cmykYellow, cmykKey], () => {
  const c = cmykCyan.value;
  const m = cmykMagenta.value;
  const y = cmykYellow.value;
  const k = cmykKey.value;
  cmykPickedColor.value = new CmykColor({ cyan: c, magenta: m, yellow: y, key: k }).toHex().slice(1);
});

const hslHue = ref(0);
const hslSaturation = ref(0);
const hslLightness = ref(0);
watch(hslPickedColor, () => {
  const hslColor = HslColor.fromHex(`#${hslPickedColor.value}`);
  if (hslHue.value !== hslColor.hue) {
    hslHue.value = hslColor.hue;
  }
  if (hslSaturation.value !== hslColor.saturation) {
    hslSaturation.value = hslColor.saturation;
  }
  if (hslLightness.value !== hslColor.lightness) {
    hslLightness.value = hslColor.lightness;
  }
});
watch([hslHue, hslSaturation, hslLightness], () => {
  const h = hslHue.value;
  const s = hslSaturation.value;
  const l = hslLightness.value;
  hslPickedColor.value = new HslColor({ hue: h, saturation: s, lightness: l }).toHex().slice(1);
});
</script>

<template>
  <Head>
    <Title>Color Code Converter</Title>
    <Meta name="description" content="Convert color code to other formats like RGB, HEX, CMYK, HSL." />
  </Head>
  <ToolPageLayout title="Color Code Converter" description="Color Code Converter supports RGB, HEX, CMYK, HSL">
    <Card>
      <template #content>
        <div class="row m-0">
          <TabView>
            <TabPanel header="HEX">
              <ColorPicker v-model="hexPickedColor" class="w-100" :pt="{ input: { class: 'color-picker' } }" />
              <div class="row mt-2">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">#</span>
                  <InputText class="prevent-auto-zoom" v-model="hexCode" :class="{ 'p-invalid': !isHexCodeValid }" />
                </div>
              </div>
              <ColorConvertResult class="mt-4" :hex="hexPickedColor" />
            </TabPanel>
            <TabPanel header="RGB">
              <ColorPicker v-model="rgbPickedColor" class="w-100" :pt="{ input: { class: 'color-picker' } }" />
              <div class="row mt-2">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">R</span>
                  <InputNumber class="prevent-auto-zoom" :min="0" :max="255" v-model="rgbRed" />
                </div>
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">G</span>
                  <InputNumber class="prevent-auto-zoom" :min="0" :max="255" v-model="rgbGreen" />
                </div>
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">B</span>
                  <InputNumber class="prevent-auto-zoom" :min="0" :max="255" v-model="rgbBlue" />
                </div>
              </div>
              <ColorConvertResult class="mt-4" :hex="rgbPickedColor" />
            </TabPanel>
            <TabPanel header="CMYK">
              <ColorPicker v-model="cmykPickedColor" class="w-100" :pt="{ input: { class: 'color-picker' } }" />
              <div class="row mt-2">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">C</span>
                  <InputNumber :min="0" :max="100" class="prevent-auto-zoom" v-model="cmykCyan" />
                  <span class="p-inputgroup-addon">%</span>
                </div>
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">M</span>
                  <InputNumber :min="0" :max="100" class="prevent-auto-zoom" v-model="cmykMagenta" />
                  <span class="p-inputgroup-addon">%</span>
                </div>
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">Y</span>
                  <InputNumber :min="0" :max="100" class="prevent-auto-zoom" v-model="cmykYellow" />
                  <span class="p-inputgroup-addon">%</span>
                </div>
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">K</span>
                  <InputNumber :min="0" :max="100" class="prevent-auto-zoom" v-model="cmykKey" />
                  <span class="p-inputgroup-addon">%</span>
                </div>
              </div>
              <ColorConvertResult class="mt-4" :hex="cmykPickedColor" />
            </TabPanel>
            <TabPanel header="HSL">
              <ColorPicker v-model="hslPickedColor" class="w-100" :pt="{ input: { class: 'color-picker' } }" />
              <div class="row mt-2">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">H</span>
                  <InputNumber :min="0" :max="360" class="prevent-auto-zoom" v-model="hslHue" />
                </div>
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">S</span>
                  <InputNumber :min="0" :max="100" class="prevent-auto-zoom" v-model="hslSaturation" />
                  <span class="p-inputgroup-addon">%</span>
                </div>
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">L</span>
                  <InputNumber class="prevent-auto-zoom" v-model="hslLightness" />
                  <span class="p-inputgroup-addon">%</span>
                </div>
              </div>
              <ColorConvertResult class="mt-4" :hex="hslPickedColor" />
            </TabPanel>
          </TabView>
        </div>
      </template>
    </Card>
  </ToolPageLayout>
</template>

<style scoped lang="scss">
::v-deep(.color-picker) {
  width: 100%;
  height: 100px;
}
</style>
