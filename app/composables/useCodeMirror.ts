import { vsCodeLight } from "@fsegurai/codemirror-theme-vscode-light";
import { vsCodeDark } from "@fsegurai/codemirror-theme-vscode-dark";

export function useCodeMirror() {
  const colorMode = useColorMode();

  const codemirrorTheme = computed(() => {
    if (colorMode.value === "dark") {
      return vsCodeDark;
    }
    return vsCodeLight;
  });

  return { codemirrorTheme };
}
