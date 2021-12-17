import { Server } from "socket.io";
import { createServer } from "http";
import app from "./app";
import createHttpError from "http-errors";
import { verifyAccessToken } from "./auth/jwt";
import { SocketWithUser } from "../types/socket";
import User from "./services/user/schema";

interface SocketUser {
  socketId: string;
  userId: number;
}

export const httpServer = createServer(app);

const io = new Server(httpServer, { allowEIO3: true });

let onlineUsers: SocketUser[] = [];

io.use(async (socket: SocketWithUser, next) => {
  const accessToken: string = socket.handshake.auth["Access-Token"];
  const decodedToken = await verifyAccessToken(accessToken);
  if (!decodedToken) {
    next(createHttpError(404, "Missing access token"));
  } else {
    const user = await User.findOne({ where: { id: decodedToken.id } });
    socket.user = user;
    next();
  }
});

io.on("connection", async (socket) => {
  try {
    onlineUsers.push();
    socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter((u) => u.socketId !== socket.id);
    });
  } catch (error) {}
});
