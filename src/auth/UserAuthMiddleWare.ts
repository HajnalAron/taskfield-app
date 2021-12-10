import createHttpError from "http-errors";
import User from "../services/user/schema.js";
import { verifyAccessToken } from "./jwt.js";
import { RequestHandler } from "express";

export const UserAuthMiddleWare: RequestHandler = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      next(createHttpError(401, "Please provide access token in cookies"));
    } else {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = await verifyAccessToken(token);
      if (decodedToken) {
        const user = await User.findOne({ where: { id: decodedToken.id } });
        if (user) {
          req.user = user;
          next();
        } else {
          next(createHttpError(404, "User not found"));
        }
      } else next(createHttpError(401, "Invalid access token"));
    }
  } catch (error) {}
};
