export function useImageUtil() {
  return {
    asyncBlobToBase64: async (blob: Blob | File): Promise<string> => {
      return new Promise((res) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(blob);
        fileReader.onloadend = () => {
          res(fileReader.result as string);
        };
      });
    },
  };
}
