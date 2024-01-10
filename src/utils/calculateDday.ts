export const calculateDday = (dDay: string) => {
  const timeDiff = Date.parse(dDay) - Date.now();
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
};
