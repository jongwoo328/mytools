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
        component: () => import("../views/formatter/JSONFormatter.vue"),
      },
      {
        path: "sql",
        name: RouterName.SQLFormatter,
        component: () => import("../views/formatter/SQLFormatter.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
