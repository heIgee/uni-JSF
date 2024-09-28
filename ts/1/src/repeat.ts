export function repeat<T>(value: T, n: number = 3): T[] {
  return Array(n).fill(value);
}
