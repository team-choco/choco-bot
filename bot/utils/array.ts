export function chunk<T>(list: T[], size: number): T[][] {
  return [...Array(Math.ceil(list.length / size))].map((_,i) => list.slice(i * size, i * size + size));
}
