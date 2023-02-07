export type NonNullableValues<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};
