import getRandomValueFromRange from './getRandomValueFromRange';

export default function createRandomArr(
  minLength: number,
  maxLength: number,
  minNumber: number,
  maxNumber: number
): number[] {
  const result = [];
  const arrLength = getRandomValueFromRange(minLength, maxLength);

  for (let i = 0; i < arrLength; i++) {
    const number = getRandomValueFromRange(minNumber, maxNumber);
    result.push(number);
  }

  return result;
}
