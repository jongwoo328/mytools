<script setup lang="ts">
import RgbColor from "~/models/RgbColor";
import CmykColor from "~/models/CmykColor";
import HslColor from "~/models/HslColor";
import ColorConvertResult from "~/components/converter/ColorConvertResult.vue";
import ToolPageLayout from "~/components/common/ToolPageLayout.vue";

const { t } = useI18n();
const localePath = useLocalePath();

useJsonld(() => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: t("title"),
      item: `https://tools.jongwoo.me${localePath("/")}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Color Code Converter",
      item: `https://tools.jongwoo.me${localePath("/converter/color")}`,
    },
  ],
}));

const tabIndex = ref("hex");
const tabOptions = [
  { label: t("converter.color.options.hex.label"), value: "hex" },
  { label: t("converter.color.options.rgb.label"), value: "rgb" },
  { label: t("converter.color.options.cmyk.label"), value: "cmyk" },
  { label: t("converter.color.options.hsl.label"), value: "hsl" },
];

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
    <Title>{{ t("converter.color.head.title") }}</Title>
    <Meta name="description" :content="t('converter.color.head.description')" />
  </Head>
  <ToolPageLayout :title="t('converter.color.title')" :description="t('converter.color.description')">
    <Card>
      <template #content>
        <div class="row m-0">
          <Tabs :value="tabIndex">
            <TabList>
              <Tab v-for="tab in tabOptions" :key="tab.value" :value="tab.value">
                {{ tab.label }}
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="hex">
                <ColorPicker v-model="hexPickedColor" class="w-100" :pt="{ preview: { class: 'color-picker' } }" />
                <div class="row mt-2">
                  <InputGroup>
                    <InputGroupAddon> # </InputGroupAddon>
                    <InputText class="prevent-auto-zoom" v-model="hexCode" :class="{ 'p-invalid': !isHexCodeValid }" />
                  </InputGroup>
                </div>
                <ColorConvertResult class="mt-4" :hex="hexPickedColor" />
              </TabPanel>
              <TabPanel value="rgb">
                <ColorPicker v-model="rgbPickedColor" class="w-100" :pt="{ preview: { class: 'color-picker' } }" />
                <div class="row mt-2">
                  <InputGroup>
                    <InputGroupAddon> R </InputGroupAddon>
                    <InputNumber class="prevent-auto-zoom" :min="0" :max="255" v-model="rgbRed" />
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon> G </InputGroupAddon>
                    <InputNumber class="prevent-auto-zoom" :min="0" :max="255" v-model="rgbGreen" />
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon> B </InputGroupAddon>
                    <InputNumber class="prevent-auto-zoom" :min="0" :max="255" v-model="rgbBlue" />
                  </InputGroup>
                </div>
                <ColorConvertResult class="mt-4" :hex="rgbPickedColor" />
              </TabPanel>
              <TabPanel value="cmyk">
                <ColorPicker v-model="cmykPickedColor" class="w-100" :pt="{ preview: { class: 'color-picker' } }" />
                <div class="row mt-2">
                  <InputGroup>
                    <InputGroupAddon> C </InputGroupAddon>
                    <InputNumber :min="0" :max="100" class="prevent-auto-zoom" v-model="cmykCyan" />
                    <InputGroupAddon> % </InputGroupAddon>
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon> M </InputGroupAddon>
                    <InputNumber :min="0" :max="100" class="prevent-auto-zoom" v-model="cmykMagenta" />
                    <InputGroupAddon> % </InputGroupAddon>
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon> Y </InputGroupAddon>
                    <InputNumber :min="0" :max="100" class="prevent-auto-zoom" v-model="cmykYellow" />
                    <InputGroupAddon> % </InputGroupAddon>
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon> K </InputGroupAddon>
                    <InputNumber :min="0" :max="100" class="prevent-auto-zoom" v-model="cmykKey" />
                    <InputGroupAddon> % </InputGroupAddon>
                  </InputGroup>
                </div>
                <ColorConvertResult class="mt-4" :hex="cmykPickedColor" />
              </TabPanel>
              <TabPanel value="hsl">
                <ColorPicker v-model="hslPickedColor" class="w-100" :pt="{ preview: { class: 'color-picker' } }" />
                <div class="row mt-2">
                  <InputGroup>
                    <InputGroupAddon> H </InputGroupAddon>
                    <InputNumber :min="0" :max="360" class="prevent-auto-zoom" v-model="hslHue" />
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon> S </InputGroupAddon>
                    <InputNumber :min="0" :max="100" class="prevent-auto-zoom" v-model="hslSaturation" />
                    <InputGroupAddon> % </InputGroupAddon>
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon> L </InputGroupAddon>
                    <InputNumber class="prevent-auto-zoom" v-model="hslLightness" />
                    <InputGroupAddon> % </InputGroupAddon>
                  </InputGroup>
                </div>
                <ColorConvertResult class="mt-4" :hex="hslPickedColor" />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </template>
    </Card>
  </ToolPageLayout>
</template>

<style scoped lang="scss">
:deep(.color-picker) {
  width: 100%;
  height: 100px;
}
</style>
