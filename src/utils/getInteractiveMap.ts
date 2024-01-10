export const getInteractiveMap = <K, V>(map: Map<K, V>): Map<K | V, V | K> => {
  const newMap = new Map<K | V, V | K>();
  map.forEach((value, key) => {
    newMap.set(value, key);
    newMap.set(key, value);
  });
  return newMap;
};
