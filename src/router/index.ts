import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import IndexView from "@/views/IndexView.vue";
import JSONFormatterView from "@/views/JSONFormatterView.vue";

export enum RouterName {
  Index = "Index",
  JSONFormatter = "JSONFormatter",
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: () => IndexView,
  },
  {
    path: "/formatter",
    children: [
      {
        path: "json",
        name: RouterName.JSONFormatter,
        component: () => JSONFormatterView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
