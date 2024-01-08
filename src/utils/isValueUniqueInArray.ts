export const isValueUniqueInArray = <T, K extends keyof T>(
  array: T[],
  key: K,
  valueToCheck: T[K],
): boolean => !array.some((item) => item[key] === valueToCheck);
