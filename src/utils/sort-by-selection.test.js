import { Direction } from '../types';
import { sortBySelection } from './sort-by-selection';

describe('Сортировка массива выбором', () => {
  it('Сортировка по возрастанию пустого массива', () => {
    const arr = [];
    expect(sortBySelection(arr, Direction.Ascending)).toEqual([]);
  });

  it('Сортировка по убыванию пустого массива', () => {
    const arr = [];
    expect(sortBySelection(arr, Direction.Descending)).toEqual([]);
  });

  it('Сортировка по возрастанию массива из одного элемента', () => {
    const arr = [1];
    expect(sortBySelection(arr, Direction.Ascending)).toEqual([1]);
  });

  it('Сортировка по убыванию массива из одного элемента', () => {
    const arr = [1];
    expect(sortBySelection(arr, Direction.Descending)).toEqual([1]);
  });

  it('Сортировка по возрастанию массива из нескольких элементов', () => {
    const arr = [3, 1, 4, 2];
    expect(sortBySelection(arr, Direction.Ascending)).toEqual([1, 2, 3, 4]);
  });

  it('Сортировка по убыванию массива из нескольких элементов', () => {
    const arr = [3, 1, 4, 2];
    expect(sortBySelection(arr, Direction.Descending)).toEqual([4, 3, 2, 1]);
  });

  it('Сортировка по возрастанию с парамером index массива из нескольких элементов', () => {
    const arr = [3, 1, 4, 2];
    expect(sortBySelection(arr, Direction.Ascending, 0)).toEqual([1, 3, 4, 2]);
  });

  it('Сортировка по убыванию с параметром index массива из нескольких элементов', () => {
    const arr = [3, 1, 4, 2];
    expect(sortBySelection(arr, Direction.Descending, 1)).toEqual([3, 4, 1, 2]);
  });

  it('Сортировка по убыванию с параметром index = (arr.length - 1) массива из нескольких элементов', () => {
    const arr = [3, 1, 4, 2];
    expect(sortBySelection(arr, Direction.Descending, arr.length - 1)).toEqual([
      3, 1, 4, 2,
    ]);
  });
});
