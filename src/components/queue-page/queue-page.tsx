import styles from './queue-page.module.css';
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle, CircleProps } from '../ui/circle/circle';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { renderAnimation } from '../../utils';
import { ElementStates } from '../../types';
import { HEAD, TAIL } from '../../constants/element-captions';
import { Queue } from './queue';

const queue = new Queue<string>(7);

export const QueuePage: React.FC = () => {
  const [isControlsDisabled, setIsControlsDisabled] = useState<boolean>(false);
  const [isAddingRunning, setIsAddingRunning] = useState<boolean>(false);
  const [isDeletingRunning, setIsDeletingRunning] = useState<boolean>(false);
  const [isClearingRunning, setIsCleringRunning] = useState<boolean>(false);
  const [activeCircleState, setActiveCircleState] = useState<ElementStates>(
    ElementStates.Default
  );
  const [str, setStr] = useState<string>('');
  const [circles, setCircles] = useState<CircleProps[]>([]);

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

    setIsControlsDisabled(true);
    setIsAddingRunning(true);

    // add element
    queue.enqueue(str);
    setCircles(createCircles());

    await renderAnimation(setActiveCircleState);

    setIsControlsDisabled(false);
    setIsAddingRunning(false);

    setStr('');
  };

  const deleteElement = async () => {
    setIsControlsDisabled(true);
    setIsDeletingRunning(true);

    await renderAnimation(setActiveCircleState);

    // delete element
    queue.dequeue();
    setCircles(createCircles());

    setIsControlsDisabled(false);
    setIsDeletingRunning(false);

    setStr('');
  };

  const clearQueue = async () => {
    setIsControlsDisabled(true);
    setIsCleringRunning(true);

    queue.clear();
    setCircles(createCircles());

    setIsControlsDisabled(false);
    setIsCleringRunning(false);

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
          data-testid="input-for-string"
          value={str}
          extraClass={styles.input}
          isLimitText={true}
          maxLength={4}
          onChange={(event) => setStr(event.currentTarget.value)}
          disabled={
            (queue.getHead() !== null && queue.getTail() === null) ||
            isControlsDisabled
          }
        />
        <Button
          data-testid="add-button"
          text="Добавить"
          onClick={addElement}
          isLoader={isAddingRunning}
          disabled={
            str === '' ||
            (queue.getHead() !== null && queue.getTail() === null) ||
            isControlsDisabled
          }
        />
        <Button
          data-testid="delete-button"
          text="Удалить"
          onClick={deleteElement}
          isLoader={isDeletingRunning}
          disabled={queue.getLength() === 0 || isControlsDisabled}
        />
        <Button
          data-testid="clear-button"
          extraClass={styles.button_last}
          text="Очистить"
          onClick={clearQueue}
          isLoader={isClearingRunning}
          disabled={
            (queue.getLength() === 0 && queue.getHead() === null) ||
            isControlsDisabled
          }
        />
      </nav>
      <div className={styles.scheme}>
        {circles.length > 0 &&
          circles.map((element, index) => (
            <Circle
              letter={element.letter}
              key={index}
              index={element.index}
              head={index === queue.getHead() ? HEAD : ''}
              tail={index === queue.getTail() ? TAIL : ''}
              state={calculateState(index)}
            />
          ))}
      </div>
    </SolutionLayout>
  );
};
