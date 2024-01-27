import { swapArrElements } from './swap-arr-elements';

export function mirrorSymbols(str: string, index?: number): string {
  let strArr = str.split('');
  const len = strArr.length;
  const midIndex = Math.floor(len / 2);
  let i = 0;

  if (index !== undefined) {
    if (index > midIndex) return strArr.join('');
    i = index;
  }

  for (i; i < midIndex; i++) {
    strArr = swapArrElements(strArr, i, len - 1 - i);
    if (index !== undefined) break;
  }

  return strArr.join('');
}
