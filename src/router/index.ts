import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouterScrollBehavior,
} from "vue-router";

export enum RouterName {
  Index = "Index",
  JSONFormatter = "JSONFormatter",
  SQLFormatter = "SQLFormatter",
  ImageConverter = "ImageConverter",
  HTMLViewer = "HTMLViewer",
  EpochConverter = "EpochConverter",
  CSVToJSONConverter = "CSVToJSONConverter",
}

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  }
  return { top: 0 };
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/IndexView.vue"),
  },
  {
    path: "/formatter",
    children: [
      {
        path: "json",
        name: RouterName.JSONFormatter,
        component: () => import("@/views/formatter/JSONFormatter.vue"),
      },
      {
        path: "sql",
        name: RouterName.SQLFormatter,
        component: () => import("@/views/formatter/SQLFormatter.vue"),
      },
    ],
  },
  {
    path: "/converter",
    children: [
      {
        path: "image",
        name: RouterName.ImageConverter,
        component: () => import("@/views/converter/ImageConverter.vue"),
      },
      {
        path: "epoch",
        name: RouterName.EpochConverter,
        component: () => import("@/views/converter/EpochConverter.vue"),
      },
      {
        path: "csv-to-json",
        name: RouterName.CSVToJSONConverter,
        component: () => import("@/views/converter/CSVToJSONConverter.vue"),
      },
    ],
  },
  {
    path: "/viewer",
    children: [
      {
        path: "html",
        name: RouterName.HTMLViewer,
        component: () => import("../views/viewer/HTMLViewer.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior,
});

export default router;
