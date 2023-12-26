export type TStack<T> = {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  getElements: () => T[] | [];
  getSize: () => number;
};
