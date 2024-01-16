export const calcGrassPercentage = (
  time: number,
  standardTime: number = 12,
) => {
  const flooredStandard = Math.floor(standardTime / 4);
  if (time < flooredStandard) {
    return 0.25;
  }
  if (time < flooredStandard * 2) {
    return 0.5;
  }
  if (time < flooredStandard * 3) {
    return 0.75;
  }
  return 1;
};
