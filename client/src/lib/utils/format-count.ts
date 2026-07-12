export function formatCount(value: number) {
  return new Intl.NumberFormat().format(value);
}
