export interface Cell<T> {
  next?: T;
}

export interface LinkedList<T> extends Cell<LinkedList<T>> {
  data: T;
}

export interface DoublyLinkedList<T> extends Cell<DoublyLinkedList<T>> {
  prev?: DoublyLinkedList<T>;
  data: T;
}

export type UnitMeasurement = "px" | "%";

export type UnitConverter<T, U> = (val: T) => U;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Coordinate<T = number> = { x: T; y: T };

export type CSSPosition = {
  top: string;
  left: string;
  width: string;
  height: string;
};

export type RecordEntry<T extends Record<any, any>, U = keyof T> = {
  key: U;
  value: T[U];
};

export type RecordEntryArray<T extends Record<any, any>> = Array<
  RecordEntry<T>
>;
