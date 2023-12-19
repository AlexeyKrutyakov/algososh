import { SetStateAction } from 'react';
import { CircleProps } from '../components/ui/circle/circle';

export const addToTail = async (
  str: string,
  elements: CircleProps[],
  setElements: React.Dispatch<SetStateAction<CircleProps[]>>,
  tailIndex: number | null
) => {
  if (tailIndex === elements.length - 1) return;

  if (tailIndex === null) {
    elements[0].letter = str;
    elements[0].head = 'head';
    elements[0].tail = 'tail';
    setElements([...elements]);
  } else {
    elements[tailIndex].tail = '';
    elements[tailIndex + 1].letter = str;
    elements[tailIndex + 1].tail = 'tail';
    setElements([...elements]);
  }
};

export const removeFromTail = async () => {};
