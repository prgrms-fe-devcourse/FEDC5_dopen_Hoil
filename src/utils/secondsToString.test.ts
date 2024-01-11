import { expect, test } from 'vitest';
import { secondsToStringTime } from './secondsToStringTime';

test('number type seconds Convert to string time HH:MM:SS."', () => {
  expect(secondsToStringTime(10000)).toEqual('02:46:40');
});
