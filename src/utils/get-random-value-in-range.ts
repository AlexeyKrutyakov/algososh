export default function getRandomValueFromRange(
  minValue: number,
  maxValue: number
): number {
  minValue = Math.ceil(minValue);
  maxValue = Math.floor(maxValue + 1);

  return Math.floor(Math.random() * (maxValue - minValue) + minValue);
}
