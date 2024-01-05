import styles from './list-page.module.css';
import React, { useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle, CircleProps } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { ElementStates } from '../../types/element-states';
import { HEAD, TAIL } from '../../constants/element-captions';
import { delay } from '../../utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { LinkedList } from './linked-list';

const linkedList = new LinkedList<string>();
const linkedListMaxSize = 9;
const linkedListMinSize = 1;
const initialCircleMark = {
  letter: '',
  state: ElementStates.Changing,
  isSmall: true,
};

export const ListPage: React.FC = () => {
  const [str, setStr] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<string>('');
  const [circles, setCircles] = useState<CircleProps[]>([]);
  const [mark, setMark] = useState<CircleProps>(initialCircleMark);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [activeCircleIndex, setActiveCircleIndex] = useState<number | null>(
    null
  );
  const [activeCircleState, setActiveCircleState] = useState<ElementStates>(
    ElementStates.Default
  );

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isAddToHeadRunner, setIsAddToHeadRunner] = useState<boolean>(false);
  const [isAddToTailRunner, setIsAddToTailRunner] = useState<boolean>(false);
  const [isRemoveFromHeadRunner, setIsRemoveFromHeadRunner] =
    useState<boolean>(false);
  const [isRemoveFromTailRunner, setIsRemoveFromTailRunner] =
    useState<boolean>(false);
  const [isAddByIndexRunner, setIsAddByIndexRunner] = useState<boolean>(false);
  const [isRemoveByIndexRunner, setIsRemoveByIndexRunner] =
    useState<boolean>(false);

  const createCircles = (initialList?: CircleProps[]): CircleProps[] => {
    if (initialList) return initialList;

    const circles: CircleProps[] = [];
    let current = linkedList.getHead();

    while (current) {
      const newCircle = {
        letter: current.value,
        state: ElementStates.Default,
      };
      circles.push(newCircle);
      current = current.next;
    }

    return circles;
  };

  const createCircleMark = (): JSX.Element => {
    return (
      <Circle letter={mark.letter} isSmall={mark.isSmall} state={mark.state} />
    );
  };

  const animateAdding = async (index: number): Promise<void> => {
    mark.letter = str;
    setMark(mark);
    setIsAdding(true);
    setActiveCircleIndex(index);
    await delay(SHORT_DELAY_IN_MS);
    setIsAdding(false);
    setMark(initialCircleMark);
  };

  const animateRemoving = async (index: number): Promise<void> => {
    mark.letter = circles[index].letter;
    setMark(mark);
    circles[index].letter = '';
    setCircles([...circles]);
    setIsRemoving(true);
    setActiveCircleIndex(index);
    await delay(SHORT_DELAY_IN_MS);
    setIsRemoving(false);
    setMark(initialCircleMark);
  };

  const animateGoToIndex = async (index: number): Promise<void> => {
    for (let i = 0; i < index; i++) {
      circles[i].state = ElementStates.Changing;
      setCircles([...circles]);
      await delay(SHORT_DELAY_IN_MS);
    }
  };

  const animateModifiedCircle = async (): Promise<void> => {
    setActiveCircleState(ElementStates.Modified);
    await delay(SHORT_DELAY_IN_MS);
    setActiveCircleState(ElementStates.Default);
  };

  const clearInputs = (): void => {
    setStr('');
    setInputIndex('');
  };

  const addToHeadHandler = async () => {
    if (linkedList.getSize() >= linkedListMaxSize) return;

    // disable contlols, run loader
    setIsDisabled(true);
    setIsAddToHeadRunner(true);

    await animateAdding(0);

    // add to list
    linkedList.prepend(str);
    setCircles(createCircles());

    // animate modified circle
    setActiveCircleIndex(0);
    await animateModifiedCircle();
    setActiveCircleIndex(null);

    clearInputs();

    // enable contlols, stop loader
    setIsDisabled(false);
    setIsAddToHeadRunner(false);
  };

  const addToTailHandler = async () => {
    if (linkedList.getSize() >= linkedListMaxSize) return;

    // disable contlols, run loader
    setIsDisabled(true);
    setIsAddToTailRunner(true);

    await animateAdding(linkedList.getSize() - 1);

    // add to list
    linkedList.append(str);
    setCircles(createCircles());

    // animate modified circle
    setActiveCircleIndex(linkedList.getSize() - 1);
    await animateModifiedCircle();
    setActiveCircleIndex(null);

    clearInputs();

    // enable contlols, stop loader
    setIsDisabled(false);
    setIsAddToTailRunner(false);
  };

  const removeFromHeadHandler = async () => {
    if (linkedList.getSize() <= linkedListMinSize) return;

    // disable contlols, run loader
    setIsDisabled(true);
    setIsRemoveFromHeadRunner(true);

    await animateRemoving(0);

    // delete from list
    linkedList.deleteHead();
    setCircles(createCircles());

    clearInputs();

    // enable contlols, stop loader
    setIsDisabled(false);
    setIsRemoveFromHeadRunner(false);
  };

  const removeFromTailHandler = async () => {
    if (linkedList.getSize() <= linkedListMinSize) return;

    // disable contlols, run loader
    setIsDisabled(true);
    setIsRemoveFromTailRunner(true);

    await animateRemoving(linkedList.getSize() - 1);

    // delete from list
    linkedList.deleteTail();
    setCircles(createCircles());

    clearInputs();

    // enable contlols, stop loader
    setIsDisabled(false);
    setIsRemoveFromTailRunner(false);
  };

  const addByIndexHandler = async () => {
    if (linkedList.getSize() >= linkedListMaxSize) return;

    // disable contlols, run loader
    setIsDisabled(true);
    setIsAddByIndexRunner(true);

    await animateGoToIndex(+inputIndex);

    await animateAdding(+inputIndex);

    // add to list
    linkedList.addByIndex(+inputIndex, str);
    setCircles(createCircles());

    // animate modified circle
    await animateModifiedCircle();
    setActiveCircleIndex(null);

    clearInputs();

    // enable contlols, stop loader
    setIsDisabled(false);
    setIsAddByIndexRunner(false);
  };

  const removeByIndexHandler = async () => {
    if (linkedList.getSize() <= linkedListMinSize) return;

    // disable contlols, run loader
    setIsDisabled(true);
    setIsRemoveByIndexRunner(true);

    await animateGoToIndex(+inputIndex);

    await animateRemoving(+inputIndex);

    // add to list
    linkedList.deleteByIndex(+inputIndex);
    setCircles(createCircles());

    clearInputs();

    // enable contlols, stop loader
    setIsDisabled(false);
    setIsRemoveByIndexRunner(false);
  };

  useEffect(() => {
    linkedList.append('0');
    linkedList.append('34');
    linkedList.append('8');
    linkedList.append('1');

    setCircles(createCircles());

    // eslint-disable-next-line
  }, []);

  return (
    <SolutionLayout title="Связный список">
      <nav className={styles.controls_value}>
        <Input
          extraClass={styles.input}
          placeholder="Введите значение"
          type="text"
          isLimitText={true}
          maxLength={4}
          value={str}
          onChange={event => setStr(event.currentTarget.value)}
          disabled={isDisabled}
        />
        <Button
          extraClass={styles.button_top}
          text="Добавить в head"
          onClick={addToHeadHandler}
          isLoader={isAddToHeadRunner}
          disabled={isDisabled || str === ''}
        />
        <Button
          extraClass={styles.button_top}
          text="Добавить в tail"
          onClick={addToTailHandler}
          isLoader={isAddToTailRunner}
          disabled={isDisabled || str === ''}
        />
        <Button
          extraClass={styles.button_top}
          text="Удалить из head"
          onClick={removeFromHeadHandler}
          isLoader={isRemoveFromHeadRunner}
          disabled={isDisabled || linkedList.getSize() <= linkedListMinSize}
        />
        <Button
          extraClass={styles.button_top}
          text="Удалить из tail"
          onClick={removeFromTailHandler}
          isLoader={isRemoveFromTailRunner}
          disabled={isDisabled || linkedList.getSize() <= linkedListMinSize}
        />
      </nav>
      <nav className={styles.controls_index}>
        <Input
          extraClass={styles.input}
          placeholder="Введите индекс"
          type="number"
          value={inputIndex}
          onChange={event => setInputIndex(event.currentTarget.value)}
          disabled={isDisabled}
        />
        <Button
          extraClass={styles.button_bot}
          text="Добавить по индексу"
          onClick={addByIndexHandler}
          isLoader={isAddByIndexRunner}
          disabled={
            isDisabled ||
            str === '' ||
            inputIndex === '' ||
            +inputIndex <= 0 ||
            +inputIndex > linkedList.getSize() - 1
          }
        />
        <Button
          extraClass={styles.button_bot}
          text="Удалить по индексу"
          onClick={removeByIndexHandler}
          isLoader={isRemoveByIndexRunner}
          disabled={
            isDisabled ||
            inputIndex === '' ||
            +inputIndex <= 0 ||
            +inputIndex >= linkedList.getSize() - 1
          }
        />
      </nav>
      <div className={styles.scheme}>
        {linkedList.getSize() > 0 &&
          circles.map((element, index) => {
            return (
              <article key={index} className={styles.article}>
                <Circle
                  index={index}
                  letter={element.letter}
                  head={
                    isAdding && index === activeCircleIndex
                      ? createCircleMark()
                      : index === 0
                      ? HEAD
                      : ''
                  }
                  tail={
                    isRemoving && index === activeCircleIndex
                      ? createCircleMark()
                      : index === linkedList.getSize() - 1
                      ? TAIL
                      : ''
                  }
                  state={
                    index === activeCircleIndex
                      ? activeCircleState
                      : element.state
                  }
                />
                {index !== circles.length - 1 && <ArrowIcon />}
              </article>
            );
          })}
      </div>
    </SolutionLayout>
  );
};
