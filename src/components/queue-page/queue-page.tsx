import styles from './queue-page.module.css';
import React, { useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle, CircleProps } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { delay } from '../../utils/delay';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export const QueuePage: React.FC = () => {
  const [isAddingDisabled, setIsAddingDisabled] = useState(false);
  const [isDeletingDisabled, setIsDeletingDisabled] = useState(true);
  const [isClearingDisabled, setIsClearingDisabled] = useState(true);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const [isAddingRunning, setIsAddingRunning] = useState(false);
  const [isDeletingRunning, setIsDeletingRunning] = useState(false);
  const [str, setStr] = useState<string>('');
  const [elements, setElements] = useState<CircleProps[]>([]);

  const initializeElements = (): void => {
    const circles = [];
    for (let i = 0; i < 7; i++) {
      circles.push({
        index: i,
        head: '',
        tail: '',
      });
    }
    setElements([...circles]);
    setIsInputDisabled(false);
    setIsAddingDisabled(true);
    setIsDeletingDisabled(true);
    setIsClearingDisabled(true);
  };

  const findMarkedElementIndex = (mark: string) => {
    let markedElementIndex: number | null = null;

    for (let i = 0; i < elements.length; i++) {
      if (elements[i].head === mark || elements[i].tail === mark) {
        markedElementIndex = i;
      }
    }
    return markedElementIndex;
  };

  const animateElement = async (index: number): Promise<void> => {
    await delay(SHORT_DELAY_IN_MS);
    elements[index].state = ElementStates.Default;
    setElements([...elements]);
  };

  const enqueue = async () => {
    const tailIndex = findMarkedElementIndex('tail');

    if (tailIndex === elements.length - 1) return;

    setIsAddingRunning(true);

    setIsAddingDisabled(true);
    setIsDeletingDisabled(true);
    setIsClearingDisabled(true);

    if (tailIndex === null) {
      elements[0].letter = str;
      elements[0].head = 'head';
      elements[0].tail = 'tail';
      elements[0].state = ElementStates.Changing;
      setElements([...elements]);

      animateElement(0);
    } else {
      elements[tailIndex].tail = '';
      elements[tailIndex + 1].letter = str;
      elements[tailIndex + 1].tail = 'tail';
      elements[tailIndex + 1].state = ElementStates.Changing;
      setElements([...elements]);

      animateElement(tailIndex + 1);
    }
    setStr('');

    setIsAddingDisabled(false);
    setIsDeletingDisabled(false);
    setIsClearingDisabled(false);

    setIsAddingRunning(false);
  };

  const dequeue = async () => {
    setIsDeletingRunning(true);

    setStr('');

    setIsAddingDisabled(true);
    setIsDeletingDisabled(true);
    setIsClearingDisabled(true);
    setIsInputDisabled(true);

    const tailIndex = findMarkedElementIndex('tail');
    const headIndex = findMarkedElementIndex('head');
    console.log('tailIndex', tailIndex);
    console.log('headIndex', headIndex);

    if (headIndex === null || tailIndex === null) {
      console.log('!headIndex || !tailIndex');
      return;
    }

    elements[headIndex].state = ElementStates.Changing;

    await delay(SHORT_DELAY_IN_MS);

    if (headIndex === tailIndex) {
      elements[headIndex].tail = '';
    } else {
      elements[headIndex].head = '';
      elements[headIndex + 1].head = 'head';
    }
    elements[headIndex].letter = '';
    elements[headIndex].state = ElementStates.Default;

    setElements([...elements]);
    setIsClearingDisabled(false);
    setIsDeletingRunning(false);

    if (headIndex === tailIndex) {
      return;
    }
    setIsDeletingDisabled(false);
    setIsInputDisabled(false);
  };

  const clear = async () => {
    setStr('');
    setIsAddingDisabled(true);
    if (elements.length === 0) return;
    initializeElements();
  };

  useEffect(() => {
    initializeElements();
  }, []);

  useEffect(() => {
    if (str === '') {
      setIsAddingDisabled(true);
    } else {
      setIsAddingDisabled(false);
    }
  }, [str]);

  return (
    <SolutionLayout title="Очередь">
      <nav className={styles.controls}>
        <Input
          value={str}
          extraClass={styles.input}
          isLimitText={true}
          maxLength={4}
          onChange={event => setStr(event.currentTarget.value)}
          disabled={isInputDisabled}
        />
        <Button
          text="Добавить"
          onClick={enqueue}
          isLoader={isAddingRunning}
          disabled={isAddingDisabled}
        />
        <Button
          text="Удалить"
          onClick={dequeue}
          isLoader={isDeletingRunning}
          disabled={isDeletingDisabled}
        />
        <Button
          extraClass={styles.button_last}
          text="Очистить"
          onClick={clear}
          disabled={isClearingDisabled}
        />
      </nav>
      <ul className={styles.scheme}>
        {elements.length > 0 &&
          elements.map((element, index) => (
            <li key={index}>
              <Circle
                letter={element.letter}
                index={element.index}
                head={element.head}
                tail={element.tail}
                state={element.state}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
