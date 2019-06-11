import { flatMap, map } from 'rxjs/operators';
import { join, relative } from 'upath';
import { argv } from './cli';
import { readFileObservable, saveFile } from './fs-storage';
import { transform } from './image-transform';
import { jpgFilter } from './jpg-filter';
import { logger } from './logger';
import { readdirRecursively } from './readdir';

function process(fromDir: string, to: string) {
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

export function run(){

  process(argv.in, argv.out);
}
