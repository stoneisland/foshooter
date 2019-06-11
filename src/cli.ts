import { config } from 'dotenv';
import * as yargs from 'yargs';

config({ path: '.env' });

// Default from environment?

export const argv = yargs
  .usage('Usage: node $0 [in] [out]')
  .option('in', {
    alias: 'i',
    default: '.',
    description: 'Input Folder',
    type: 'string',
  })
  .option('out', {
    alias: 'o',
    default: 'out',
    description: 'Destination',
    type: 'string',
  }).argv;
