import type { ConnectionOptions } from 'bullmq';

// REDIS_URL is preferred (managed hosts such as Render only expose a URL).
// Fall back to discrete host/port/password for local development.
const redisUrl = process.env.REDIS_URL;
const parsedUrl = redisUrl ? new URL(redisUrl) : undefined;

const redisHost = parsedUrl
  ? parsedUrl.hostname
  : process.env.REDIS_HOST || '127.0.0.1';
const redisPort = parsedUrl
  ? Number(parsedUrl.port || 6379)
  : Number(process.env.REDIS_PORT || 6379);
const redisPassword =
  (parsedUrl && decodeURIComponent(parsedUrl.password)) ||
  process.env.REDIS_PASSWORD ||
  undefined;
const redisDb = process.env.REDIS_DB ? Number(process.env.REDIS_DB) : undefined;

if (Number.isNaN(redisPort)) {
  throw new Error('REDIS_PORT must be a valid number');
}

if (redisDb !== undefined && Number.isNaN(redisDb)) {
  throw new Error('REDIS_DB must be a valid number when provided');
}

export const bullmqConnection: ConnectionOptions = {
  host: redisHost,
  port: redisPort,
  ...(redisPassword ? { password: redisPassword } : {}),
  ...(redisDb !== undefined ? { db: redisDb } : {}),
};
