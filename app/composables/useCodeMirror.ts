import { basicDark } from "cm6-theme-basic-dark";
import { basicLight } from "cm6-theme-basic-light";

export function useCodeMirror() {
  const colorMode = useColorMode();

  const codemirrorTheme = computed(() => {
    if (colorMode.value === "dark") {
      return basicDark;
    }
    return basicLight;
  });

  return { codemirrorTheme };
}
