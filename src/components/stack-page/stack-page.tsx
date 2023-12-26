import styles from './stack-page.module.css';
import React, { useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { CircleProps } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { delay, findMarkedElementIndex } from '../../utils';
import { TOP } from '../../constants/element-captions';
import { TStack } from '../../types';

class Stack<T> implements TStack<T> {
  private elements: T[] = [];

  push = (item: T): void => {
    this.elements.push(item);
  };

  pop = (): void => {
    this.elements.pop();
  };

  getElements = (): T[] => {
    return this.elements;
  };

  getSize = (): number => {
    return this.elements.length;
  };
}

export const StackPage: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isAddingDisabled, setIsAddingDisabled] = useState(false);
  const [isAddingRunning, setIsAddingRunning] = useState(false);
  const [isDeletingRunning, setIsDeletingRunning] = useState(false);
  const [str, setStr] = useState<string>('');
  const [stack, setStack] = useState<Stack<CircleProps>>(
    new Stack<CircleProps>()
  );

  const addElement = async () => {
    if (stack.getSize() === 10) return;

    // disable controls
    setIsAddingRunning(true);
    setIsDisabled(true);

    const headIndex = findMarkedElementIndex(stack.getElements(), TOP);

    if (headIndex === null) {
      const element: CircleProps = {
        letter: str,
        state: ElementStates.Changing,
      };
      stack.push(element);
      setStack(stack);
    }

    await delay(SHORT_DELAY_IN_MS);
    stack.getElements()[stack.getSize() - 1].state = ElementStates.Default;
    setStack(stack);
    setStr('');

    //enable controls
    setIsDisabled(false);
    setIsAddingRunning(false);
  };

  const deleteElement = async () => {
    if (stack.getSize() === 0) return;
    setStr('');
    // disable controls
    setIsDeletingRunning(true);
    setIsDisabled(true);
    setIsAddingDisabled(true);

    stack.getElements()[stack.getSize() - 1].state = ElementStates.Changing;
    setStack(stack);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setStack(stack);

    // enable controls
    setIsDisabled(false);
    setIsDeletingRunning(false);
  };

  const clear = async () => {
    setStr('');
    setIsAddingDisabled(true);
    if (stack.getSize() === 0) return;
    setStack(new Stack<CircleProps>());
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
        {/* {elements.length > 0 && */}
        {stack.getSize() > 0 &&
          // elements.map((element, index) => (
          stack.getElements().map((element, index) => (
            <li key={index}>
              <Circle
                letter={element.letter}
                index={index}
                // head={index === elements.length - 1 ? 'top' : null}
                head={index === stack.getSize() - 1 ? 'top' : null}
                state={element.state}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
