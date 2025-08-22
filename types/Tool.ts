import type { RouteLocationRaw } from "vue-router";

export type AvailableToolTag = {
  name: string;
  color?: string;
  id: string;
};

export type AvailableTool = {
  title: string;
  router: RouteLocationRaw;
  description: string;
  tags: AvailableToolTag[];
};
