import { Socket } from "socket.io";
import User from "../src/services/user/schema";

interface SocketWithUser extends Socket {
  user?: User;
}
