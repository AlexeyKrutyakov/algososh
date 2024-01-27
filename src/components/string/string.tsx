import styles from './string.module.css';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button/button';
import { Circle, CircleProps } from '../ui/circle/circle';
import { delay, convertStringToCircles, mirrorSymbols } from '../../utils';
import { ElementStates } from '../../types';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';

export const StringComponent: React.FC = () => {
  const [str, setStr] = useState<string>('');
  const [circles, setCircles] = useState<CircleProps[]>([]);

  const [changedIndex, setChangedIndex] = useState<number | null>(null);
  const [modifyedIndex, setModifyedIndex] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    setChangedIndex(null);
    setModifyedIndex(null);

    event.preventDefault();
    setIsLoading(true);
    setIsButtonDisabled(true);
    setIsInputDisabled(true);

    let symbols = str;
    setCircles(convertStringToCircles(symbols));
    await delay(1000);

    const midIndex = Math.floor(str.length / 2);
    for (let i = 0; i <= midIndex; i++) {
      setChangedIndex(i);
      await delay(1000);
      setModifyedIndex(i);
      symbols = mirrorSymbols(symbols, i);
      setCircles(convertStringToCircles(symbols));
    }

    setIsButtonDisabled(false);
    setIsInputDisabled(false);
    setStr('');
    setIsLoading(false);
  };

  useEffect(() => {
    if (str === '') {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [str]);

  return (
    <SolutionLayout title="Строка">
      <form
        action="reverseWord"
        className={styles.form}
        onSubmit={submitHandler}
      >
        <Input
          data-testid="input-for-string"
          name="stringInput"
          maxLength={11}
          isLimitText={true}
          extraClass={styles.input}
          value={str}
          onChange={(event) => setStr(event.currentTarget.value)}
          disabled={isInputDisabled}
        />
        <Button
          data-testid="submit-button"
          isLoader={isLoading}
          text="Развернуть"
          type="submit"
          disabled={isButtonDisabled}
        />
      </form>
      {circles.length > 0 && (
        <div
          className={styles.scheme}
          data-testid="scheme"
        >
          {circles.map((circle, index) => {
            return (
              <Circle
                letter={circle.letter}
                key={index}
                state={
                  modifyedIndex !== null &&
                  (index <= modifyedIndex ||
                    index >= circles.length - 1 - modifyedIndex)
                    ? ElementStates.Modified
                    : changedIndex !== null &&
                      (index === changedIndex ||
                        index === circles.length - 1 - changedIndex)
                    ? ElementStates.Changing
                    : ElementStates.Default
                }
              />
            );
          })}
        </div>
      )}
    </SolutionLayout>
  );
};
