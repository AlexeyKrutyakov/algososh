import { SetStateAction } from 'react';
import { CircleProps } from '../components/ui/circle/circle';
import { HEAD } from '../constants/element-captions';

export const addToHead = async (
  elements: CircleProps[],
  setElements: React.Dispatch<SetStateAction<CircleProps[]>>,
  index: number,
  str: string
) => {
  elements[index].head = '';
  elements[index - 1].head = HEAD;
  elements[index - 1].letter = str;

  setElements([...elements]);
};

export const removeFromHead = async (
  elements: CircleProps[],
  setElements: React.Dispatch<SetStateAction<CircleProps[]>>,
  headIndex: number,
  tailIndex?: number
) => {
  if (headIndex === tailIndex) {
    elements[headIndex].tail = '';
  } else {
    elements[headIndex].head = '';
    elements[headIndex + 1].head = HEAD;
  }
  elements[headIndex].letter = '';

  setElements([...elements]);
};
