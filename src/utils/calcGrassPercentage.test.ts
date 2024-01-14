import { expect, test } from 'vitest';
import { calcGrassPercentage } from './calcGrassPercentage';

test('calculate grass percentage from time', () => {
  expect(calcGrassPercentage(4)).toBe(0.5);
  expect(calcGrassPercentage(4, 20)).toBe(0.25);
});
