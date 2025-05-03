export interface AppConfig {
  app: {
    port: number;
  };
  database: {
    url: string;
    synchronize: boolean;
  };
  gemini: {
    key: string;
    model: string;
  };
}
