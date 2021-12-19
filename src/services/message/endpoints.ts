import { Router } from "express";
import createHttpError from "http-errors";
import User from "../user/schema";
import Message from "./schema";

const router = Router();

router.get("/:workspaceId", async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      where: {
        workspaceId: req.params.workspaceId
      },
      include: { model: User }
    });
    if (messages) {
      res.send(messages);
    } else {
      next(
        createHttpError(
          404,
          "No messages found for workspace with the id of" +
            req.params.workspaceId
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

export default router;
