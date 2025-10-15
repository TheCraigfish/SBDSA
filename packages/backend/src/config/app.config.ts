import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'sbdsa-secret-key',
  jwtExpirationTime: process.env.JWT_EXPIRATION_TIME || '24h',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'sbdsa-refresh-secret-key',
  jwtRefreshExpirationTime: process.env.JWT_REFRESH_EXPIRATION_TIME || '7d',
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS, 10) || 10,
  apiPrefix: process.env.API_PREFIX || 'api',
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  enableSwagger: process.env.ENABLE_SWAGGER !== 'false',
  enableRateLimiting: process.env.ENABLE_RATE_LIMITING !== 'false',
}));