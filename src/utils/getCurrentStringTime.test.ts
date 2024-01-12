import { expect, test, vitest } from 'vitest';
import { getCurrentStringTime } from './getCurrentStringTime';

test('date object convert to string type time like HH:MM:SS."', () => {
  const fakeDate = new Date('Thu Jan 11 2024 18:42:44 GMT+0900 (한국 표준시)');
  vitest.useFakeTimers().setSystemTime(fakeDate);
  expect(getCurrentStringTime()).toEqual('18:42:44');
});
