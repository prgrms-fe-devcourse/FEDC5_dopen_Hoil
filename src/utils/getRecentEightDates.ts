export const getRecentEightDates = () => {
  const today = new Date();

  // 이전 3일과 다음 4일 계산
  const previousDays = Array.from({ length: 3 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (i + 1));
    return {
      date: date.getDate(),
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
    };
  });

  const nextDays = Array.from({ length: 4 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + (i + 1));
    return {
      date: date.getDate(),
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
    };
  });

  return [
    ...previousDays.reverse(),
    {
      date: today.getDate(),
      day: today.toLocaleDateString('en-US', { weekday: 'short' }),
    },
    ...nextDays,
  ];
};
