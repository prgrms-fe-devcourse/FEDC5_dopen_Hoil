export const calculateDday = (dDay: string) => {
  const timeDiff =
    new Date(dDay).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0);
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
};
