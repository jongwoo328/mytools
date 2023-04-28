import ToastService from "~/services/ToastService";

const { copy } = useClipboard({ legacy: true });

export const copyWithNotification = async (copyData: string) => {
  try {
    await copy(copyData);
    ToastService.add({
      severity: "success",
      summary: "Copied!",
      life: 2500,
    });
  } catch {
    ToastService.add({
      severity: "error",
      summary: "Failed",
      life: 2500,
    });
  }
};
