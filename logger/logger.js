import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

// Log Format
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

// Create Logger
const logger = createLogger({
  level: 'info', // Default log level
  format: logFormat,
  transports: [
    new transports.Console(), // Console Logs
    new transports.DailyRotateFile({
      filename: 'logs/app-%DATE%.log', // Log File Pattern
      datePattern: 'YYYY-MM-DD',
      maxSize: '10m', // Max Log File Size
      maxFiles: '30d', // Log Retention Period
      zippedArchive: true, // Zip Old Logs
    }),
  ],
});

// Error Logger
logger.add(
  new transports.File({ filename: 'logs/error.log', level: 'error' })
);

export default logger; // Use export default for ES modules
