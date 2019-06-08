import { jpgFilter } from '../jpg-filter';
test('Accepted jpg file names', () => {
  expect(jpgFilter('bar.jpg')).toBe(true);
});
