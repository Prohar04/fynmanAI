import { Router } from 'express';
import { getSystemHealth } from '#src/services/health.service.ts';
import { sendApiSuccess } from '#src/utils/api-response.ts';
import logger from '#src/config/logger.ts';

const router = Router();

// Hard ceiling so the endpoint always answers. Express 4 does not catch
// rejections from async handlers, so without this a stalled dependency
// check leaves the request hanging with no response at all.
const HEALTH_TIMEOUT_MS = 8_000;

router.get('/', async (_req, res) => {
  try {
    const health = await Promise.race([
      getSystemHealth(),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error('System health check timed out')),
          HEALTH_TIMEOUT_MS
        )
      ),
    ]);

    const statusCode =
      health.status === 'ok' ? 200 : health.status === 'degraded' ? 207 : 503;

    return sendApiSuccess(res, {
      status: statusCode,
      data: health,
    });
  } catch (error) {
    logger.error('Health check failed to complete', {
      error: error instanceof Error ? error.message : String(error),
    });

    return res.status(503).json({
      success: false,
      status: 503,
      data: {
        status: 'down',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        error: error instanceof Error ? error.message : String(error),
      },
    });
  }
});

export default router;
