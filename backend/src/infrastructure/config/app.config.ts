export interface AppConfig {
  port: number;
  corsOrigin: string;
}

export const loadAppConfig = (env: NodeJS.ProcessEnv = process.env): AppConfig => ({
  port: Number(env.PORT ?? 3000),
  corsOrigin: env.CORS_ORIGIN ?? 'http://localhost:5173',
});
