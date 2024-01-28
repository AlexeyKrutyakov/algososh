import styles from './fibonacci-page.module.css';

import React, { useEffect, useState } from 'react';
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
  const [str, setStr] = useState('');
  const [fibonacciNumbers, setfibonacciNumbers] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);

  async function createFibonacciNumbers(num: number) {
    setIsLoading(true);
    setIsButtonDisabled(true);
    setIsInputDisabled(true);

    await delay(SHORT_DELAY_IN_MS);
    setfibonacciNumbers([0]);

    for (let i = 1; i <= num; i++) {
      const fibonacciNumber = calculateFibonacciNumber(i);

      await delay(SHORT_DELAY_IN_MS);
      setfibonacciNumbers((fibonacciNumbers) => [
        ...fibonacciNumbers,
        fibonacciNumber,
      ]);
    }

    setIsButtonDisabled(false);
    setIsInputDisabled(false);
    setIsLoading(false);
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createFibonacciNumbers(+str);
  };

  useEffect(() => {
    if (+str < 1 || +str > maxNumber || str === '') {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [str]);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form
        action="reverseWord"
        className={styles.form}
        onSubmit={submitHandler}
      >
        <Input
          data-testid="input-for-string"
          name="stringInput"
          type="number"
          max={maxNumber}
          isLimitText={true}
          value={str}
          extraClass={styles.input}
          onChange={(event) => setStr(event.currentTarget.value)}
          disabled={isInputDisabled}
        />
        <Button
          data-testid="submit-button"
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
