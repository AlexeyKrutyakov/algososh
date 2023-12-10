import { CircleProps } from '../components/ui/circle/circle';
import { ElementStates } from '../types/element-states';

const delay = (ms: number) => {
  return new Promise(res => setTimeout(res, ms));
};

const setStateWithDelay = async (
  setState: React.Dispatch<React.SetStateAction<any>>,
  ms: number,
  data: CircleProps[]
) => {
  await delay(ms);
  setState([...data]);
};

export default async function turnOverCircles(
  str: string,
  setCircles: React.Dispatch<React.SetStateAction<CircleProps[]>>
) {
  const symbols = Array.from(str);
  const circles: CircleProps[] = [];

  symbols.map((symbol, index) =>
    circles.push({
      letter: symbol,
      index,
      state: ElementStates.Default,
    })
  );

  const len = circles.length;
  const midIndex = Math.floor(len / 2);

  await setStateWithDelay(setCircles, 1000, circles);

  circles[0].state = ElementStates.Changing;
  circles[len - 1].state = ElementStates.Changing;

  await setStateWithDelay(setCircles, 1000, circles);

  for (let i = 0; i < midIndex; i++) {
    const temp = circles[i];
    circles[i] = circles[len - 1 - i];
    circles[len - 1 - i] = temp;

    circles[i].state = ElementStates.Modified;
    circles[len - 1 - i].state = ElementStates.Modified;

    if (i < midIndex - 1) {
      circles[i + 1].state = ElementStates.Changing;
      circles[len - 2 - i].state = ElementStates.Changing;
    }

    await setStateWithDelay(setCircles, 1000, circles);
  }
  if (circles.length % 2 !== 0) {
    circles[midIndex].state = ElementStates.Modified;

    await setStateWithDelay(setCircles, 1000, circles);
  }
}
