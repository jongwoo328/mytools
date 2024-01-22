export type CalculationType = "plus" | "minus";
export type CalculationInfo = {
  $key: string;
  type: CalculationType;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};
