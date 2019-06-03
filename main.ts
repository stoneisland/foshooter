import * as yargs from 'yargs';
import { transform } from './jpg-transform';
import { readdirRecursively } from './readdir';
import { jpgFilter } from './jpg-filter';
import { map, flatMap } from 'rxjs/operators';
import { join, relative, dirname, basename } from 'path';
import { writeFile } from 'fs';
import * as mkdirp from 'mkdirp';

//TODO complete
const argv = yargs
  .usage('Usage: node $0 --in [in] --out [out')
  .option('in', {
    alias: 'i',
    description: 'Folder to process',
    type: 'string'
  }
  )
  .option('out', {
    alias: 'o',
    description: 'Destination',
    type: 'string'
  }
  )
  .demandOption(['out'])
  .argv;

const from = argv.in || '.';
const to = argv.out || '.'

function publish(fromDir: string, toDir: string) {

  readdirRecursively(fromDir, jpgFilter).pipe(map(v => transform(v)), flatMap(v => v))
    .subscribe(
      v => {
        console.log(v.path);
        //Handle errors
        const dir = join(toDir, relative(fromDir, dirname(v.path)));
        mkdirp(dir, () => {
          //TODO Handle error
          writeFile(join(toDir, basename(v.path)), v.buffer, function () { });
        });
      }
    );
} 

publish(from, to);