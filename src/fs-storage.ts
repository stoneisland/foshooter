import { readFile, writeFile } from 'fs';
import * as mkdirp from 'mkdirp';
import { dirname } from 'path';
import { bindNodeCallback } from 'rxjs';

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
