import createHttpError from "http-errors";
import JWT, { JwtPayload } from "jsonwebtoken";
import User, { userInstance } from "../services/user/schema";

interface DecodedUser extends JwtPayload {
  id: string;
}

export const generateAccessToken = (payload: {
  id: number;
}): Promise<string | undefined> =>
  new Promise((resolve, reject) => {
    if (!process.env.JWT_ENCRYPTION_KEY) {
      throw new Error("Missing encryption key");
    } else
      JWT.sign(
        payload,
        process.env.JWT_ENCRYPTION_KEY,
        { expiresIn: process.env.NODE_ENV === "production" ? "15m" : "7 days" },
        (error, token) => {
          if (error) reject(error);
          else resolve(token);
        }
      );
  });

const generateRefreshToken = (
  payload: {
    id: number;
  },
  hashedPassword: string
): Promise<string | undefined> =>
  new Promise((resolve, reject) => {
    if (!process.env.JWT_ENCRYPTION_KEY) {
      throw new Error("Missing encryption key");
    } else
      JWT.sign(
        payload,
        process.env.JWT_ENCRYPTION_KEY + hashedPassword,
        { expiresIn: "7 days" },
        (error, token) => {
          if (error) reject(error);
          else resolve(token);
        }
      );
  });

export const generateTokens = async ({ id, password }: userInstance) => {
  const accessToken = await generateAccessToken({ id: id });
  const refreshToken = await generateRefreshToken({ id: id }, password);

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (
  token: string
): Promise<JwtPayload | undefined> =>
  new Promise((res, rej) => {
    if (!process.env.JWT_ENCRYPTION_KEY) {
      throw new Error("Missing encryption key");
    } else
      JWT.verify(
        token,
        process.env.JWT_ENCRYPTION_KEY,
        (error, decodedToken) => {
          if (error) rej(error);
          else res(decodedToken);
        }
      );
  });

export const verifyRefreshToken = (
  token: string,
  hashedPassword: string
): Promise<JwtPayload | undefined> =>
  new Promise((res, rej) => {
    if (!process.env.JWT_ENCRYPTION_KEY) {
      throw new Error("Missing encryption key");
    } else
      JWT.verify(
        token,
        process.env.JWT_ENCRYPTION_KEY + hashedPassword,
        (error, decodedToken) => {
          if (error) rej(error);
          else res(decodedToken);
        }
      );
  });

// export const verifyAndRegenerateTokens = async (
//   currentRefreshToken: string,
//   hashedPassword: string
// ) => {
//   const decodedRefreshToken = await verifyRefreshToken(
//     currentRefreshToken,
//     hashedPassword
//   );

//   const user = await User.findOne({ where: { id: decodedRefreshToken } });

//   if (!user) throw createHttpError(404, "User not found");

//   if (currentRefreshToken) {
//     const { accessToken, refreshToken } = await generateTokens(user);

//     return { accessToken, refreshToken };
//   } else throw createHttpError(401, "Refresh token not valid!");
// };
