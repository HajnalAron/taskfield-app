import { Router } from "express";
import createHttpError from "http-errors";
import Task from "../task/schema";
import Attachment from "./schema";

const router = Router();

router.get("/:taskId", async (req, res, next) => {
  try {
    const targetTask = Task.findByPk(req.params.taskId);
    if (!targetTask)
      next(
        createHttpError(
          404,
          "Task not found with the id of " + req.params.taskId
        )
      );
    const attachments = Attachment.findAll({
      where: { taskId: req.params.taskId }
    });
    res.send(attachments);
  } catch (error) {
    next(error);
  }
});

router.post("/:taskId", async (req, res, next) => {
  try {
    const { link } = req.body;
    const targetTask = Task.findByPk(req.params.taskId);
    if (!targetTask)
      next(
        createHttpError(
          404,
          "Task not found with the id of " + req.params.taskId
        )
      );
    await Attachment.create({ taskId: req.params.taskId, link });
  } catch (error) {
    next(error);
  }
});

router.delete("/:taskId/:attachmentId", async (req, res, next) => {
  try {
    const targetTask = Task.findByPk(req.params.taskId);
    if (!targetTask)
      next(
        createHttpError(
          404,
          "Task not found with the id of " + req.params.taskId
        )
      );
    const targetAttachment = await Attachment.findByPk(req.params.attachmentId);
    if (!targetAttachment) {
      next(
        createHttpError(
          404,
          "Attachment not found with the id of " + req.params.attachmentId
        )
      );
    } else {
      targetAttachment.destroy();
      res.send(204);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
