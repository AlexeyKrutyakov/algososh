import { CircleProps } from '../components/ui/circle/circle';

export const findMarkedElementIndex = (
  elements: CircleProps[],
  mark: string
) => {
  let markedElementIndex: number | null = null;

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].head === mark || elements[i].tail === mark) {
      markedElementIndex = i;
    }
  }
  return markedElementIndex;
};
