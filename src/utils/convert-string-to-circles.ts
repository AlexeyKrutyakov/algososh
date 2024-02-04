import { CircleProps } from '../components/ui/circle/circle';

export const convertStringToCircles = (str: string): CircleProps[] => {
  const circles: CircleProps[] = [];
  for (let i = 0; i < str.length; i++) {
    circles.push({
      letter: str[i],
    });
  }
  return circles;
};
