import { defineStore } from "pinia";
import { SQLResultProp } from "@/types/SQLResult";

export const useSQLFormatterStore = defineStore("SQLFormatResult", {
  state: (): { SQLFormatResults: SQLResultProp[] } => ({
    SQLFormatResults: [],
  }),
  getters: {
    getSQLFormatResults: (state): SQLResultProp[] => state.SQLFormatResults,
  },
  actions: {
    addSQLFormatResult(data: SQLResultProp) {
      this.SQLFormatResults.push(data);
    },
    deleteSQLFormatResult(id: string) {
      const index = this.SQLFormatResults.findIndex(
        (result) => result.id === id
      );
      if (index !== -1) {
        this.SQLFormatResults.splice(index, 1);
      }
    },
  },
});
