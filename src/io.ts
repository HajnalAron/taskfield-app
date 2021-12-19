import { Server } from "socket.io";
import { createServer } from "http";
import app from "./app";
import createHttpError from "http-errors";
import { verifyAccessToken } from "./auth/jwt";
import { SocketWithUser } from "../types/socket";
import User from "./services/user/schema";
import Workspace from "./services/workspace/schema";
import Message from "./services/message/schema";

interface SocketMessage {
  text: string;
  workspaceId: number;
}
interface SocketUser {
  socketId: string;
  userId: number;
  rooms?: number[];
}

export const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: [process.env.FRONTEND_URL]
  },
  allowEIO3: true
});

let onlineUsers: SocketUser[] = [];

io.use(async (socket: SocketWithUser, next) => {
  let accessToken: string = socket.handshake.auth["Access-Token"];
  accessToken = accessToken.split(" ")[1];
  const decodedToken = await verifyAccessToken(accessToken);

  if (!decodedToken) {
    next(createHttpError(404, "Missing access token"));
  } else {
    const user = await User.findOne({ where: { id: decodedToken.id } });
    socket.user = user?.toJSON();
    next();
  }
});

io.on("connection", async (socket: SocketWithUser) => {
  try {
    onlineUsers.push({
      socketId: socket.id,
      userId: socket.user.id,
      rooms: []
    });

    socket.on("join-workspace", (workspaceId: number) => {
      const targetOnlineUserIndex = onlineUsers.findIndex(
        (user) => user.socketId === socket.id
      );
      onlineUsers[targetOnlineUserIndex].rooms?.push(workspaceId);
      socket.join(workspaceId.toString());
    });

    socket.on("leave-workspace", (workspaceId: number) => {
      const targetOnlineUserIndex = onlineUsers.findIndex(
        (user) => user.socketId === socket.id
      );
      onlineUsers[targetOnlineUserIndex].rooms?.filter((r) => r != workspaceId);
      socket.leave(workspaceId.toString());
    });

    socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter((u) => u.socketId !== socket.id);
    });

    socket.on("outgoing-message", async (message: SocketMessage) => {
      try {
        console.log(message);
        const targetWorkspace = await Workspace.findByPk(message.workspaceId);
        if (targetWorkspace && message.text.length > 0) {
          await Message.create({ ...message, userId: socket.user.id });
          io.to(message.workspaceId.toString()).emit("incoming-message");
        }
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
});
