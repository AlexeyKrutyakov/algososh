import { SetStateAction } from 'react';
import { CircleProps } from '../components/ui/circle/circle';
import { delay } from './delay';
import { ElementStates } from '../types/element-states';

export const setElementStateWithDelay = async (
  elements: CircleProps[],
  setElements: React.Dispatch<SetStateAction<CircleProps[]>>,
  index: number,
  state: ElementStates,
  ms: number
): Promise<void> => {
  await delay(ms);
  elements[index].state = state;
  setElements([...elements]);
};
