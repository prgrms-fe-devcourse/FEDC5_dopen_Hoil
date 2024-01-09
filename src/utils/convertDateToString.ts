/**
 *
 *
 * @param hour12
 * true(default)로 설정 시 오전/오후 표시 ex)오전 12:36:14
 * false로 설정 시 오전/오후 표시 X ex)12시 36분 14초
 *
 */
export const convertDateToString = (date: Date, hour12: boolean = true) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const time = date.toLocaleTimeString('ko-KR', { hour12 });
  return {
    date: `${year}-${month}-${day}`,
    time,
  };
};
