import { expect, test, vitest } from 'vitest';
import { getRecentEightDates } from './getRecentEightDates';

test('get recent eight days. 3 days before and 4 days after including the day', () => {
  const fakeDate = new Date('Thu Jan 01 2024 18:42:44 GMT+0900 (한국 표준시)');
  vitest.useFakeTimers().setSystemTime(fakeDate);
  expect(getRecentEightDates()).toEqual([
    { date: 29, day: 'Fri' },
    { date: 30, day: 'Sat' },
    { date: 31, day: 'Sun' },
    { date: 1, day: 'Mon' },
    { date: 2, day: 'Tue' },
    { date: 3, day: 'Wed' },
    { date: 4, day: 'Thu' },
    { date: 5, day: 'Fri' },
  ]);
});
