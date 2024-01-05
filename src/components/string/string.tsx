import styles from './string.module.css';
import React, { useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle, CircleProps } from '../ui/circle/circle';
import turnOverCircles from '../../utils/turn-over-circles';

export const StringComponent: React.FC = () => {
  const [str, setStr] = useState<string>('');
  const [circles, setCircles] = useState<CircleProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setIsButtonDisabled(true);
    setIsInputDisabled(true);
    await turnOverCircles(str, setCircles);
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
          name="stringInput"
          maxLength={11}
          isLimitText={true}
          extraClass={styles.input}
          value={str}
          onChange={event => setStr(event.currentTarget.value)}
          disabled={isInputDisabled}
        />
        <Button isLoader={isLoading} text="Развернуть" type="submit" disabled={isButtonDisabled} />
      </form>
      {circles.length > 0 && (
        <div className={styles.scheme}>
          {circles.map(circle => {
            return (
              <Circle
                letter={circle.letter}
                key={circle.index}
                state={circle.state}
              />
            );
          })}
        </div>
      )}
    </SolutionLayout>
  );
};
