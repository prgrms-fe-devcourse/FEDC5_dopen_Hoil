import { expect, test } from 'vitest';
import { calculateTimeDiff } from '@/utils/calculateTimeDiff';

test('calculate time difference between UTC type', () => {
<<<<<<< HEAD:src/test/calculateTimeDiff.test.ts
  expect(
    calculateTimeDiff(
      '2024-01-05T17:01:05.147Z',
      new Date('2024-01-12 00:12:02 UTC'),
    ),
  ).toBe('6일 전');
=======
  expect(calculateTimeDiff('2024-01-05T17:01:05.147Z')).toBe('5일 전');
>>>>>>> c365f3e (:poop: 많은 변경사항 발생...본문을 봐주세요):src/utils/calculateTimeDiff.test.ts
});
