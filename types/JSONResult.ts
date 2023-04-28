import { JSONDataType } from "vue-json-pretty/types/utils";

export type JSONResult = {
  id: string;
  result:
    | string
    | number
    | boolean
    | unknown[]
    | Record<string, unknown>
    | null;
};
