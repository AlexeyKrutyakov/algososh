import styles from './fibonacci-page.module.css';

import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import calculateFibonacciNumber from '../../utils/calculate-fibonacci-number';
import { ElementStates } from '../../types/element-states';
import { delay } from '../../utils/delay';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export const FibonacciPage: React.FC = () => {
  const maxNumber = 19;
  const [num, setNum] = useState(0);
  const [fibonacciNumbers, setfibonacciNumbers] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  let isButtonDisabled = false;

  if (num < 1 || num > maxNumber || num === undefined) isButtonDisabled = true;

  async function createFibonacciNumbers(num: number) {
    setIsLoading(true);

    await delay(SHORT_DELAY_IN_MS);
    setfibonacciNumbers([0]);

    for (let i = 1; i <= num; i++) {
      const fibonacciNumber = calculateFibonacciNumber(i);

      await delay(SHORT_DELAY_IN_MS);
      setfibonacciNumbers(fibonacciNumbers => [
        ...fibonacciNumbers,
        fibonacciNumber,
      ]);
    }

    setIsLoading(false);
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createFibonacciNumbers(num);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form
        action="reverseWord"
        className={styles.form}
        onSubmit={submitHandler}
      >
        <Input
          name="stringInput"
          type="number"
          max={maxNumber}
          isLimitText={true}
          extraClass={styles.input}
          onChange={event => setNum(+event.currentTarget.value)}
        />
        <Button
          isLoader={isLoading}
          text="Рассчитать"
          type="submit"
          extraClass={styles.button_disabled}
          disabled={isButtonDisabled}
        />
      </form>
      {fibonacciNumbers.length > 0 && (
        <div className={styles.scheme}>
          {fibonacciNumbers.map((number, index) => {
            return (
              <Circle
                index={index}
                letter={`${number}`}
                key={index}
                state={ElementStates.Default}
              />
            );
          })}
        </div>
      )}
    </SolutionLayout>
  );
};
