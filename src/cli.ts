import { config } from 'dotenv';
import yargs = require('yargs');
import { process } from './main';

config({ path: '.env' });

const argv = yargs
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

process(argv.in, argv.out);
