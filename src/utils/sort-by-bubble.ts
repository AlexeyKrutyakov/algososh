import { Direction } from '../types/direction';

const swapElementsByDirecion = (
  arr: number[],
  index: number,
  direction: Direction
): void => {
  if (
    (direction === Direction.Ascending && arr[index] > arr[index + 1]) ||
    (direction === Direction.Descending && arr[index] < arr[index + 1])
  ) {
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
  }
};

export const sortByBubble = (
  arr: number[],
  direction: Direction,
  index?: number
): number[] => {
  const sortedArr: number[] = [...arr];
  if (index === undefined) {
    for (let i = sortedArr.length; i >= 0; i--) {
      for (let j = 0; j < i; j++) {
        swapElementsByDirecion(sortedArr, j, direction);
      }
    }
  } else {
    swapElementsByDirecion(sortedArr, index, direction);
  }

  return sortedArr;
};
