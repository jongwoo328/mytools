import { defineStore } from "pinia";
import { JSONResultProp } from "@/types/JSONResult";

export const useJSONFormatterStore = defineStore("JSONFormatResult", {
  state: (): { JSONFormatResults: JSONResultProp[] } => ({
    JSONFormatResults: [],
  }),
  getters: {
    getJSONFormatResults: (state): JSONResultProp[] => state.JSONFormatResults,
  },
  actions: {
    addJSONFormatResult(data: JSONResultProp) {
      this.JSONFormatResults.push(data);
    },
    deleteJsonFormatResult(id: string) {
      const index = this.JSONFormatResults.findIndex(
        (result) => result.id === id
      );
      if (index !== -1) {
        this.JSONFormatResults.splice(index, 1);
      }
    },
  },
});
