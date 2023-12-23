import styles from './stack-page.module.css';
import React, { useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { CircleProps } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import {
  addToTail,
  delay,
  findMarkedElementIndex,
  setElementStateWithDelay,
} from '../../utils';
import { HEAD, TOP } from '../../constants/element-captions';

export const StackPage: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isAddingDisabled, setIsAddingDisabled] = useState(false);
  const [isAddingRunning, setIsAddingRunning] = useState(false);
  const [isDeletingRunning, setIsDeletingRunning] = useState(false);
  const [str, setStr] = useState<string>('');
  const [elements, setElements] = useState<CircleProps[]>([]);

  const addElement = async () => {
    if (elements.length === 10) return;

    // disable controls
    setIsAddingRunning(true);
    setIsDisabled(true);

    const headIndex = findMarkedElementIndex(elements, HEAD);

    if (headIndex === null) {
      const element: CircleProps = { letter: str };
      elements.push(element);
      setElements([...elements]);
    }

    await addToTail(elements, setElements, headIndex, str, TOP);
    setStr('');

    await setElementStateWithDelay(
      elements,
      setElements,
      elements.length - 1,
      ElementStates.Changing,
      0
    );

    await setElementStateWithDelay(
      elements,
      setElements,
      elements.length - 1,
      ElementStates.Default,
      SHORT_DELAY_IN_MS
    );

    //enable controls
    setIsDisabled(false);
    setIsAddingRunning(false);
  };

  const deleteElement = async () => {
    if (elements.length === 0) return;

    setStr('');

    // disable controls
    setIsDeletingRunning(true);
    setIsDisabled(true);
    setIsAddingDisabled(true);

    await setElementStateWithDelay(
      elements,
      setElements,
      elements.length - 1,
      ElementStates.Changing,
      0
    );

    await delay(SHORT_DELAY_IN_MS);

    elements.pop();
    setElements([...elements]);

    // enable controls
    setIsDisabled(false);
    setIsDeletingRunning(false);
  };

  const clear = async () => {
    setStr('');
    setIsAddingDisabled(true);
    if (elements.length === 0) return;
    setElements([]);
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
        {elements.length > 0 &&
          elements.map((element, index) => (
            <li key={index}>
              <Circle
                letter={element.letter}
                index={index}
                head={index === elements.length - 1 ? 'top' : null}
                state={element.state}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
