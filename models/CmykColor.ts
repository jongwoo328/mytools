import type ConvertableColor from "~/models/interfaces/ConvertableColor";
import RgbColor from "~/models/RgbColor";
import type { CmykColorValue } from "~/types/color";

export default class CmykColor implements ConvertableColor {
  public readonly cyan: number;
  public readonly magenta: number;
  public readonly yellow: number;
  public readonly key: number;

  constructor(cmyk: CmykColorValue) {
    if (
      cmyk.cyan < 0 ||
      cmyk.cyan > 100 ||
      cmyk.magenta < 0 ||
      cmyk.magenta > 100 ||
      cmyk.yellow < 0 ||
      cmyk.yellow > 100 ||
      cmyk.key < 0 ||
      cmyk.key > 100
    ) {
      throw new Error("Invalid CMYK color code");
    }
    this.cyan = cmyk.cyan;
    this.magenta = cmyk.magenta;
    this.yellow = cmyk.yellow;
    this.key = cmyk.key;
  }

  toString(): string {
    return `cmyk(${this.cyan}%, ${this.magenta}%, ${this.yellow}%, ${this.key}%)`;
  }

  static fromRgb(rgb: RgbColor) {
    const red = rgb.red / 255;
    const green = rgb.green / 255;
    const blue = rgb.blue / 255;
    const key = 1 - Math.max(red, green, blue);
    const cyan = key === 1 ? 0 : (1 - red - key) / (1 - key);
    const magenta = key === 1 ? 0 : (1 - green - key) / (1 - key);
    const yellow = key === 1 ? 0 : (1 - blue - key) / (1 - key);
    return new CmykColor({
      cyan: Math.round(cyan * 100),
      magenta: Math.round(magenta * 100),
      yellow: Math.round(yellow * 100),
      key: Math.round(key * 100),
    });
  }

  static fromHex(hex: string) {
    return CmykColor.fromRgb(RgbColor.fromHex(hex));
  }

  toRgb(): RgbColor {
    return new RgbColor({
      red: Math.round(255 - Math.min(1, (this.cyan / 100) * (1 - this.key / 100) + this.key / 100) * 255),
      green: Math.round(255 - Math.min(1, (this.magenta / 100) * (1 - this.key / 100) + this.key / 100) * 255),
      blue: Math.round(255 - Math.min(1, (this.yellow / 100) * (1 - this.key / 100) + this.key / 100) * 255),
    });
  }

  toHex() {
    return this.toRgb().toHex();
  }
}
