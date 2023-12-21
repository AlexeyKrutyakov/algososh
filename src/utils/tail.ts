import { SetStateAction } from 'react';
import { CircleProps } from '../components/ui/circle/circle';
import { TAIL } from '../constants/element-captions';

export const addToTail = async (
  str: string,
  elements: CircleProps[],
  setElements: React.Dispatch<SetStateAction<CircleProps[]>>,
  index: number | null,
  headMarker?: string
) => {
  if (index === null) {
    elements[0].letter = str;
    elements[0].head = headMarker;
    elements[0].tail = TAIL;
    setElements([...elements]);
  } else {
    elements[index].tail = '';
    elements[index + 1].letter = str;
    elements[index + 1].tail = TAIL;
    setElements([...elements]);
  }
};

export const removeFromTail = async (
  elements: CircleProps[],
  setElements: React.Dispatch<SetStateAction<CircleProps[]>>,
  index: number
) => {
  elements[index].letter = '';
  elements[index].tail = '';
  elements[index - 1].tail = TAIL;
  setElements([...elements]);
};
