import { createLogger, format, transports} from 'winston';

export const logger = createLogger({
  format: format.simple(),
  // You can also comment out the line above and uncomment the line below for JSON format
  // format: format.json(),
  level: 'debug',
  transports: [new transports.Console()]
})
