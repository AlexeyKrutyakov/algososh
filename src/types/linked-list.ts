export type TLinkedList<T> = {
  prepend: (item: T) => void;
  append: (item: T) => void;
  addByIndex: (index: number, item: T) => void;
  deleteByIndex: (index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
};
