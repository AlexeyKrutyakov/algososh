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
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { INITIAL_ELEMENTS } from '../../constants/initial-elements';
import { addToHead, removeFromHead } from '../../utils/manipulate-with-head';

export const ListPage: React.FC = () => {
  const [elements, setElements] = useState<CircleProps[]>([]);
  const [str, setStr] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<string>('');

  const [isAddToHeadRunner, setIsAddToHeadRunner] = useState<boolean>(false);
  const [isAddToTailRunner, setIsAddToTailRunner] = useState<boolean>(false);
  const [isRemoveFromHeadRunner, setIsRemoveFromHeadRunner] =
    useState<boolean>(false);
  const [isRemoveFromTailRunner, setIsRemoveFromTailRunner] =
    useState<boolean>(false);
  const [isAddByIndexRunner, setIsAddByIndexRunner] = useState<boolean>(false);
  const [isRemoveByIndexRunner, setIsRemoveByIndexRunner] =
    useState<boolean>(false);

  const [isAddToHeadDisabled, setIsAddToHeadDisabled] = useState<boolean>(true);
  const [isAddToTailDisabled, setIsAddToTailDisabled] = useState<boolean>(true);
  const [isRemoveFromHeadDisabled, setIsRemoveFromHeadDisabled] =
    useState<boolean>(false);
  const [isRemoveFromTailDisabled, setIsRemoveFromTailDisabled] =
    useState<boolean>(false);
  const [isAddByIndexDisabled, setIsAddByIndexDisabled] =
    useState<boolean>(true);
  const [isRemoveByIndexDisabled, setIsRemoveByIndexDisabled] =
    useState<boolean>(true);
  const [isInputValueDisabled, setIsInputValueDisabled] =
    useState<boolean>(false);
  const [isInputIndexDisabled, setIsInputIndexDisabled] =
    useState<boolean>(false);

  const disableButtons = () => {
    setIsAddToHeadDisabled(true);
    setIsAddToTailDisabled(true);
    setIsRemoveFromHeadDisabled(true);
    setIsRemoveFromTailDisabled(true);
    setIsAddByIndexDisabled(true);
    setIsRemoveByIndexDisabled(true);
  };

  const enableButtons = () => {
    setIsAddToHeadDisabled(false);
    setIsAddToTailDisabled(false);
    setIsRemoveFromHeadDisabled(false);
    setIsRemoveFromTailDisabled(false);
    setIsAddByIndexDisabled(false);
    setIsRemoveByIndexDisabled(false);
  };

  const disableInputs = () => {
    setIsInputValueDisabled(true);
    setIsInputIndexDisabled(true);
  };

  const enableInputs = () => {
    setIsInputValueDisabled(false);
    setIsInputIndexDisabled(false);
  };

  const disableControls = () => {
    disableButtons();
    disableInputs();
  };

  const enableControls = () => {
    enableButtons();
    enableInputs();
  };

  const addToHeadHandler = async () => {
    if (elements.length >= 9) return;

    setIsAddToHeadRunner(true);
    disableControls();

    let headIndex = findMarkedElementIndex(elements, HEAD);
    if (headIndex === null) return;

    elements[headIndex].head = (
      <Circle letter={str} isSmall={true} state={ElementStates.Changing} />
    );
    setElements([...elements]);

    await delay(SHORT_DELAY_IN_MS);

    const newElement = { letter: 'zero', state: ElementStates.Modified };
    elements.unshift(newElement);
    setElements([...elements]);

    headIndex++;
    await addToHead(elements, setElements, headIndex, str);

    setElementStateWithDelay(
      elements,
      setElements,
      0,
      ElementStates.Default,
      SHORT_DELAY_IN_MS
    );

    setStr('');
    enableInputs();
    setIsRemoveFromHeadDisabled(false);
    setIsRemoveFromTailDisabled(false);
    setIsAddToHeadRunner(false);
  };

  const addToTailHandler = async () => {
    if (elements.length >= 9) return;

    setIsAddToTailRunner(true);
    disableControls();

    let tailIndex = findMarkedElementIndex(elements, TAIL);
    if (tailIndex === null) return;

    elements[tailIndex].head = (
      <Circle letter={str} isSmall={true} state={ElementStates.Changing} />
    );
    setElements([...elements]);

    await delay(SHORT_DELAY_IN_MS);

    const newElement = { letter: '', state: ElementStates.Modified };
    elements.push(newElement);
    setElements([...elements]);

    await addToTail(elements, setElements, tailIndex, str);

    elements[tailIndex].head = '';
    setElements([...elements]);

    setElementStateWithDelay(
      elements,
      setElements,
      elements.length - 1,
      ElementStates.Default,
      SHORT_DELAY_IN_MS
    );

    setStr('');
    enableInputs();
    setIsRemoveFromHeadDisabled(false);
    setIsRemoveFromTailDisabled(false);
    setIsAddToTailRunner(false);
  };

  const removeFromHeadHandler = async () => {
    if (elements.length <= 2) return;

    setIsRemoveFromHeadRunner(true);
    disableControls();

    const headIndex = findMarkedElementIndex(elements, HEAD);
    if (headIndex === null) return;

    elements[headIndex].tail = (
      <Circle
        letter={elements[headIndex].letter}
        isSmall={true}
        state={ElementStates.Changing}
      />
    );
    elements[headIndex].letter = '';
    await delay(SHORT_DELAY_IN_MS);
    await removeFromHead(elements, setElements, headIndex);
    elements.shift();
    elements[0].state = ElementStates.Modified;
    setElements([...elements]);

    await setElementStateWithDelay(
      elements,
      setElements,
      0,
      ElementStates.Default,
      SHORT_DELAY_IN_MS
    );

    setStr('');
    enableInputs();
    setIsRemoveFromHeadDisabled(false);
    setIsRemoveFromTailDisabled(false);
    setIsRemoveFromHeadRunner(false);
  };

  const removeFromTailHandler = async () => {
    if (elements.length <= 2) return;

    setIsRemoveFromTailRunner(true);
    disableControls();

    const tailIndex = findMarkedElementIndex(elements, TAIL);
    if (tailIndex === null) return;

    elements[tailIndex].tail = (
      <Circle
        letter={elements[tailIndex].letter}
        isSmall={true}
        state={ElementStates.Changing}
      />
    );
    elements[tailIndex].letter = '';
    await delay(SHORT_DELAY_IN_MS);
    await removeFromTail(elements, setElements, tailIndex);
    elements.pop();
    elements[elements.length - 1].state = ElementStates.Modified;
    setElements([...elements]);

    await setElementStateWithDelay(
      elements,
      setElements,
      elements.length - 1,
      ElementStates.Default,
      SHORT_DELAY_IN_MS
    );

    setStr('');
    enableInputs();
    setIsRemoveFromHeadDisabled(false);
    setIsRemoveFromTailDisabled(false);
    setIsRemoveFromTailRunner(false);
  };

  const addByIndexHandler = async () => {
    if (elements.length >= 8) return;
    if (inputIndex === undefined) return;

    setIsAddByIndexRunner(true);
    disableControls();

    const headElement = (
      <Circle letter={str} isSmall={true} state={ElementStates.Changing} />
    );

    await addByIndex(elements, setElements, str, +inputIndex, headElement);

    enableControls();
    setStr('');
    setInputIndex('');
    setIsAddByIndexRunner(false);
  };

  const removeByIndexHandler = async () => {
    if (elements.length <= 2) return;
    if (inputIndex === undefined) return;

    setIsRemoveByIndexRunner(true);
    disableControls();

    const tailElement = (
      <Circle
        letter={elements[+inputIndex].letter}
        isSmall={true}
        state={ElementStates.Changing}
      />
    );

    await removeByIndex(elements, setElements, +inputIndex, tailElement);

    enableControls();
    setStr('');
    setInputIndex('');
    setIsRemoveByIndexRunner(false);
  };

  useEffect(() => {
    setElements([...INITIAL_ELEMENTS]);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (str === '') {
      setIsAddToHeadDisabled(true);
      setIsAddToTailDisabled(true);
    } else {
      setIsAddToHeadDisabled(false);
      setIsAddToTailDisabled(false);
    }
  }, [str]);

  useEffect(() => {
    if (
      str !== '' &&
      inputIndex !== '' &&
      +inputIndex <= elements.length - 1 &&
      +inputIndex >= 1
    ) {
      setIsAddByIndexDisabled(false);
    } else {
      setIsAddByIndexDisabled(true);
    }

    if (
      inputIndex === '' ||
      +inputIndex < 1 ||
      +inputIndex > elements.length - 2 ||
      elements.length <= 2
    ) {
      setIsRemoveByIndexDisabled(true);
    } else {
      setIsRemoveByIndexDisabled(false);
    }
  }, [str, inputIndex, elements]);

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
          disabled={isInputValueDisabled}
        />
        <Button
          extraClass={styles.button_top}
          text="Добавить в head"
          onClick={addToHeadHandler}
          isLoader={isAddToHeadRunner}
          disabled={isAddToHeadDisabled}
        />
        <Button
          extraClass={styles.button_top}
          text="Добавить в tail"
          onClick={addToTailHandler}
          isLoader={isAddToTailRunner}
          disabled={isAddToTailDisabled}
        />
        <Button
          extraClass={styles.button_top}
          text="Удалить из head"
          onClick={removeFromHeadHandler}
          isLoader={isRemoveFromHeadRunner}
          disabled={isRemoveFromHeadDisabled}
        />
        <Button
          extraClass={styles.button_top}
          text="Удалить из tail"
          onClick={removeFromTailHandler}
          isLoader={isRemoveFromTailRunner}
          disabled={isRemoveFromTailDisabled}
        />
      </nav>
      <nav className={styles.controls_index}>
        <Input
          extraClass={styles.input}
          placeholder="Введите индекс"
          type="number"
          value={inputIndex}
          onChange={event => setInputIndex(event.currentTarget.value)}
          disabled={isInputIndexDisabled}
        />
        <Button
          extraClass={styles.button_bot}
          text="Добавить по индексу"
          onClick={addByIndexHandler}
          isLoader={isAddByIndexRunner}
          disabled={isAddByIndexDisabled}
        />
        <Button
          extraClass={styles.button_bot}
          text="Удалить по индексу"
          onClick={removeByIndexHandler}
          isLoader={isRemoveByIndexRunner}
          disabled={isRemoveByIndexDisabled}
        />
      </nav>
      <div className={styles.scheme}>
        {elements.map((element, index) => {
          return (
            <article key={index} className={styles.article}>
              <Circle
                index={index}
                letter={element.letter}
                head={element.head}
                tail={element.tail}
                state={element.state}
              />
              {index !== elements.length - 1 && <ArrowIcon />}
            </article>
          );
        })}
      </div>
    </SolutionLayout>
  );
};
