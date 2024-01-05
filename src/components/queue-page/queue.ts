import { TQueue } from '../../types';

export class Queue<T> implements TQueue<T> {
  private elements: T[] = [];
  private head: number | null = null;
  private tail: number | null = null;
  private size: number = 0;

  constructor(size: number) {
    this.size = size;
  }

  enqueue = (item: T): void => {
    if (this.head === null || this.tail === null) {
      this.elements[0] = item;
      this.head = 0;
      this.tail = 0;
    } else {
      if ((this.head || this.tail) === this.getSize() - 1) {
        return;
      } else {
        this.elements.push(item);
        this.tail++;
      }
    }
  };

  dequeue = (): void => {
    if (this.head === null || this.tail === null) return;

    if (this.head === this.tail) {
      this.tail = null;
    } else {
      this.head++;
    }
    this.elements.shift();
  };

  clear = (): void => {
    this.elements = [];
    this.head = null;
    this.tail = null;
  };

  getHead = (): number | null => {
    return this.head;
  };

  getTail = (): number | null => {
    return this.tail;
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
