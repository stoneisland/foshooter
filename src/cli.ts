import * as yargs from 'yargs';
import { handle } from './main';

// Default from environment?

export const argv = yargs
  .usage('Usage: node $0 [in] [out]')
  .option('in', {
    alias: 'i',
    description: 'Input Folder',
    type: 'string',
  })
  .option('out', {
    alias: 'o',
    description: 'Destination',
    type: 'string'
  })
  .demandOption(['in', 'out'])
  .argv;

handle(argv.in, argv.out);
