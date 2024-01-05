import { ColumnProps } from '../components/ui/column/column';
import { SHORT_DELAY_IN_MS } from '../constants/delays';
import { Direction } from '../types/direction';
import { ElementStates } from '../types/element-states';
import { delay } from './delay';

export default async function sortBySelection(
  columns: ColumnProps[],
  setColumns: React.Dispatch<React.SetStateAction<any>>,
  direction: Direction
): Promise<void> {
  for (let i = 0; i < columns.length; i++) {
    let minIndex = i;
    let min = columns[i].index;
    columns[i].state = ElementStates.Changing;
    setColumns([...columns]);

    for (let j = i + 1; j < columns.length; j++) {
      columns[j].state = ElementStates.Changing;
      setColumns([...columns]);
      if (
        (direction === Direction.Ascending && columns[j].index < min) ||
        (direction === Direction.Descending && columns[j].index > min)
      ) {
        min = columns[j].index;
        minIndex = j;
      }
      await delay(SHORT_DELAY_IN_MS);
      columns[j].state = ElementStates.Default;
      setColumns([...columns]);
    }

    if (minIndex !== i) {
      columns[i].state = ElementStates.Default;
      [columns[i], columns[minIndex]] = [columns[minIndex], columns[i]];
      setColumns([...columns]);
    }
    columns[i].state = ElementStates.Modified;
    setColumns([...columns]);
  }
}
