export function REDIS_CONFIG(): string {
  const password = process.env.REDIS_PASS ?? null;
  const host = process.env.REDIS_HOST ?? 'localhost';
  const port = parseInt(process.env.REDIS_PORT, 10) ?? 6379;

  let uri = null;
  if (!password) {
    uri = `redis://${host}:${port}`;
  } else {
    uri = `redis://:${password}@${host}:${port}`;
  }

  return uri;
}
