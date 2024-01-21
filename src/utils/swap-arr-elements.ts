export function swapArrElements<T extends Array<any>>(
  arr: T,
  firstIndex: number,
  secondIndex: number
): T {
  [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
  return arr;
}
