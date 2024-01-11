export const stringTimeToSeconds = (time: string) => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return seconds + minutes * 60 + hours * 3600;
};
