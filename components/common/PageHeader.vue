<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { breakpointsBootstrapV5 } from "@vueuse/core";

const router = useRouter();

const drawerVisible = ref(false);
const openKeys = ref({
  formatter: true,
  converter: true,
  viewer: true,
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
    label: "Formatter",
    key: "formatter",
    items: [
      {
        to: "/formatter/json",
        label: "JSON",
        command: hideDrawer,
      },
      {
        to: "/formatter/sql",
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
        to: "/converter/image",
        label: "Image",
        command: hideDrawer,
      },
      {
        to: "/converter/epoch",
        label: "Epoch",
        command: hideDrawer,
      },
      {
        to: "/converter/csv-to-json",
        label: "CSV to JSON",
        command: hideDrawer,
      },
      {
        to: "/converter/image-crop",
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
        to: "/viewer/html",
        label: "HTML",
        command: hideDrawer,
      },
    ],
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
    </Menubar>
  </ClientOnly>
</template>

<style lang="scss" scoped></style>
