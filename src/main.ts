import { join, relative } from 'path';
import { flatMap, map } from 'rxjs/operators';
import { readFileObservable, saveFile } from './fs-storage';
import { transform } from './image-transform';
import { jpgFilter } from './jpg-filter';
import { readdirRecursively } from './readdir';

export function process(fromDir = '.', to = 'out') {
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
      saveFile(toPath, item.buffer);
    });
}
