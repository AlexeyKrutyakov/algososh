import styles from './sorting-page.module.css';
import React, { useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Button } from '../ui/button/button';
import { Direction } from '../../types/direction';
import { delay } from '../../utils/delay';
import { Column } from '../ui/column/column';
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../constants/delays';
import createRandomArr from '../../utils/createRandomArr';

export const SortingPage: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isBubbleTypeActive, setIsBubbleTypeActive] = useState(false);
  const [isAscendSortingRunning, setIsAscendSortingRunning] = useState(false);
  const [isDescendSortingRunning, setIsDescendSortingRunning] = useState(false);

  const handleRadioChange = () => {
    setIsBubbleTypeActive(!isBubbleTypeActive);
  };

  const handleAscendClick = async () => {
    setIsAscendSortingRunning(true);
    setIsDisabled(true);
    await delay(DELAY_IN_MS);
    setIsAscendSortingRunning(false);
    setIsDisabled(false);
  };

  const handleDescendClick = async () => {
    setIsDescendSortingRunning(true);
    setIsDisabled(true);
    await delay(DELAY_IN_MS);
    setIsDescendSortingRunning(false);
    setIsDisabled(false);
  };

  const handleNewArrayClick = () => {
    const newArray = createRandomArr(3, 17, 1, 100);
    console.log(newArray);
  };

  const wait = async () => {
    setIsDisabled(true);
    await delay(SHORT_DELAY_IN_MS);
    setIsDisabled(false);
  };

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
            onClick={handleAscendClick}
          />
          <Button
            text={`По убыванию`}
            sorting={Direction.Descending}
            extraClass={styles.button}
            disabled={isDisabled}
            isLoader={isDescendSortingRunning}
            onClick={handleDescendClick}
          />
          <Button
            text={`Новый массив`}
            extraClass={`${styles.new_array_button} ${styles.button}`}
            disabled={isDisabled}
            onClick={handleNewArrayClick}
          />
        </div>
      </nav>
      <div className={styles.sorting_columns}>
        <Column index={2} />
        <Column index={34} />
        <Column index={17} />
        <Column index={100} />
        <Column index={50} />
      </div>
    </SolutionLayout>
  );
};
