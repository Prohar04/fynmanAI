import redis from 'redis';

// REDIS_URL is preferred (managed hosts such as Render only expose a URL).
// Fall back to discrete host/port/password for local development.
const redisUrl = process.env.REDIS_URL;

export const redisClient = redisUrl
  ? redis.createClient({ url: redisUrl })
  : redis.createClient({
      username: 'default',
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    });
