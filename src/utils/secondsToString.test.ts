import { expect, test } from 'vitest';
import { secondsToStringTime } from './secondsToStringTime';

test('Converts a date type to an object with date and time properties."', () => {
  expect(secondsToStringTime(10000)).toEqual('02:46:40');
});
