function humanReadableBytes(bytes: number): string {
  let temp = bytes;
  const units = ["B", "kB", "MB", "GB", "TB", "PB"];
  let i = 0;
  while (temp >= 1000 && i < 5) {
    temp /= 1000;
    i++;
  }
  return `${(bytes / Math.pow(1000, i)).toFixed(1)} ${units[i]}`;
}

export { humanReadableBytes };
