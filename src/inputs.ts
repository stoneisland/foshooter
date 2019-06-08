import { config } from 'dotenv';
import yargs = require('yargs');

config({ path: '.env' });

const argv = yargs
  .usage('Usage: node $0 --in [in] --out [out')
  .option('in', {
    alias: 'i',
    description: 'Input Folder',
    type: 'string',
  })
  .option('out', {
    alias: 'o',
    description: 'Destination',
    type: 'string',
  }).argv;

export const from = argv.in;
export const to = argv.out;
