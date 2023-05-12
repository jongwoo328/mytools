const EMPTY_FILE_NAME = "emptyFile";

export const createEmptyFile = (): File => {
  return new File([""], EMPTY_FILE_NAME);
};

export const isEmptyFile = (file: File): boolean => {
  if (!file) {
    return true;
  }
  return file.name === EMPTY_FILE_NAME && file.size === 0;
};
