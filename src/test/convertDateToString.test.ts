import { expect, test } from 'vitest';
import { convertDateToString } from '@/utils/convertDateToString';

test('Converts a date type to an object with date and time properties."', () => {
  expect(convertDateToString(new Date('2022-01-04T04:32:00'))).toEqual({
    date: '2022-1-4',
    time: '오전 4:32:00',
  });
});
