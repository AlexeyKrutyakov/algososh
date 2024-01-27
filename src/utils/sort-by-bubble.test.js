import { Direction } from '../types';
import { sortByBubble } from './sort-by-bubble';

describe('Сортировка массива пузырьком', () => {
  it('Сортировка по возрастанию пустого массива', () => {
    const arr = [];
    expect(sortByBubble(arr, Direction.Ascending)).toEqual([]);
  });

  it('Сортировка по убыванию пустого массива', () => {
    const arr = [];
    expect(sortByBubble(arr, Direction.Descending)).toEqual([]);
  });

  it('Сортировка по возрастанию массива из одного элемента', () => {
    const arr = [1];
    expect(sortByBubble(arr, Direction.Ascending)).toEqual([1]);
  });

  it('Сортировка по убыванию массива из одного элемента', () => {
    const arr = [1];
    expect(sortByBubble(arr, Direction.Descending)).toEqual([1]);
  });

  it('Сортировка по возрастанию массива из нескольких элементов', () => {
    const arr = [3, 1, 4, 2];
    expect(sortByBubble(arr, Direction.Ascending)).toEqual([1, 2, 3, 4]);
  });

  it('Сортировка по убыванию массива из нескольких элементов', () => {
    const arr = [3, 1, 4, 2];
    expect(sortByBubble(arr, Direction.Descending)).toEqual([4, 3, 2, 1]);
  });

  it('Сортировка по возрастанию с парамером index массива из нескольких элементов', () => {
    const arr = [3, 1, 4, 2];
    expect(sortByBubble(arr, Direction.Ascending, 0)).toEqual([1, 3, 4, 2]);
  });

  it('Сортировка по убыванию с параметром index массива из нескольких элементов', () => {
    const arr = [3, 1, 4, 2];
    expect(sortByBubble(arr, Direction.Descending, 1)).toEqual([3, 4, 1, 2]);
  });

  it('Сортировка по убыванию с параметром index = (arr.length - 1) массива из нескольких элементов', () => {
    const arr = [3, 1, 4, 2];
    expect(sortByBubble(arr, Direction.Descending, arr.length - 1)).toEqual([
      3, 1, 4, 2,
    ]);
  });
});
