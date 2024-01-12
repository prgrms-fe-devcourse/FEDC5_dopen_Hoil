export const secondsToStringTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600).toString();
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString();
  const seconds = (totalSeconds % 60).toString();
  return `${hours.padStart(2, '0')}:${minutes.padStart(
    2,
    '0',
  )}:${seconds.padStart(2, '0')}`;
};
