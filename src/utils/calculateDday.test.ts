import { expect, test, vitest } from 'vitest';
import { calculateDday } from './calculateDday';

test('calculate d-day by YYYY.MM.DD', () => {
  const fakeDate = new Date('2024-01-10');
  vitest.useFakeTimers().setSystemTime(fakeDate);
  expect(calculateDday('2024.01.18')).toBe(8);
  expect(calculateDday('2024.01.11')).toBe(1);
});
