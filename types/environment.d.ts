declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "testing";
      PRODUCTION_DATABASE_CONNECTION_STRING: string;
      DEV_DATABASE_CONNECTION_STRING: string;
      TEST_DATABASE_CONNECTION_STRING: string;
      JWT_ENCRYPTION_KEY: string;
    }
  }
}

export {};
