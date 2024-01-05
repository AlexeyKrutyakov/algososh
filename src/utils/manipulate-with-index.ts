import { ReactElement, SetStateAction } from 'react';
import { CircleProps } from '../components/ui/circle/circle';
import { delay } from './delay';
import { SHORT_DELAY_IN_MS } from '../constants/delays';
import { ElementStates } from '../types/element-states';
import { HEAD } from '../constants/element-captions';

export const addByIndex = async (
  elements: CircleProps[],
  setElements: React.Dispatch<SetStateAction<CircleProps[]>>,
  str: string,
  index: number,
  headElement: ReactElement
) => {
  for (let i = 0; i <= index; i++) {
    elements[i].head = headElement;
    if (i > 0) {
      elements[i - 1].state = ElementStates.Changing;
    }
    if (i === 1) {
      elements[i - 1].head = HEAD;
    }
    if (i > 1) {
      elements[i - 1].head = '';
    }
    setElements([...elements]);
    await delay(SHORT_DELAY_IN_MS);
  }
  const newElement: CircleProps = {
    letter: str,
    state: ElementStates.Modified,
  };
  elements[index].head = '';
  for (let i = 0; i < index; i++) {
    elements[i].state = ElementStates.Default;
  }
  elements.splice(index, 0, newElement);
  setElements([...elements]);

  await delay(SHORT_DELAY_IN_MS);
  elements[index].state = ElementStates.Default;
  setElements([...elements]);
};

export const removeByIndex = async (
  elements: CircleProps[],
  setElements: React.Dispatch<SetStateAction<CircleProps[]>>,
  index: number,
  tailElement: ReactElement
) => {
  for (let i = 0; i <= index; i++) {
    elements[i].state = ElementStates.Changing;
    setElements([...elements]);
    await delay(SHORT_DELAY_IN_MS);
  }

  elements[index].state = ElementStates.Default;
  elements[index].letter = '';
  elements[index].tail = tailElement;
  setElements([...elements]);
  await delay(SHORT_DELAY_IN_MS);

  for (let i = 0; i < index; i++) {
    elements[i].state = ElementStates.Default;
  }

  elements.splice(index, 1);
  setElements([...elements]);
};
