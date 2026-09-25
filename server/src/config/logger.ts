import winston from 'winston';

const isProduction = process.env.NODE_ENV === 'production';

// Always log to stdout: container platforms (Render, Docker, Kubernetes)
// capture stdout/stderr, and their filesystems are ephemeral, so file-only
// transports make production logs unreachable.
const transports: winston.transport[] = [
  new winston.transports.Console({
    format: isProduction
      ? winston.format.json()
      : winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
  }),
];

// Keep file transports for local development only.
if (!isProduction) {
  transports.push(
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  );
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'fynman-api' },
  transports,
});

export default logger;
