export const createEmptyImageElement = (): HTMLImageElement => {
  return typeof window !== "undefined" ? new Image() : ({} as HTMLImageElement);
};
