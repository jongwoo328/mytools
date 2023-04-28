export function useOs() {
  return {
    isMac:
      typeof window !== "undefined" &&
      window.navigator.userAgent.indexOf("Mac") !== -1,

    isWindows:
      typeof window !== "undefined" &&
      window.navigator.userAgent.indexOf("Windows") !== -1,
  };
}
