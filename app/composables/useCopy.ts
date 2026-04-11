import { useToast } from "primevue/usetoast";

export function useCopy() {
  const { copy } = useClipboard({ legacy: true });
  const toast = useToast();
  const { t } = useI18n();

  function showCopySuccessToast() {
    toast.add({
      severity: "success",
      summary: t("common.toast.copy_success"),
      life: 2500,
    });
  }

  function showCopyFailToast() {
    toast.add({
      severity: "error",
      summary: t("common.toast.copy_fail"),
      life: 2500,
    });
  }

  async function copyData(data: string) {
    try {
      await copy(data);
      showCopySuccessToast();
    } catch {
      showCopyFailToast();
    }
  }

  async function copyImage(dataUrl: string) {
    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
      showCopySuccessToast();
    } catch {
      showCopyFailToast();
    }
  }

  return { copyData, copyImage };
}
