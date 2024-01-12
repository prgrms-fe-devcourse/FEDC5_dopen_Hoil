import { expect, test } from 'vitest';
import { calculateTimeDiff } from '@/utils/calculateTimeDiff';

test('calculate time difference between UTC type', () => {
  expect(
    calculateTimeDiff(
      '2024-01-05T17:01:05.147Z',
      new Date('2024-01-12 00:12:02 UTC'),
    ),
  ).toBe('6일 전');
});
