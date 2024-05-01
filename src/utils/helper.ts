export const roundedNumber = (num: number, decimal: number) => {
  return Math.floor(num * (10 ** decimal)) / (10 ** decimal);
}
