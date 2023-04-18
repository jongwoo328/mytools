<script setup lang="ts">
import { RouterName } from "@/router";
import { ref } from "vue";
import Sidebar from "primevue/sidebar";
import Button from "primevue/button";
import PanelMenu from "primevue/panelmenu";
import { useRouter } from "vue-router";
import { breakpointsBootstrapV5, useBreakpoints } from "@vueuse/core";
import Menubar from "primevue/menubar";

const router = useRouter();

const drawerVisible = ref(false);
const openKeys = ref({
  formatter: true,
  converter: true,
  viewer: true,
});

const onClickHome = () => {
  router.push({ name: RouterName.Index });
  drawerVisible.value = false;
};

const breakpoints = useBreakpoints(breakpointsBootstrapV5);
const isMobileOrTablet = breakpoints.smaller("lg");

const hideDrawer = () => {
  drawerVisible.value = false;
};

const menus = [
  {
    label: "Formatter",
    key: "formatter",
    items: [
      {
        to: { name: RouterName.JSONFormatter },
        label: "JSON",
        command: hideDrawer,
      },
      {
        to: { name: RouterName.SQLFormatter },
        label: "SQL",
        command: hideDrawer,
      },
    ],
  },
  {
    label: "Converter",
    key: "converter",
    items: [
      {
        to: { name: RouterName.ImageConverter },
        label: "Image",
        command: hideDrawer,
      },
      {
        to: { name: RouterName.EpochConverter },
        label: "Epoch",
        command: hideDrawer,
      },
      {
        to: { name: RouterName.CSVToJSONConverter },
        label: "CSV to JSON",
        command: hideDrawer,
      },
      {
        to: { name: RouterName.ImageCropper },
        label: "Image Cropper",
        command: hideDrawer,
      },
    ],
  },
  {
    label: "Viewer",
    key: "viewer",
    items: [
      {
        to: { name: RouterName.HTMLViewer },
        label: "HTML",
        command: hideDrawer,
      },
    ],
  },
];
</script>

<template>
  <Button
    rounded
    icon="pi pi-bars"
    @click="drawerVisible = true"
    v-if="isMobileOrTablet"
    style="
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1001;
      border: 1px solid #f0f2f5;
    "
  />
  <Sidebar
    v-if="isMobileOrTablet"
    position="right"
    v-model:visible="drawerVisible"
  >
    <Button
      size="large"
      @click="onClickHome"
      class="w-100 mt-1 mb-2 py-2"
      outlined
      icon="pi pi-home"
    />
    <PanelMenu v-model:expanded-keys="openKeys" :model="menus" />
  </Sidebar>
  <Menubar v-else :model="menus" class="w-100">
    <template #start>
      <Button text @click="onClickHome" class="w-100 me-2 py-2" label="⚒" />
    </template>
  </Menubar>
</template>

<style lang="scss" scoped></style>
