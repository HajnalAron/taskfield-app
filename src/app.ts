import express from "express";
import cors from "cors";
import authRouter from "./services/auth/endpoints";
import usersRouter from "./services/user/endpoints";
import organizationsRouter from "./services/organization/endpoints";
import commentsRouter from "./services/comment/endpoints";
import categoriesRouter from "./services/category/endpoints";
import workspacesRouter from "./services/workspace/endpoints";
import attachmentsRouter from "./services/attachment/endpoints";
import tasksRouter from "./services/task/endpoints";
import sequelizeInstance from "./db/connection";
import tables from "./db/relations";
import messagesRouter from "./services/message/endpoints";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/attachments", attachmentsRouter);
app.use("/categories", categoriesRouter);
app.use("/comments", commentsRouter);
app.use("/organizations", organizationsRouter);
app.use("/messages", messagesRouter);
app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);
app.use("/workspaces", workspacesRouter);

console.log(tables);

app.on("close", async () => {
  await sequelizeInstance.close();
});

export default app;
