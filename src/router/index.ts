import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

export enum RouterName {
  Index = "Index",
  JSONFormatter = "JSONFormatter",
  SQLFormatter = "SQLFormatter",
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
      {
        path: "sql",
        name: RouterName.SQLFormatter,
        component: () => import("../views/SQLFormatterView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
