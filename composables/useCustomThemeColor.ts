export default function useCustomThemeColor() {
  const colorMode = useColorMode();

  const mainBackgroundColor = computed(() => {
    const light = "#f4f4f4";
    const dark = "#09090b";
    if (colorMode.value === "dark") {
      return {
        light,
        dark,
        current: dark,
      };
    }
    return {
      light,
      dark,
      current: light,
    };
  });
  return {
    mainBackgroundColor,
  };
}
