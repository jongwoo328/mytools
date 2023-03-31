<script setup lang="ts">
import { RouterName } from "@/router";
import { computed, ref } from "vue";
import {
  CloseOutlined,
  HomeOutlined,
  MenuOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();

const menuTitleStyle = { fontSize: "1.1rem" };
const drawerVisible = ref(false);
const openKeys = ref(["formatter", "converter", "viewer"]);
const selectedKeys = computed(() => [router.currentRoute.value.name]);
const closeDrawer = () => {
  drawerVisible.value = false;
};
const openDrawer = () => {
  drawerVisible.value = true;
};
const pushToIndex = () => {
  router.push({ name: RouterName.Index });
};

const menus = [
  {
    title: "Formatter",
    key: "formatter",
    submenus: [
      {
        route: RouterName.JSONFormatter,
        title: "JSON",
      },
      {
        route: RouterName.SQLFormatter,
        title: "SQL",
      },
    ],
  },
  {
    title: "Converter",
    key: "converter",
    submenus: [
      {
        route: RouterName.ImageConverter,
        title: "Image",
      },
      {
        route: RouterName.EpochConverter,
        title: "Epoch",
      },
      {
        route: RouterName.CSVToJSONConverter,
        title: "CSV to JSON",
      },
      {
        route: RouterName.ImageCropper,
        title: "Image Cropper",
      },
    ],
  },
  {
    title: "Viewer",
    key: "viewer",
    submenus: [
      {
        route: RouterName.HTMLViewer,
        title: "HTML",
      },
    ],
  },
];
</script>

<template>
  <div>
    <AAffix class="top-affix" :offset-top="20" style="width: 90px">
      <AButton type="primary" @click="pushToIndex" shape="circle" size="large">
        <template #icon>
          <HomeOutlined />
        </template>
      </AButton>
      <AButton @click="openDrawer" shape="circle" size="large">
        <template #icon>
          <MenuOutlined />
        </template>
      </AButton>
    </AAffix>
    <ADrawer
      :visible="drawerVisible"
      @close="closeDrawer"
      width="300"
      :bodyStyle="{ paddingLeft: 0, paddingRight: 0 }"
      :headerStyle="{ paddingLeft: '1rem' }"
      theme="light"
      class="header d-flex flex-row align-items-center"
    >
      <template #closeIcon>
        <kbd style="background-color: #ff6b6b" class="d-flex">
          <CloseOutlined /> ESC
        </kbd>
      </template>
      <div
        class="d-flex justify-content-center align-items-center w-100"
        style="height: 50px"
      >
        <RouterLink
          @click="closeDrawer"
          class="logo d-flex align-items-center w-25 py-2"
          :to="{ name: RouterName.Index }"
          style="font-size: 2rem"
        >
          <HomeOutlined class="w-100" />
        </RouterLink>
      </div>
      <AMenu
        theme="light"
        mode="inline"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        style="width: 300px"
      >
        <ASubMenu v-for="menu in menus" :key="menu.key" class="w-100">
          <template #title>
            <span :style="menuTitleStyle">{{ menu.title }}</span>
          </template>
          <AMenuItem v-for="submenu in menu.submenus" :key="submenu.route">
            <RouterLink
              @click="closeDrawer"
              class="text-decoration-none"
              :to="{ name: submenu.route }"
              >{{ submenu.title }}
            </RouterLink>
          </AMenuItem>
        </ASubMenu>
      </AMenu>
    </ADrawer>
  </div>
</template>

<style lang="scss" scoped>
.top-affix {
  &::v-deep(div.ant-affix) {
    display: flex;
    justify-content: space-around;
  }
}
</style>
