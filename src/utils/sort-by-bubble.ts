import { ColumnProps } from '../components/ui/column/column';
import { SHORT_DELAY_IN_MS } from '../constants/delays';
import { Direction } from '../types/direction';
import { ElementStates } from '../types/element-states';
import { delay } from './delay';

export default async function sortByBubble(
  columns: ColumnProps[],
  setColumns: React.Dispatch<React.SetStateAction<any>>,
  direction: Direction
): Promise<void> {
  for (let i = columns.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (
        (direction === Direction.Ascending &&
          columns[j].index > columns[j + 1].index) ||
        (direction === Direction.Descending &&
          columns[j].index < columns[j + 1].index)
      ) {
        [columns[j], columns[j + 1]] = [columns[j + 1], columns[j]];
      }
      columns[j].state = ElementStates.Changing;
      columns[j + 1].state = ElementStates.Changing;
      setColumns([...columns]);
      await delay(SHORT_DELAY_IN_MS);
      columns[j].state = ElementStates.Default;
      columns[j + 1].state = ElementStates.Default;
      setColumns([...columns]);
    }
    columns[i].state = ElementStates.Modified;
  }
}
