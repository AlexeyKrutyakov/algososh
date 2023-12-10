import styles from './string.module.css';
import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle, CircleProps } from '../ui/circle/circle';
import turnOverCircles from '../../utils/turnOverCircles';

export const StringComponent: React.FC = () => {
  const [str, setStr] = useState('');
  const [circles, setCircles] = useState<CircleProps[]>([]);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await turnOverCircles(str, setCircles);
  };

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
          onChange={event => setStr(event.currentTarget.value)}
        />
        <Button text="Развернуть" type="submit" />
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
