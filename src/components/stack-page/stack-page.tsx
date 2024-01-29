import styles from './stack-page.module.css';
import React, { useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { CircleProps } from '../ui/circle/circle';
import { renderAnimation } from '../../utils';
import { ElementStates } from '../../types';
import { Stack } from './stack';

const stack = new Stack<string>(10);

export const StackPage: React.FC = () => {
  const [isControlsDisabled, setIsControlsDisabled] = useState(false);
  const [isAddingRunning, setIsAddingRunning] = useState(false);
  const [isDeletingRunning, setIsDeletingRunning] = useState(false);
  const [activeCircleState, setActiveCircleState] = useState<ElementStates>(
    ElementStates.Default
  );
  const [str, setStr] = useState<string>('');
  const [circles, setCircles] = useState<CircleProps[]>([]);

  const createCircles = (stack: Stack<string>): CircleProps[] => {
    const circles = [];
    const elements = stack.getElements();
    for (let i = 0; i < elements.length; i++) {
      circles.push({
        letter: elements[i],
        state:
          i < elements.length - 1
            ? ElementStates.Default
            : ElementStates.Changing,
      });
    }

    return circles;
  };

  const addElement = async () => {
    if (stack.getLength() === stack.getSize()) return;

    setIsAddingRunning(true);
    setIsControlsDisabled(true);
    console.log('isAddingRunning', isAddingRunning);

    // add element
    stack.push(str);
    setCircles(createCircles(stack));

    await renderAnimation(setActiveCircleState);

    setIsControlsDisabled(false);
    setIsAddingRunning(false);

    setStr('');
  };

  const deleteElement = async () => {
    if (stack.getSize() === 0) return;

    setIsDeletingRunning(true);
    setIsControlsDisabled(true);

    await renderAnimation(setActiveCircleState);

    // delete element
    stack.pop();
    setCircles(createCircles(stack));
    setStr('');

    setIsControlsDisabled(false);
    setIsDeletingRunning(false);
  };

  const clear = async () => {
    if (stack.getSize() === 0) return;

    setIsControlsDisabled(true);

    // clear stack and circles
    stack.clear();
    setCircles([]);
    setStr('');

    setIsControlsDisabled(false);
  };

  return (
    <SolutionLayout title="Стек">
      <nav className={styles.controls}>
        <Input
          data-testid="input-for-string"
          name="text"
          value={str}
          extraClass={styles.input}
          isLimitText={true}
          maxLength={4}
          onChange={(event) => setStr(event.currentTarget.value)}
          disabled={isControlsDisabled}
        />
        <Button
          data-testid="add-button"
          text="Добавить"
          onClick={addElement}
          isLoader={isAddingRunning}
          disabled={str === '' || isControlsDisabled}
        />
        <Button
          data-testid="delete-button"
          text="Удалить"
          onClick={deleteElement}
          isLoader={isDeletingRunning}
          disabled={stack.getLength() === 0 || isControlsDisabled}
        />
        <Button
          data-testid="clear-button"
          extraClass={styles.button_last}
          text="Очистить"
          onClick={clear}
          disabled={stack.getLength() === 0 || isControlsDisabled}
        />
      </nav>
      <ul className={styles.scheme}>
        {circles.length > 0 &&
          circles.map((element, index) => (
            <li key={index}>
              <Circle
                letter={element.letter}
                index={index}
                head={index === circles.length - 1 ? 'top' : null}
                state={
                  index === circles.length - 1
                    ? activeCircleState
                    : ElementStates.Default
                }
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
