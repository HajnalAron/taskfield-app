import JWT from "jsonwebtoken";

export const generateAccessToken = (payload: {
  id: number;
}): Promise<string | undefined> =>
  new Promise((resolve, reject) => {
    if (!process.env.encryptionKey) {
      throw new Error("Missing encryption key");
    } else
      JWT.sign(
        payload,
        process.env.encryptionKey,
        { expiresIn: "15m" },
        (error, token) => {
          if (error) reject(error);
          else resolve(token);
        }
      );
  });

const generateRefreshToken = (payload: {
  id: number;
}): Promise<string | undefined> =>
  new Promise((resolve, reject) => {
    if (!process.env.encryptionKey) {
      throw new Error("Missing encryption key");
    } else
      JWT.sign(
        payload,
        process.env.encryptionKey,
        { expiresIn: "7 days" },
        (error, token) => {
          if (error) reject(error);
          else resolve(token);
        }
      );
  });

// export const generateTokens = async (user: any) => {
//   const accessToken: any = await generateAccessToken({ id: user._id });
//   const refreshToken: any = await generateRefreshToken({ id: user._id });

//   return { accessToken, refreshToken };
// };

export const verifyAccesToken = (token: string) =>
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

export const verifyRefreshToken = (token: string) =>
  new Promise((res, rej) => {
    if (!process.env.JWT_ENCRYPTION_KEY) {
      throw new Error("Missing encryption key");
    }
    JWT.verify(token, process.env.JWT_ENCRYPTION_KEY, (error, decodedToken) => {
      if (error) rej(error);
      else res(decodedToken);
    });
  });

// export const verifyAndRegenerateTokens = async (refreshToken: Token) => {
//   const decodedRefreshToken: any = await verifyRefreshToken(refreshToken);

//   const user = await UserModel.findById(decodedRefreshToken._id);

//   if (!user) throw createHttpError(404, "User not found");

//   if (user.refreshToken && user.refreshToken === refreshToken) {
//     const { accessToken, refreshToken } = await generateTokens(user);

//     return { accessToken, refreshToken };
//   } else throw createHttpError(401, "Refresh token not valid!");
// };
