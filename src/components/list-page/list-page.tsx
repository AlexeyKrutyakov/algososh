import styles from './list-page.module.css';
import React, { useEffect, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle, CircleProps } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { ElementStates } from '../../types/element-states';
import { HEAD, TAIL } from '../../constants/element-captions';
import {
  addByIndex,
  addToTail,
  delay,
  findMarkedElementIndex,
  removeByIndex,
  removeFromTail,
  setElementStateWithDelay,
} from '../../utils';
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../constants/delays';
import { addToHead, removeFromHead } from '../../utils/manipulate-with-head';
import { LinkedList } from './linked-list';
import { JsxElement } from 'typescript';
import { ADD_TO_HEAD } from '../../constants/animations';

const linkedList = new LinkedList<string>();
const linkedListLimitSize = 9;

export const ListPage: React.FC = () => {
  // const [elements, setElements] = useState<CircleProps[]>([]);
  const [str, setStr] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<string>('');
  const [circles, setCircles] = useState<CircleProps[]>([]);
  const [headMark, setHeadMark] = useState<CircleProps | null>(null);
  const [tailMark, setTailMark] = useState<CircleProps | null>(null);
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

  // const [isAddToHeadDisabled, setIsAddToHeadDisabled] = useState<boolean>(true);
  // const [isAddToTailDisabled, setIsAddToTailDisabled] = useState<boolean>(true);
  // const [isRemoveFromHeadDisabled, setIsRemoveFromHeadDisabled] =
  //   useState<boolean>(false);
  // const [isRemoveFromTailDisabled, setIsRemoveFromTailDisabled] =
  //   useState<boolean>(false);
  // const [isAddByIndexDisabled, setIsAddByIndexDisabled] =
  //   useState<boolean>(true);
  // const [isRemoveByIndexDisabled, setIsRemoveByIndexDisabled] =
  //   useState<boolean>(true);
  // const [isInputValueDisabled, setIsInputValueDisabled] =
  //   useState<boolean>(false);
  // const [isInputIndexDisabled, setIsInputIndexDisabled] =
  //   useState<boolean>(false);

  // const disableButtons = () => {
  //   setIsAddToHeadDisabled(true);
  //   setIsAddToTailDisabled(true);
  //   setIsRemoveFromHeadDisabled(true);
  //   setIsRemoveFromTailDisabled(true);
  //   setIsAddByIndexDisabled(true);
  //   setIsRemoveByIndexDisabled(true);
  // };

  // const enableButtons = () => {
  //   setIsAddToHeadDisabled(false);
  //   setIsAddToTailDisabled(false);
  //   setIsRemoveFromHeadDisabled(false);
  //   setIsRemoveFromTailDisabled(false);
  //   setIsAddByIndexDisabled(false);
  //   setIsRemoveByIndexDisabled(false);
  // };

  // const disableInputs = () => {
  //   setIsInputValueDisabled(true);
  //   setIsInputIndexDisabled(true);
  // };

  // const enableInputs = () => {
  //   setIsInputValueDisabled(false);
  //   setIsInputIndexDisabled(false);
  // };

  // const disableControls = () => {
  //   disableButtons();
  //   disableInputs();
  // };

  // const enableControls = () => {
  //   enableButtons();
  //   enableInputs();
  // };

  const circleMark: CircleProps = {
    letter: '',
    state: ElementStates.Changing,
  };

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

  const createHeadCircleMark = (): JSX.Element | null => {
    if (!headMark) return null;
    return (
      <Circle
        letter={headMark?.letter}
        isSmall={true}
        state={headMark?.state}
      />
    );
  };

  const createTailCircleMark = (): JSX.Element | null => {
    if (!tailMark) return null;
    return (
      <Circle
        letter={tailMark?.letter}
        isSmall={true}
        state={tailMark?.state}
      />
    );
  };

  const animateModifiedCircle = async (): Promise<void> => {
    setActiveCircleState(ElementStates.Modified);
    await delay(SHORT_DELAY_IN_MS);
    setActiveCircleState(ElementStates.Default);
    setActiveCircleIndex(null);
  };

  const animateAddingAsHeadMark = async (): Promise<void> => {
    setHeadMark(circleMark);
    await delay(SHORT_DELAY_IN_MS);
    circleMark.letter = '';
    setHeadMark(null);
  };

  const animateDeletingAsTailMark = async (): Promise<void> => {
    setTailMark(circleMark);
    await delay(SHORT_DELAY_IN_MS);
    circleMark.letter = '';
    setTailMark(null);
  };

  const addToHeadHandler = async () => {
    if (linkedList.getSize() >= linkedListLimitSize) return;

    setIsDisabled(true);
    setIsAddToHeadRunner(true);

    setActiveCircleIndex(0);
    circleMark.letter = str;
    await animateAddingAsHeadMark();

    linkedList.prepend(str);
    setCircles(createCircles());

    await animateModifiedCircle();

    setIsDisabled(false);
    setIsAddToHeadRunner(false);
    setStr('');
  };

  const addToTailHandler = async () => {
    if (linkedList.getSize() >= linkedListLimitSize) return;

    setIsDisabled(true);
    setIsAddToTailRunner(true);

    setActiveCircleIndex(linkedList.getSize() - 1);
    circleMark.letter = str;
    await animateAddingAsHeadMark();

    linkedList.append(str);
    setCircles(createCircles());

    setActiveCircleIndex(linkedList.getSize() - 1);
    await animateModifiedCircle();

    setIsDisabled(false);
    setIsAddToTailRunner(false);
    setStr('');
  };

  const removeFromHeadHandler = async () => {
    // if (linkedList.getLength() <= 2) return;

    linkedList.deleteHead();
    setCircles(createCircles());
  };

  const removeFromTailHandler = async () => {
    if (linkedList.getSize() <= 2) return;

    setIsDisabled(true);
    setIsRemoveFromTailRunner(true);

    circleMark.letter = circles[circles.length - 1].letter;
    circles[circles.length - 1].letter = '';
    setCircles([...circles]);
    setActiveCircleIndex(linkedList.getSize() - 1);
    await animateDeletingAsTailMark();

    linkedList.deleteTail();
    setCircles(createCircles());

    setIsDisabled(false);
    setIsRemoveFromTailRunner(false);
  };

  const addByIndexHandler = async () => {
    linkedList.addByIndex(+inputIndex, str);
    setCircles(createCircles());
    // if (elements.length >= 8) return;
    // if (inputIndex === undefined) return;
    // setIsAddByIndexRunner(true);
    // disableControls();
    // const headElement = (
    //   <Circle letter={str} isSmall={true} state={ElementStates.Changing} />
    // );
    // await addByIndex(elements, setElements, str, +inputIndex, headElement);
    // enableControls();
    // setStr('');
    // setInputIndex('');
    // setIsAddByIndexRunner(false);
  };

  const removeByIndexHandler = async () => {
    // if (linkedList.getLength() <= 2) return;

    linkedList.deleteByIndex(+inputIndex);
    setCircles(createCircles());
    // if (elements.length <= 2) return;
    // if (inputIndex === undefined) return;
    // setIsRemoveByIndexRunner(true);
    // disableControls();
    // const tailElement = (
    //   <Circle
    //     letter={elements[+inputIndex].letter}
    //     isSmall={true}
    //     state={ElementStates.Changing}
    //   />
    // );
    // await removeByIndex(elements, setElements, +inputIndex, tailElement);
    // enableControls();
    // setStr('');
    // setInputIndex('');
    // setIsRemoveByIndexRunner(false);
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
          disabled={isDisabled}
        />
        <Button
          extraClass={styles.button_top}
          text="Добавить в tail"
          onClick={addToTailHandler}
          isLoader={isAddToTailRunner}
          disabled={isDisabled}
        />
        <Button
          extraClass={styles.button_top}
          text="Удалить из head"
          onClick={removeFromHeadHandler}
          isLoader={isRemoveFromHeadRunner}
          disabled={isDisabled}
        />
        <Button
          extraClass={styles.button_top}
          text="Удалить из tail"
          onClick={removeFromTailHandler}
          isLoader={isRemoveFromTailRunner}
          disabled={isDisabled}
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
          disabled={isDisabled}
        />
        <Button
          extraClass={styles.button_bot}
          text="Удалить по индексу"
          onClick={removeByIndexHandler}
          isLoader={isRemoveByIndexRunner}
          disabled={isDisabled}
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
                    headMark && index === activeCircleIndex
                      ? createHeadCircleMark()
                      : index === 0
                      ? HEAD
                      : ''
                  }
                  tail={
                    tailMark && index === activeCircleIndex
                      ? createTailCircleMark()
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
