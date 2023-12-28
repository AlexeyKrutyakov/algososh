import styles from './queue-page.module.css';
import React, { useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle, CircleProps } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import {
  addToTail,
  findMarkedElementIndex,
  setElementStateWithDelay,
} from '../../utils';
import { removeFromHead } from '../../utils/manipulate-with-head';
import { HEAD, TAIL } from '../../constants/element-captions';
import { TQueue } from '../../types/queue';

class Queue<T> {
  private elements: T[] = [];
  private head: number | null = null;
  private tail: number | null = null;
  private size: number = 0;

  constructor(size: number) {
    this.size = size;
  }

  enqueue = (item: T): void => {
    if (this.head === null || this.tail === null) {
      this.elements[0] = item;
      this.head = 0;
      this.tail = 0;
    } else {
      if ((this.head || this.tail) === this.getSize() - 1) {
        return;
      } else {
        this.elements[this.tail + 1] = item;
        this.tail++;
      }
    }
  };

  dequeue = (): void => {
    if (this.head === null || this.tail === null) return;

    if (this.head === this.tail) {
      this.tail = null;
    } else {
      this.head++;
    }
    this.elements.shift();
  };

  clear = (): void => {
    this.elements = [];
    this.head = null;
    this.tail = null;
    this.size = 0;
  };

  getHead = (): number | null => {
    return this.head;
  };

  getTail = (): number | null => {
    return this.tail;
  };

  getElements = (): T[] => {
    return this.elements;
  };

  getSize = (): number => {
    return this.size;
  };
}

const queue = new Queue<string>(7);

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

  const enqueue = async () => {
    const tailIndex = findMarkedElementIndex(elements, TAIL);

    if (tailIndex === elements.length - 1) return;

    // block controls
    setIsAddingRunning(true);
    setIsAddingDisabled(true);
    setIsDeletingDisabled(true);
    setIsClearingDisabled(true);

    if (tailIndex === null) {
      await setElementStateWithDelay(
        elements,
        setElements,
        0,
        ElementStates.Changing,
        0
      );
      await addToTail(elements, setElements, tailIndex, str, HEAD);
      await setElementStateWithDelay(
        elements,
        setElements,
        0,
        ElementStates.Default,
        SHORT_DELAY_IN_MS
      );
    } else {
      await setElementStateWithDelay(
        elements,
        setElements,
        tailIndex + 1,
        ElementStates.Changing,
        0
      );
      await addToTail(elements, setElements, tailIndex, str);
      await setElementStateWithDelay(
        elements,
        setElements,
        tailIndex + 1,
        ElementStates.Default,
        SHORT_DELAY_IN_MS
      );
    }

    setStr('');

    // unblock controls
    setIsAddingDisabled(false);
    setIsDeletingDisabled(false);
    setIsClearingDisabled(false);
    setIsAddingRunning(false);
  };

  const dequeue = async () => {
    setStr('');

    // block controls
    setIsDeletingRunning(true);
    setIsAddingDisabled(true);
    setIsDeletingDisabled(true);
    setIsClearingDisabled(true);
    setIsInputDisabled(true);

    const tailIndex = findMarkedElementIndex(elements, TAIL);
    const headIndex = findMarkedElementIndex(elements, HEAD);

    if (headIndex === null || tailIndex === null) return;

    await setElementStateWithDelay(
      elements,
      setElements,
      headIndex,
      ElementStates.Changing,
      0
    );
    await setElementStateWithDelay(
      elements,
      setElements,
      headIndex,
      ElementStates.Default,
      SHORT_DELAY_IN_MS
    );
    await removeFromHead(elements, setElements, headIndex, tailIndex);

    // unblock controls
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
          onChange={(event) => setStr(event.currentTarget.value)}
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
