import { Router } from "express";
import createHttpError from "http-errors";
import Task from "../task/schema";
import User from "../user/schema";
import Comment from "./schema";

const router = Router();

router.get("/:taskId", async (req, res, next) => {
  try {
    const targetTask = await Task.findByPk(req.params.taskId);
    if (targetTask) {
      const comments = await Comment.findAll({
        where: {
          taskId: req.params.taskId
        },
        include: { model: User }
      });
      if (comments) {
        res.send(comments);
      } else {
        next(createHttpError(404, "No comments for this task"));
      }
    } else {
      next(
        createHttpError(
          404,
          "Task not found with the id of " + req.params.taskId
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

router.post("/:taskId", async (req, res, next) => {
  try {
    await Comment.create({
      ...req.body,
      taskId: req.params.taskId
    });
    res.status(201).send();
  } catch (error) {
    next(error);
  }
});

router.put("/:taskId/:CommentId", async (req, res, next) => {
  try {
    const { text, color } = req.body;
    const targetTask = await Task.findByPk(req.params.taskId);
    if (targetTask && (text || color)) {
      const targetComment = await Comment.findByPk(req.params.CommentId);
      if (targetComment) {
        await targetComment.update(req.body);
        res.send(targetComment);
      } else {
        {
          next(
            createHttpError(
              404,
              "Comment not found with the id of " + req.params.CommentId
            )
          );
        }
      }
    } else {
      next(
        createHttpError(
          400,
          "Please provide a valid task id and a valid request body"
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:taskId/:commentId", async (req, res, next) => {
  try {
    const targetTask = await Task.findByPk(req.params.taskId);
    if (targetTask) {
      const targetComment = await Comment.findByPk(req.params.commentId);
      if (targetComment) {
        await targetComment.destroy();
        res.status(204).send();
      } else {
        next(
          createHttpError(
            404,
            "Comment not found with the id of " + req.params.commentId
          )
        );
      }
    } else {
      next(
        createHttpError(
          400,
          "Task not found with the id of " + req.params.taskId
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

export default router;
