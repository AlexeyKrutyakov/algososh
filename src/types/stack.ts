export type TStack<T> = {
  push: (item: T) => void;
  pop: () => void;
  getElements: () => T[] | [];
  getSize: () => number;
};
