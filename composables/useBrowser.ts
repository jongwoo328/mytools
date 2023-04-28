import { computed, ComputedRef } from "vue";

export enum Browser {
  IE,
  Safari,
  Chrome,
  MSEdge,
  ChromiumEdge,
  Firefox,
  Opera,
  Others,
  NotBrowser,
}

export function useBrowser() {
  const browserType: ComputedRef<Browser> = computed(() => {
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
