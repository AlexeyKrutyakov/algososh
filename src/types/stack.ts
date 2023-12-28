type TStack<T> = {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  getElements: () => T[];
  getSize: () => number;
};

export class Stack<T> implements TStack<T> {
  private elements: T[] = [];

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
    return this.elements.length;
  };
}
