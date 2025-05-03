export const configuration = () => ({
  app: {
    port: parseInt(process.env.APP_PORT ?? '3000', 10),
  },
  database: {
    url: process.env.DB_URL,
    synchronize: process.env.DB_SYNCHRONIZE ?? false,
  },
  gemini: {
    key: process.env.GEMINI_KEY,
    model: process.env.GEMINI_MODEL,
  },
});
