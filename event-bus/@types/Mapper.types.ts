export interface Mapper<T, R> {
  map: (value: T) => R;
}
