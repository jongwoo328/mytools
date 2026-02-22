import { computed } from "vue";
import type { ComputedRef } from "vue";
import type { UnionFromAsConst } from "~/utils/type";

export const Browser = {
  IE: "IE",
  Safari: "Safari",
  Chrome: "Chrome",
  MSEdge: "MSEdge",
  ChromiumEdge: "ChromiumEdge",
  Firefox: "Firefox",
  Opera: "Opera",
  Others: "Others",
  NotBrowser: "NotBrowser",
} as const;

export function useBrowser() {
  const browserType: ComputedRef<UnionFromAsConst<typeof Browser>> = computed(() => {
    if (typeof window === "undefined") {
      return Browser.NotBrowser;
    }
    const agent = navigator.userAgent.toLowerCase();
    if (agent.indexOf("edge") > -1) {
      return Browser.MSEdge;
    } else if (agent.indexOf("edg/") > -1) {
      return Browser.ChromiumEdge;
    } else if (agent.indexOf("opr") > -1) {
      return Browser.Opera;
    } else if (agent.indexOf("chrome") > -1) {
      return Browser.Chrome;
    } else if (agent.indexOf("trident") > -1) {
      return Browser.IE;
    } else if (agent.indexOf("firefox") > -1) {
      return Browser.Firefox;
    } else if (agent.indexOf("safari") > -1) {
      return Browser.Safari;
    } else {
      return Browser.Others;
    }
  });

  return { browserType };
}
