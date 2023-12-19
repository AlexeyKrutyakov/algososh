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

export const StackPage: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isAddingDisabled, setIsAddingDisabled] = useState(false);
  const [isAddingRunning, setIsAddingRunning] = useState(false);
  const [isDeletingRunning, setIsDeletingRunning] = useState(false);
  const [str, setStr] = useState<string>('');
  const [elements, setElements] = useState<CircleProps[]>([]);

  const addElement = async () => {
    if (elements.length === 10) return;

    setIsAddingRunning(true);
    setIsDisabled(true);

    const element: CircleProps = { letter: str, state: ElementStates.Changing };
    setStr('');
    elements.push(element);
    setElements([...elements]);
    await delay(SHORT_DELAY_IN_MS);
    elements[elements.length - 1].state = ElementStates.Default;
    setElements([...elements]);

    setIsDisabled(false);
    setIsAddingRunning(false);
  };

  const deleteElement = async () => {
    if (elements.length === 0) return;

    setStr('');
    setIsDeletingRunning(true);
    setIsDisabled(true);
    setIsAddingDisabled(true);

    elements[elements.length - 1].state = ElementStates.Changing;
    setElements([...elements]);
    await delay(SHORT_DELAY_IN_MS);

    elements.pop();
    setElements([...elements]);

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
