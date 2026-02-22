export type UnionFromAsConst<T> = T extends object ? T[keyof T] : never;
