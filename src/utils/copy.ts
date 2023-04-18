import { useClipboard } from "@vueuse/core";
import { toastService } from "@/main";
import { ToastSeverity } from "primevue/api";

const { copy } = useClipboard({ legacy: true });

export const copyWithNotification = async (copyData: string) => {
  try {
    await copy(copyData);
    toastService.add({
      severity: ToastSeverity.SUCCESS,
      summary: "Copied!",
      life: 2500,
    });
  } catch {
    toastService.add({
      severity: ToastSeverity.ERROR,
      summary: "Failed",
      life: 2500,
    });
  }
};
