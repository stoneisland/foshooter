import { Dirent, readdir } from 'fs';
import { join } from 'path';
import { bindNodeCallback, empty, Observable, of } from 'rxjs';
import { expand, filter, flatMap, map } from 'rxjs/operators';

/**
 *  @param dir true if the node represents a directory
 *  @param path the path of the node
 */
export interface Node {
  dir: boolean;
  path: string;
}

/**
 *
 * Wraps the  nodejs standard function readdir
 * @param path A path to a file. If a URL is provided, it must use the file: protocol.
 * @param options If called with withFileTypes: true the result data will be an array of Dirent.
 */
const readdirWrapper: (
  path: string,
  options?: { encoding?: string; withFileTypes?: boolean },
) => Observable<Dirent[]> = bindNodeCallback(
  (path: string, options: any, callback: (err: any, files: Dirent[]) => void) => readdir(path, options, callback),
);

/**
 * Read a node(directory) returning observable of node (dir entries)
 *
 * @param n A node starting from
 */
const readdirObservable = (n: Node): Observable<Node> => {
  if (n.dir) {
    return readdirWrapper(n.path, { withFileTypes: true }).pipe(
      flatMap(v => v),
      map(v => ({ dir: v.isDirectory(), path: join(n.path, v.name) })),
    );
  }
  return empty();
};

/**
 * Read a directory recoursively e returns an observable of path
 *
 * @param dir A directory to start from
 * @param predicate A function to filter results
 */
export const readdirRecursively = (dir: string, predicate?: (path: string) => boolean) =>
  of(dir).pipe(
    map(d => ({ path: d, dir: true } as Node)),
    expand(readdirObservable),
    filter(v => !v.dir),
    map(v => v.path),
    filter(predicate || (_ => true)),
  );
