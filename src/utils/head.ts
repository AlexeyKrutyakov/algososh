import { SetStateAction } from 'react';
import { CircleProps } from '../components/ui/circle/circle';

export const addToHead = async () => {};

export const removeFromHead = async (
  elements: CircleProps[],
  setElements: React.Dispatch<SetStateAction<CircleProps[]>>,
  headIndex: number | null,
  tailIndex: number | null
) => {
  if (headIndex === null || tailIndex === null) {
    return;
  }

  if (headIndex === tailIndex) {
    elements[headIndex].tail = '';
  } else {
    elements[headIndex].head = '';
    elements[headIndex + 1].head = 'head';
  }
  elements[headIndex].letter = '';

  setElements([...elements]);
};
