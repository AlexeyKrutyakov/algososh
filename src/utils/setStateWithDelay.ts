import { delay } from './delay';

export default async function setStateWithDelay<T>(
  setState: React.Dispatch<React.SetStateAction<any>>,
  ms: number,
  data: T[]
) {
  await delay(ms);
  setState([...data]);
}
