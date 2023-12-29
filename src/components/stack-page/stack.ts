import { TStack } from '../../types';

export class Stack<T> implements TStack<T> {
  private elements: T[] = [];
  private size: number = 0;

  constructor(size: number) {
    this.size = size;
  }

  push = (item: T): void => {
    this.elements.push(item);
  };

  pop = (): void => {
    this.elements.pop();
  };

  clear = (): void => {
    this.elements = [];
  };

  getElements = (): T[] => {
    return this.elements;
  };

  getSize = (): number => {
    return this.size;
  };

  getLength = (): number => {
    return this.elements.length;
  };
}
