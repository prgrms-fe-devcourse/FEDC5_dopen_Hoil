export const convertDateToString = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();
  const time = date.toLocaleTimeString('ko-KR', { hour12: true });
  return {
    date: `${year}-${month}-${day}`,
    time,
  };
};
