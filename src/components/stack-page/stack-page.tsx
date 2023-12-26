import styles from './stack-page.module.css';
import React, { useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { CircleProps } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { delay } from '../../utils';
import { TStack } from '../../types';

class Stack<T> implements TStack<T> {
  private elements: T[] = [];

  push = (item: T): void => {
    this.elements.push(item);
  };

  pop = (): void => {
    this.elements.pop();
  };

  clear = (): void => {
    this.elements = [];
  };

  getElements = (): T[] => {
    return this.elements;
  };

  getSize = (): number => {
    return this.elements.length;
  };
}

const stack = new Stack<string>();

export const StackPage: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isAddingDisabled, setIsAddingDisabled] = useState(false);
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
    if (stack.getSize() === 10) return;

    // disable controls
    setIsAddingRunning(true);
    setIsDisabled(true);

    stack.push(str);
    setCircles(createCircles(stack));

    // animate circle
    setActiveCircleState(ElementStates.Changing);
    await delay(SHORT_DELAY_IN_MS);
    setActiveCircleState(ElementStates.Default);

    setStr('');

    //enable controls
    setIsDisabled(false);
    setIsAddingRunning(false);
  };

  const deleteElement = async () => {
    // if (stack.getSize() === 0) return;
    // setStr('');
    // // disable controls
    // setIsDeletingRunning(true);
    // setIsDisabled(true);
    // setIsAddingDisabled(true);
    // stack.getElements()[stack.getSize() - 1].state = ElementStates.Changing;
    // setCircles(stack);
    // await delay(SHORT_DELAY_IN_MS);
    // stack.pop();
    // setCircles(stack);
    // // enable controls
    // setIsDisabled(false);
    // setIsDeletingRunning(false);
  };

  const clear = async () => {
    // if (stack.getSize() === 0) return;
    // setIsDisabled(true);
    // stack.clear();
    // setCircles(new Stack<CircleProps>());
    // setStr('');
    // setIsDisabled(false);
  };

  useEffect(() => {
    if (str === '') {
      setIsAddingDisabled(true);
    } else {
      setIsAddingDisabled(false);
    }
  }, [str]);

  return (
    <SolutionLayout title="Стек">
      <nav className={styles.controls}>
        <Input
          name="text"
          value={str}
          extraClass={styles.input}
          isLimitText={true}
          maxLength={4}
          onChange={event => setStr(event.currentTarget.value)}
          disabled={isDisabled}
        />
        <Button
          text="Добавить"
          onClick={addElement}
          isLoader={isAddingRunning}
          disabled={isAddingDisabled}
        />
        <Button
          text="Удалить"
          onClick={deleteElement}
          isLoader={isDeletingRunning}
          disabled={isDisabled}
        />
        <Button
          extraClass={styles.button_last}
          text="Очистить"
          onClick={clear}
          disabled={isDisabled}
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
