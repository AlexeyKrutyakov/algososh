import { TLinkedList } from '../../types/linked-list';
import { LinkedListNode } from './linked-list-node';

export class LinkedList<T> implements TLinkedList<T> {
  private head: LinkedListNode<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  prepend = (item: T): void => {
    const node = new LinkedListNode(item);

    node.next = this.getHead();
    this.head = node;
    this.size++;
  };

  append = (item: T): void => {
    const node = new LinkedListNode(item);
    let current: LinkedListNode<T> | null;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }

    this.size++;
  };

  addByIndex = (index: number, item: T): void => {
    if (index < 0 || index > this.size) {
      throw Error('index is out of range');
    } else {
      let node: LinkedListNode<T> | null = new LinkedListNode<T>(item);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;

        while (currIndex !== index - 1) {
          if (curr) curr = curr.next;
          currIndex++;
        }

        if (curr) {
          node.next = curr.next;
          curr.next = node;
        }
      }
      this.size++;
    }
  };

  deleteByIndex = (index: number): void => {
    if (index < 0 || index > this.size - 1) {
      throw Error('index is out of range');
    } else {
      let curr = this.head;
      let prev = this.head;
      let currIndex = 0;

      while (currIndex !== index) {
        if (curr) {
          prev = curr;
          curr = curr.next;
        }
        currIndex++;
      }

      if (curr && prev) {
        prev.next = curr.next;
      }
      this.size--;
    }
  };

  deleteHead = (): void => {
    if (this.head === null) return;
    this.head = this.head.next;
    this.size--;
  };

  deleteTail = (): void => {
    let current: LinkedListNode<T> | null = this.head;
    if (current === null) return;

    while (current.next && current.next.next) {
      current = current.next;
    }

    current.next = null;
    this.size--;
  };

  getHead = (): LinkedListNode<T> | null => {
    return this.head;
  };

  getSize = (): number => {
    return this.size;
  };

  toArray = (): T[] => {
    const arr = [];
    let curr = this.head;

    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr;
  };
}
