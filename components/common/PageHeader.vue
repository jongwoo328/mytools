<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { breakpointsBootstrapV5 } from "@vueuse/core";

const router = useRouter();
const { t: $t, locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const drawerVisible = ref(false);
const openKeys = ref({
  formatter: true,
  converter: true,
  viewer: true,
  calculator: true,
});

const onClickHome = () => {
  router.push("/");
  drawerVisible.value = false;
};

const breakpoints = useBreakpoints(breakpointsBootstrapV5);
const isMobileOrTablet = breakpoints.smaller("lg");

const hideDrawer = () => {
  drawerVisible.value = false;
};

const menus = [
  {
    label: $t("index.menu.formatter.label"),
    key: "formatter",
    items: [
      {
        to: "/formatter/json",
        label: $t("index.menu.formatter.items.json_formatter_label"),
        command: hideDrawer,
      },
      {
        to: "/formatter/sql",
        label: $t("index.menu.formatter.items.sql_formatter_label"),
        command: hideDrawer,
      },
    ],
  },
  {
    label: $t("index.menu.converter.label"),
    key: "converter",
    items: [
      {
        to: "/converter/image",
        label: $t("index.menu.converter.items.image_converter_label"),
        command: hideDrawer,
      },
      {
        to: "/converter/epoch",
        label: $t("index.menu.converter.items.epoch_converter_label"),
        command: hideDrawer,
      },
      {
        to: "/converter/csv-to-json",
        label: $t("index.menu.converter.items.csv_to_json_converter_label"),
        command: hideDrawer,
      },
      {
        to: "/converter/image-crop",
        label: $t("index.menu.converter.items.image_cropper_label"),
        command: hideDrawer,
      },
      {
        to: "/converter/url",
        label: $t("index.menu.converter.items.url_encoder/decoder_label"),
        command: hideDrawer,
      },
      {
        to: "/converter/color",
        label: $t("index.menu.converter.items.color_code_converter_label"),
        command: hideDrawer,
      },
    ],
  },
  {
    label: $t("index.menu.viewer.label"),
    key: "viewer",
    items: [
      {
        to: "/viewer/html",
        label: $t("index.menu.viewer.items.html_viewer_label"),
        command: hideDrawer,
      },
      {
        to: "/viewer/text-diff",
        label: $t("index.menu.viewer.items.text_difference_checker_label"),
        command: hideDrawer,
      },
    ],
  },
  {
    label: $t("index.menu.calculator.label"),
    key: "calculator",
    items: [
      {
        to: "/calculator/text-length",
        label: $t("index.menu.calculator.items.text_length_calculator_label"),
        command: hideDrawer,
      },
    ],
  },
];

const localeList = [
  {
    label: "en",
    value: "en",
  },
  {
    label: "ko",
    value: "ko",
  },
];
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
        <Dropdown size="small" :options="localeList" option-label="label" option-value="value" v-model="locale">
          <template #value="slotProps">
            <div class="d-flex justify-content-between align-items-center">
              <span v-if="slotProps.value === 'ko'" class="flag flag-kr" style="width: 22px; height: 15px" />
              <span v-else-if="slotProps.value === 'en'" class="flag flag-us" style="width: 22px; height: 15px" />
              <span>{{ slotProps.value }}</span>
            </div>
          </template>
          <template #option="slotProps">
            <template v-if="slotProps.option.value === 'ko'">
              <div class="d-flex justify-content-between align-items-center">
                <span class="flag flag-kr" style="width: 22px; height: 15px" />
                <span>ko</span>
              </div>
            </template>
            <template v-else-if="slotProps.option.value === 'en'">
              <div class="d-flex justify-content-between align-items-center">
                <span class="flag flag-us" style="width: 22px; height: 15px" />
                <span>en</span>
              </div>
            </template>
          </template>
        </Dropdown>
      </template>
    </Menubar>
  </ClientOnly>
</template>

<style lang="scss" scoped></style>
