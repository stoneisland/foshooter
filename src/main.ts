import { flatMap, map } from 'rxjs/operators';
import { join, relative } from 'upath';
import { readFileObservable, saveFile } from './fs-storage';
import { transform } from './image-transform';
import { jpgFilter } from './jpg-filter';
import { logger } from './logger';
import { readdirRecursively } from './readdir';

export function process(fromDir: string, to: string) {
  readdirRecursively(fromDir, jpgFilter)
    .pipe(
      map((path: string) =>
        readFileObservable(path).pipe(
          map(buffer => ({ path, buffer })),
          map(transform),

          flatMap(item => item),
        ),
      ),
      flatMap(item => item),
    )
    .subscribe(item => {
      const toPath = join(to, relative(fromDir, item.path));
      logger.info("Saving to: " + toPath);
      saveFile(toPath, item.buffer);
    });
}
