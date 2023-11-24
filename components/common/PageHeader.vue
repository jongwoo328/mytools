<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { breakpointsBootstrapV5 } from "@vueuse/core";

const router = useRouter();
const { t, locale, availableLocales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();

const drawerVisible = ref(false);
const openKeys = ref({
  formatter: true,
  converter: true,
  viewer: true,
  calculator: true,
});

const onClickHome = () => {
  router.push(localePath("/"));
  drawerVisible.value = false;
};

const breakpoints = useBreakpoints(breakpointsBootstrapV5);
const isMobileOrTablet = breakpoints.smaller("lg");

const hideDrawer = () => {
  drawerVisible.value = false;
};

const menus = [
  {
    label: () => t("index.menu.formatter.label"),
    key: "formatter",
    items: [
      {
        to: () => localePath("/formatter/json"),
        label: () => t("index.menu.formatter.items.json_formatter_label"),
        command: hideDrawer,
      },
      {
        to: () => localePath("/formatter/sql"),
        label: () => t("index.menu.formatter.items.sql_formatter_label"),
        command: hideDrawer,
      },
    ],
  },
  {
    label: () => t("index.menu.converter.label"),
    key: "converter",
    items: [
      {
        to: () => localePath("/converter/image"),
        label: () => t("index.menu.converter.items.image_converter_label"),
        command: hideDrawer,
      },
      {
        to: () => localePath("/converter/epoch"),
        label: () => t("index.menu.converter.items.epoch_converter_label"),
        command: hideDrawer,
      },
      {
        to: () => localePath("/converter/csv-to-json"),
        label: () => t("index.menu.converter.items.csv_to_json_converter_label"),
        command: hideDrawer,
      },
      {
        to: () => localePath("/converter/image-crop"),
        label: () => t("index.menu.converter.items.image_cropper_label"),
        command: hideDrawer,
      },
      {
        to: () => localePath("/converter/url"),
        label: () => t("index.menu.converter.items.url_encoder/decoder_label"),
        command: hideDrawer,
      },
      {
        to: () => localePath("/converter/color"),
        label: () => t("index.menu.converter.items.color_code_converter_label"),
        command: hideDrawer,
      },
    ],
  },
  {
    label: () => t("index.menu.viewer.label"),
    key: "viewer",
    items: [
      {
        to: () => localePath("/viewer/html"),
        label: () => t("index.menu.viewer.items.html_viewer_label"),
        command: hideDrawer,
      },
      {
        to: () => localePath("/viewer/text-diff"),
        label: () => t("index.menu.viewer.items.text_difference_checker_label"),
        command: hideDrawer,
      },
    ],
  },
  {
    label: () => t("index.menu.calculator.label"),
    key: "calculator",
    items: [
      {
        to: () => localePath("/calculator/text-length"),
        label: () => t("index.menu.calculator.items.text_length_calculator_label"),
        command: hideDrawer,
      },
    ],
  },
];

watch(locale, () => {
  router.replace(switchLocalePath(locale.value));
});
</script>

<template>
  <ClientOnly>
    <Button
      rounded
      icon="pi pi-bars"
      @click="drawerVisible = true"
      v-if="isMobileOrTablet"
      style="position: fixed; bottom: 20px; right: 20px; z-index: 1001; border: 1px solid #f0f2f5"
    />
    <Sidebar v-if="isMobileOrTablet" position="right" v-model:visible="drawerVisible">
      <Button size="large" @click="onClickHome" class="w-100 mt-1 mb-2 py-2" outlined icon="pi pi-home" />
      <PanelMenu v-model:expanded-keys="openKeys" :model="menus" />
    </Sidebar>
    <Menubar v-else :model="menus" class="w-100">
      <template #start>
        <Button text @click="onClickHome" class="w-100 me-2 py-2" label="🛠️" />
      </template>
      <template #end>
        <Dropdown size="small" :options="availableLocales" v-model="locale" />
      </template>
    </Menubar>
  </ClientOnly>
</template>

<style lang="scss" scoped></style>
