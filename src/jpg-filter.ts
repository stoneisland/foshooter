import { extname } from 'path';

const JPG_EXT = '.JPG';
const JPEG_EXT = '.JPEG';

/**
 * Checks if a path represents a jpg file
 *
 * @param v A file path to check
 */
export const jpgFilter = (v: string) => {
  const extUpperCase: string = extname(v).toUpperCase();
  const isJpg: boolean = extUpperCase === JPG_EXT || extUpperCase === JPEG_EXT;
  return isJpg;
};
