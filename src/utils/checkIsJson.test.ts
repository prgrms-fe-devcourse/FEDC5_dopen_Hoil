import { expect, test } from 'vitest';
import { checkIsJson } from './checkIsJson';

test('check is this json', () => {
  expect(checkIsJson('제목입니다')).toBe(false);
  expect(
    checkIsJson(
      JSON.stringify({ title: '제목', content: { a: 1, b: 2, c: 3 } }),
    ),
  ).toBe(true);
});
