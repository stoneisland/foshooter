import { Observable, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { basename, dirname, join, parse } from 'upath';
import { blur, resize } from './jpg-transform';

const HD = 'HD';
const sigma = 20;
const BLUR_SUFFIX = '_Blur';
const SIZES$ = of(256, 320, 512, 640, 1024, 1280, 2048, 2560);

function blurBaseName(path: string) {
  const parsed = parse(path);

  return `${parsed.name}${BLUR_SUFFIX}${parsed.ext}`;
}

export const transform = (item: { path: string; buffer: Buffer }): Observable<{ path: string; buffer: Buffer }> => {
  const dirnm = dirname(item.path);
  return blur(item.buffer, sigma).pipe(
    map(buffer =>
      of(
        { path: join(dirnm, HD, basename(item.path)), buffer: item.buffer },
        { path: join(dirnm, HD, blurBaseName(item.path)), buffer },
      ),
    ),
    flatMap(i => i),
    map(i =>
      of(
        SIZES$.pipe(
          map(size => resizeWrapper(size)(dirname(i.path))),
          map(r => r(i)),
        ),
        of(of(i))
      ),
    ),
    flatMap(i$$ => i$$),
    flatMap(i$ => i$),
    flatMap(i => i),
  );
};

const resizeWrapper = (size: number) => (dirnm: string) => (item: {
  path: string;
  buffer: Buffer;
}): Observable<{ path: string; buffer: Buffer }> =>
  resize(item.buffer, size).pipe(
    map(buffer => ({ path: join(dirname(dirnm), `${size}w`, `${size}w_${basename(item.path)}`), buffer })),
  );
