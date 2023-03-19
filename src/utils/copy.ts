import { notification } from "ant-design-vue";
import { useClipboard } from "@vueuse/core";

const { copy } = useClipboard({ legacy: true });
export const copyWithNotification = async (copyData: string) => {
  try {
    await copy(copyData);
    notification.success({
      message: "Copied!",
      duration: 2.5,
    });
  } catch {
    notification.error({
      message: "Failed",
      duration: 2.5,
    });
  }
};
