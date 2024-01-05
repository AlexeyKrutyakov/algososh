export type TQueue<T> = {
  enqueue: (item: T) => void;
  dequeue: () => void;
  getElements: () => T[];
  getSize: () => number;
};
