export function useCopy() {
  async function copyStringToClipboard(data: string) {
    await navigator.clipboard.writeText(data);
  }

  return {
    copyStringToClipboard,
  };
}
