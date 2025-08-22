import type ConvertableColor from "~/models/interfaces/ConvertableColor";
import type { RgbColorValue } from "~/types/color";

export default class RgbColor implements ConvertableColor {
  public readonly red: number;
  public readonly green: number;
  public readonly blue: number;

  constructor(rgb: RgbColorValue) {
    if (rgb.red < 0 || rgb.red > 255 || rgb.green < 0 || rgb.green > 255 || rgb.blue < 0 || rgb.blue > 255) {
      throw new Error("Invalid RGB color code");
    }
    this.red = rgb.red;
    this.green = rgb.green;
    this.blue = rgb.blue;
  }

  static fromHex(hex: string) {
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) {
      throw new Error("Invalid hex color code");
    }
    const red = parseInt(hex.slice(1, 3), 16);
    const green = parseInt(hex.slice(3, 5), 16);
    const blue = parseInt(hex.slice(5, 7), 16);
    return new RgbColor({ red, green, blue });
  }

  toString(): string {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  toHex(): string {
    const red = this.red.toString(16).padStart(2, "0");
    const green = this.green.toString(16).padStart(2, "0");
    const blue = this.blue.toString(16).padStart(2, "0");
    return `#${red}${green}${blue}`;
  }
}
