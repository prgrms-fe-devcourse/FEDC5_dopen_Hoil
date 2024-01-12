import { expect, test } from 'vitest';
import { stringTimeToSeconds } from './stringTimeToSeconds';

test('string type time HH:MM:SS convert to number type seconds like 10000."', () => {
  expect(stringTimeToSeconds('02:46:40')).toEqual(10000);
});
