import styles from './sorting-page.module.css';
import React, { useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Button } from '../ui/button/button';
import { Direction } from '../../types/direction';
import { delay } from '../../utils/delay';
import { Column, ColumnProps } from '../ui/column/column';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import createRandomArr from '../../utils/create-random-arr';
import sortBySelection from '../../utils/sort-by-selection';
import { ElementStates } from '../../types/element-states';
import setStateWithDelay from '../../utils/set-state-with-delay';
// import sortByBubble from '../../utils/sort-by-bubble'; // todo refactor

export const SortingPage: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isBubbleTypeActive, setIsBubbleTypeActive] = useState(false);
  const [isAscendSortingRunning, setIsAscendSortingRunning] = useState(false);
  const [isDescendSortingRunning, setIsDescendSortingRunning] = useState(false);
  const [numbers, setNumbers] = useState(createRandomArr(3, 17, 1, 100));
  const [columns, setColumns] = useState<ColumnProps[]>([]);
  const [changingIndexList, setChangingIndexList] = useState<number[]>([]);
  const [modifiedIndex, setModifiedIndex] = useState<number | null>(null);

  const setColumnsColorAsDefault = (): void => {
    setChangingIndexList([]);
    setModifiedIndex(null);
  };

  const createColumnsFromArray = (arr: number[]): ColumnProps[] => {
    const columns: ColumnProps[] = [];
    for (let i = 0; i < arr.length; i++) {
      columns.push({
        index: arr[i],
      });
    }
    return columns;
  };

  const handleRadioChange = () => {
    setIsBubbleTypeActive(!isBubbleTypeActive);
  };

  const handleSortClick = async (direction: Direction) => {
    setColumnsColorAsDefault();

    // block controls
    if (direction === Direction.Ascending) {
      setIsAscendSortingRunning(true);
    } else {
      setIsDescendSortingRunning(true);
    }
    setIsDisabled(true);

    if (!isBubbleTypeActive) {
      let arr: number[] = numbers;
      for (let i = 0; i < numbers.length; i++) {
        // animation of one step sorting
        for (let j = i + 1; j < numbers.length; j++) {
          setChangingIndexList([i, j]);

          await delay(500);
        }

        // set numbers after one step sorting
        arr = sortBySelection(arr, direction, i);
        setNumbers(arr);

        // paint columns
        setChangingIndexList([i]);
        setModifiedIndex(i);
      }
    }
    // isBubbleTypeActive && (await sortByBubble(columns, setColumns, direction));

    // unblock controls
    if (direction === Direction.Ascending) {
      setIsAscendSortingRunning(false);
    } else {
      setIsDescendSortingRunning(false);
    }
    setIsDisabled(false);
  };

  const handleNewArrayClick = () => {
    setColumnsColorAsDefault();

    setNumbers(createRandomArr(3, 17, 1, 100));
    setColumns(createColumnsFromArray(numbers));
  };

  const wait = async () => {
    setIsDisabled(true);
    await delay(SHORT_DELAY_IN_MS);
    setIsDisabled(false);
  };

  useEffect(() => {
    // todo change function to createColumnsFromNumbers(numbers, changingIndex, modifiedIndex);
    setColumns(createColumnsFromArray(numbers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numbers]);

  useEffect(() => {
    wait();
  }, [isBubbleTypeActive]);

  return (
    <SolutionLayout title="Сортировка массива">
      <nav className={styles.controls}>
        <div className={styles.radio_buttons}>
          <RadioInput
            label="Выбор"
            disabled={isDisabled}
            checked={!isBubbleTypeActive}
            onChange={handleRadioChange}
          />
          <RadioInput
            label="Пузырёк"
            disabled={isDisabled}
            checked={isBubbleTypeActive}
            onChange={handleRadioChange}
          />
        </div>
        <div className={styles.buttons}>
          <Button
            text={`По возрастанию`}
            sorting={Direction.Ascending}
            extraClass={styles.button}
            disabled={isDisabled}
            isLoader={isAscendSortingRunning}
            onClick={() => handleSortClick(Direction.Ascending)}
          />
          <Button
            text={`По убыванию`}
            sorting={Direction.Descending}
            extraClass={styles.button}
            disabled={isDisabled}
            isLoader={isDescendSortingRunning}
            onClick={() => handleSortClick(Direction.Descending)}
          />
          <Button
            text={`Новый массив`}
            extraClass={`${styles.new_array_button} ${styles.button}`}
            disabled={isDisabled}
            onClick={handleNewArrayClick}
          />
        </div>
      </nav>
      <div className={styles.scheme}>
        {columns.length > 0 &&
          columns.map((column, ind) => (
            <Column
              index={column.index}
              key={ind}
              state={
                modifiedIndex !== null && ind <= modifiedIndex
                  ? ElementStates.Modified
                  : changingIndexList.indexOf(ind) !== -1
                  ? ElementStates.Changing
                  : column.state
              }
            />
          ))}
      </div>
    </SolutionLayout>
  );
};
