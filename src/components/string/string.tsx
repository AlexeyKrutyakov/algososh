import styles from './string.module.css';
import React, { useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { ElementStates } from '../../types/element-states';
import { Circle, CircleProps } from '../ui/circle/circle';

export const StringComponent: React.FC = () => {
  const [circles, setCircles] = useState<CircleProps[]>([]);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const word = document.querySelector('input')?.value;
    let letters: string[] = [];

    if (word) letters = Array.from(word);

    console.log(letters);

    letters.map((letter, index) =>
      setCircles(circles => [
        ...circles,
        {
          letter,
          index,
          state: ElementStates.Default,
        },
      ])
    );
  };

  useEffect(() => console.log('circles', circles), [circles]);

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
