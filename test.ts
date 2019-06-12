import { handle } from './src/main';
import { logger } from './src/logger';

handle('test', 'out');

logger.log('info',  `Env: ${process.env.accessKeyId}`);
