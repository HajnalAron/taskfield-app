import { userInstance } from "../src/services/user/schema";

declare global {
  namespace Express {
    interface Request {
      user?: userInstance & {
        tokens?: { accessToken: string; refreshToken: string };
      };
    }
  }
}

export {};
