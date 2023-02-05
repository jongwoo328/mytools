import { RouteLocationRaw } from "vue-router";

export type AvailableToolTag = {
  name: string;
  color?: string;
};

export type AvailableTool = {
  title: string;
  router: RouteLocationRaw;
  description: string;
  tags: AvailableToolTag[];
};
