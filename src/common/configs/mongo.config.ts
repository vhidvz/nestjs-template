export function MONGO_CONFIG(): string {
  const username = process.env.MONGO_USER ?? null;
  const password = process.env.MONGO_PASS ?? null;
  const host = process.env.MONGO_HOST ?? 'localhost';
  const port = parseInt(process.env.MONGO_PORT, 10) ?? 27017;
  let database = process.env.MONGO_DB ?? 'production';

  if (process.env.NODE_ENV.startsWith('dev')) {
    database = 'develop';
  } else if (process.env.NODE_ENV.startsWith('test')) {
    database = 'testing';
  }

  let uri = null;
  if (!username && !password) {
    uri = `mongodb://${host}:${port}/${database}`;
  } else {
    uri = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;
  }

  return uri;
}
