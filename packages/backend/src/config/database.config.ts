import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  // Use SQLite for development/demo purposes to avoid needing PostgreSQL
  if (process.env.NODE_ENV === 'development' || process.env.USE_SQLITE === 'true') {
    return {
      type: 'sqlite',
      database: ':memory:', // Use in-memory database for demo
      synchronize: true, // Auto-create schema
      logging: process.env.DATABASE_LOGGING === 'true',
      keepConnectionAlive: true,
    };
  }

  // Original PostgreSQL configuration
  return {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'sbdsa',
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
    logging: process.env.DATABASE_LOGGING === 'true',
    keepConnectionAlive: true,
    // Connection pool settings
    connectionLimit: parseInt(process.env.DATABASE_CONNECTION_LIMIT, 10) || 10,
    connectionTimeout: parseInt(process.env.DATABASE_CONNECTION_TIMEOUT, 10) || 60000,
    acquireTimeout: parseInt(process.env.DATABASE_ACQUIRE_TIMEOUT, 10) || 60000,
    timeout: parseInt(process.env.DATABASE_TIMEOUT, 10) || 60000,
  };
});