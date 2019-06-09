import { config } from 'dotenv';
import yargs = require('yargs');
import { process } from './main';

config({ path: '.env' });

const argv = yargs
  .usage('Usage: node $0 [in] [out]')
  .option('in', {
    alias: 'i',
    description: 'Input Folder',
    type: 'string',
    default: '.'
  })
  .option('out', {
    alias: 'o',
    description: 'Destination',
    type: 'string',
    default: 'out'
  }).argv;

process(argv.in, argv.out);
