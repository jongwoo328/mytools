import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

export enum RouterName {
  Index = "Index",
  JSONFormatter = "JSONFormatter",
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/IndexView.vue"),
  },
  {
    path: "/formatter",
    children: [
      {
        path: "json",
        name: RouterName.JSONFormatter,
        component: () => import("../views/JSONFormatterView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
