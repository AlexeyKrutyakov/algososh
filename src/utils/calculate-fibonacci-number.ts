export default function calculateFibonacciNumber(num: number): number {
  if (num === 1) return 1;
  if (num === 2) return 1;

  return calculateFibonacciNumber(num - 1) + calculateFibonacciNumber(num - 2);
}
