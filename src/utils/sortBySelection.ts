import { SHORT_DELAY_IN_MS } from '../constants/delays';
import { Direction } from '../types/direction';
import { delay } from './delay';

export default async function sortBySelection(
  numbers: number[],
  setNumbers: React.Dispatch<React.SetStateAction<any>>,
  direction: Direction
): Promise<void> {
  for (let i = 0; i < numbers.length; i++) {
    let minIndex = i;
    let min = numbers[i];

    for (let j = i + 1; j < numbers.length; j++) {
      if (direction === Direction.Ascending) {
      }
      if (
        (direction === Direction.Ascending && numbers[j] < min) ||
        (direction === Direction.Descending && numbers[j] > min)
      ) {
        min = numbers[j];
        minIndex = j;
      }
    }
    await delay(SHORT_DELAY_IN_MS);

    if (minIndex !== i) {
      [numbers[i], numbers[minIndex]] = [numbers[minIndex], numbers[i]];
      setNumbers([...numbers]);
    }
  }
}
