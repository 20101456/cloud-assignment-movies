export const handler = async () => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true, service: 'movies-api', version: '0.0.1' }),
  };
};
