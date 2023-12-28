import styles from './queue-page.module.css';
import React, { useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle, CircleProps } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { renderAnimation } from '../../utils';
import { HEAD, TAIL } from '../../constants/element-captions';
import { TQueue } from '../../types/queue';

class Queue<T> implements TQueue<T> {
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
        this.elements.push(item);
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

  getLength = (): number => {
    return this.elements.length;
  };
}

const queue = new Queue<string>(7);

export const QueuePage: React.FC = () => {
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [isAddDisabled, setIsAddDisabled] = useState<boolean>(false);
  const [isDeleteDisabled, setIsDeleteDisabled] = useState<boolean>(false);
  const [isClearDisabled, setIsClearDisabled] = useState<boolean>(false);
  const [isAddingRunning, setIsAddingRunning] = useState(false);
  const [isDeletingRunning, setIsDeletingRunning] = useState(false);
  const [activeCircleState, setActiveCircleState] = useState<ElementStates>(
    ElementStates.Default
  );
  const [str, setStr] = useState<string>('');
  const [circles, setCircles] = useState<CircleProps[]>([]);

  const disableControls = (): void => {
    setIsInputDisabled(true);
    setIsAddDisabled(true);
    setIsDeleteDisabled(true);
    setIsClearDisabled(true);
  };

  const enableControls = (): void => {
    setIsInputDisabled(false);
    setIsAddDisabled(false);
    setIsDeleteDisabled(false);
    setIsClearDisabled(false);
  };

  const createCircles = (): CircleProps[] => {
    const circles = [];
    const elements = queue.getElements();
    const head = queue.getHead();

    for (let i = 0; i < queue.getSize(); i++) {
      let letter: string = '';
      if (head !== null && i >= head) {
        letter = elements[i - head];
      }

      circles.push({
        letter,
        index: i,
        state: ElementStates.Default,
      });
    }

    return circles;
  };

  const addElement = async () => {
    if (queue.getLength() >= queue.getSize()) return;

    disableControls();
    setIsAddingRunning(true);

    // add element
    queue.enqueue(str);
    setCircles(createCircles());

    await renderAnimation(setActiveCircleState);

    enableControls();
    setIsAddingRunning(false);

    setStr('');
  };

  const deleteElement = async () => {
    disableControls();
    setIsDeletingRunning(true);

    await renderAnimation(setActiveCircleState);

    // delete element
    queue.dequeue();
    setCircles(createCircles());

    enableControls();
    setIsDeletingRunning(false);

    setStr('');
  };

  const clear = async () => {
    queue.clear();
    setCircles(createCircles());
    setStr('');
  };

  const calculateState = (index: number): ElementStates => {
    const head = queue.getHead();
    const tail = queue.getTail();

    return (index === head && index === tail) ||
      (index === head && isDeletingRunning) ||
      (index === tail && isAddingRunning)
      ? activeCircleState
      : ElementStates.Default;
  };

  useEffect(() => {
    setCircles(createCircles());
  }, []);

  return (
    <SolutionLayout title="Очередь">
      <nav className={styles.controls}>
        <Input
          value={str}
          extraClass={styles.input}
          isLimitText={true}
          maxLength={4}
          onChange={event => setStr(event.currentTarget.value)}
          disabled={
            (queue.getHead() !== null && queue.getTail() === null) ||
            isInputDisabled
          }
        />
        <Button
          text="Добавить"
          onClick={addElement}
          isLoader={isAddingRunning}
          disabled={
            str === '' ||
            (queue.getHead() !== null && queue.getTail() === null) ||
            isAddDisabled
          }
        />
        <Button
          text="Удалить"
          onClick={deleteElement}
          isLoader={isDeletingRunning}
          disabled={queue.getLength() === 0 || isDeleteDisabled}
        />
        <Button
          extraClass={styles.button_last}
          text="Очистить"
          onClick={clear}
          disabled={
            (queue.getLength() === 0 && queue.getHead() === null) ||
            isClearDisabled
          }
        />
      </nav>
      <ul className={styles.scheme}>
        {circles.length > 0 &&
          circles.map((element, index) => (
            <li key={index}>
              <Circle
                letter={element.letter}
                index={element.index}
                head={index === queue.getHead() ? HEAD : ''}
                tail={index === queue.getTail() ? TAIL : ''}
                state={calculateState(index)}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
