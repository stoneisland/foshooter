import { readFile, writeFile } from 'fs';
import * as mkdirp from 'mkdirp';
import { bindNodeCallback } from 'rxjs';
import { dirname } from 'upath';

export const saveFile = (path: string, buffer: Buffer) => {
  const dir = dirname(path);
  mkdirp(dir, () => {
    writeFile(path, buffer, err => {
      if (err) {
        throw err;
      }
    });
  });
};

export const readFileObservable = bindNodeCallback(readFile);
