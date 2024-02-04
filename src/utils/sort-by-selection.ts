import { Direction } from '../types/direction';

const swapElementsByDirecion = (
  arr: number[],
  index: number,
  direction: Direction
): void => {
  let minIndex = index;
  let min = arr[minIndex];
  for (let j = index + 1; j < arr.length; j++) {
    if (
      (direction === Direction.Ascending && arr[j] < min) ||
      (direction === Direction.Descending && arr[j] > min)
    ) {
      min = arr[j];
      minIndex = j;
    }
  }

  if (minIndex !== index) {
    [arr[index], arr[minIndex]] = [arr[minIndex], arr[index]];
  }
};

export const sortBySelection = (
  arr: number[],
  direction: Direction,
  index?: number
): number[] => {
  const resultArray = [...arr];

  if (index === undefined) {
    for (let i = 0; i < resultArray.length; i++) {
      swapElementsByDirecion(resultArray, i, direction);
    }
  } else {
    swapElementsByDirecion(resultArray, index, direction);
  }

  return resultArray;
};
