import { expect, test, vitest } from 'vitest';
import { calculateTimeDiff } from '@/utils/calculateTimeDiff';

test('calculate time difference between UTC type', () => {
  const fakeDate = new Date('2024-01-07T17:01:05.147Z');
  vitest.useFakeTimers().setSystemTime(fakeDate);
  expect(calculateTimeDiff('2024-01-05T17:01:05.147Z')).toBe('2일 전');
});
