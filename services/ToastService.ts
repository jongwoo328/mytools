type toastOption = {
  severity: "success" | "info" | "warn" | "error" | undefined;
  summary: string | undefined;
  life: number | undefined;
};

export default {
  add: ({ severity, summary, life }: toastOption) => {
    useNuxtApp().vueApp.config?.globalProperties.$toast.add({
      severity,
      summary,
      life,
    });
  },
};
