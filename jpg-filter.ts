import { extname } from 'path';

const JPG_EXT = '.JPG';
const JPEG_EXT = '.JPEG';

/**
 * Checks if a path represents a jpg file
 * 
 * @param v A file path to check 
 */
export const jpgFilter = ((v: string) => {
  const ext_upper_case: string = extname(v).toUpperCase();
  const isJpg: boolean = ext_upper_case === JPG_EXT || ext_upper_case === JPEG_EXT;
  return isJpg;
}
);