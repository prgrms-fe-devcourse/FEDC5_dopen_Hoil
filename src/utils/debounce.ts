export const debounce = <T extends (...args: Parameters<T>) => void>(
  func: T,
  delay: number,
) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  const debounced = (...args: Parameters<T>) => {
    // 이전에 예약된 호출이 있다면 취소
    clearTimeout(timeoutId);

    // 일정 시간이 지난 후에 함수를 호출
    timeoutId = setTimeout(() => {
      func.apply(args);
    }, delay);
  };

  // 예약된 호출을 취소하는 함수
  debounced.cancel = function () {
    clearTimeout(timeoutId);
  };

  return debounced;
};
