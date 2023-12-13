import styles from './sorting-page.module.css';
import React, { useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Button } from '../ui/button/button';
import { Direction } from '../../types/direction';
import { delay } from '../../utils/delay';
import { Column } from '../ui/column/column';

export const SortingPage: React.FC = () => {
  const [isDisabled, setDisabled] = useState(false);
  const [isBubbleTypeActive, setIsBubbleTypeActive] = useState(false);

  const handleRadioChange = () => {
    setIsBubbleTypeActive(!isBubbleTypeActive);
  };

  const wait = async () => {
    setDisabled(true);
    await delay(500);
    setDisabled(false);
  };

  useEffect(() => {
    wait();
  }, [isBubbleTypeActive]);

  return (
    <SolutionLayout title="Сортировка массива">
      <section className={styles.scheme}>
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
              disabled={isDisabled}
            />
            <Button
              text={`По убыванию`}
              sorting={Direction.Descending}
              extraClass={styles.button}
              disabled={isDisabled}
            />
            <Button
              text={`Новый массив`}
              extraClass={styles.new_array_button}
              disabled={isDisabled}
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
      </section>
    </SolutionLayout>
  );
};
