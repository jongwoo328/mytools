import ConvertableColor from "~/models/interfaces/ConvertableColor";
import { HslColorValue } from "~/types/color";
import RgbColor from "~/models/RgbColor";

export default class HslColor implements ConvertableColor {
  public readonly hue: number;
  public readonly saturation: number;
  public readonly lightness: number;

  constructor(hslColor: HslColorValue) {
    if (
      hslColor.hue < 0 ||
      hslColor.hue > 360 ||
      hslColor.saturation < 0 ||
      hslColor.saturation > 100 ||
      hslColor.lightness < 0 ||
      hslColor.lightness > 100
    ) {
      throw new Error("Invalid HSL color code");
    }
    this.hue = hslColor.hue;
    this.saturation = hslColor.saturation;
    this.lightness = hslColor.lightness;
  }

  static fromRgb(rgb: RgbColor) {
    const red = rgb.red / 255;
    const green = rgb.green / 255;
    const blue = rgb.blue / 255;
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const chroma = max - min;
    let hue;
    if (chroma === 0) {
      hue = 0;
    } else if (max === red) {
      hue = 60 * (((green - blue) / chroma) % 6);
    } else if (max === green) {
      hue = 60 * ((blue - red) / chroma + 2);
    } else {
      hue = 60 * ((red - green) / chroma + 4);
    }
    if (hue < 0) {
      hue += 360;
    }
    const lightness = (max + min) / 2;
    const saturation = chroma === 0 ? 0 : chroma / (1 - Math.abs(2 * lightness - 1));
    return new HslColor({
      hue: Math.round(hue),
      saturation: Math.round(saturation * 100),
      lightness: Math.round(lightness * 100),
    });
  }

  static fromHex(hex: string) {
    return HslColor.fromRgb(RgbColor.fromHex(hex));
  }

  toString(): string {
    return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
  }

  toRgb(): RgbColor {
    // Convert hue to the range of 0 to 1
    const hue = this.hue / 360;

    // Convert saturation and lightness to the range of 0 to 1
    const saturation = this.saturation / 100;
    const lightness = this.lightness / 100;

    // Calculate chroma and intermediate values
    const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const x = chroma * (1 - Math.abs(((hue * 6) % 2) - 1));
    const m = lightness - chroma / 2;

    let r, g, b;

    // Calculate RGB values based on the hue range
    if (hue >= 0 && hue < 1 / 6) {
      r = chroma;
      g = x;
      b = 0;
    } else if (hue >= 1 / 6 && hue < 2 / 6) {
      r = x;
      g = chroma;
      b = 0;
    } else if (hue >= 2 / 6 && hue < 3 / 6) {
      r = 0;
      g = chroma;
      b = x;
    } else if (hue >= 3 / 6 && hue < 4 / 6) {
      r = 0;
      g = x;
      b = chroma;
    } else if (hue >= 4 / 6 && hue < 5 / 6) {
      r = x;
      g = 0;
      b = chroma;
    } else {
      r = chroma;
      g = 0;
      b = x;
    }

    // Adjust RGB values with the lightness and add the base value
    const red = Math.round((r + m) * 255);
    const green = Math.round((g + m) * 255);
    const blue = Math.round((b + m) * 255);
    return new RgbColor({
      red,
      green,
      blue,
    });
  }

  toHex(): string {
    return this.toRgb().toHex();
  }
}
