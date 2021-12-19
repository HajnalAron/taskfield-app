import { Router } from "express";
import createHttpError from "http-errors";
import { UserAuthMiddleWare } from "../../auth/UserAuthMiddleWare";
import TaskUser from "../../db/relation_tables/TaskUser";
import Category from "../category/schema";
import User from "../user/schema";
import Workspace from "../workspace/schema";
import Task, { taskInstance } from "./schema";

const router = Router();

router.get("/my", UserAuthMiddleWare, async (req, res, next) => {
  try {
    const userTasks = await TaskUser.findAll({
      where: { userId: req.user!.id }
    });
    if (userTasks) {
      const tasksData: taskInstance[] = [];
      await Promise.all(
        userTasks.map(async (task) => {
          const taskData = await Task.findByPk(task.id, {
            include: { model: Category }
          });
          if (taskData) {
            tasksData.push(taskData);
          }
        })
      );
      res.send(tasksData);
    } else next(createHttpError(404, "No tasks found for this user"));
  } catch (error) {
    next(error);
  }
});

router.get("/workspace/:workspaceId", async (req, res, next) => {
  try {
    const targetWorkspace = await Workspace.findByPk(req.params.workspaceId);
    if (targetWorkspace) {
      const tasks = await Task.findAll({
        where: { workspaceId: req.params.workspaceId },
        include: { model: Category }
      });
      if (tasks) {
        res.send(tasks);
      } else
        next(
          createHttpError(
            404,
            "No tasks found for workspace with the id of" +
              req.params.workspaceId
          )
        );
    } else {
      next(
        createHttpError(
          404,
          "Workspace not found with the id of " + req.params.workspaceId
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:taskId", async (req, res, next) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.taskId },
      include: { model: Category }
    });
    if (task) {
      res.send(task);
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

router.post("/user/:taskId/:userId", async (req, res, next) => {
  try {
    const targetUser = await User.findByPk(req.params.userId);
    const targetTask = await Task.findByPk(req.params.taskId);
    if (targetUser && targetTask) {
      await TaskUser.create({
        userId: req.params.userId,
        taskId: req.params.taskId
      });
      res.status(204).send();
    } else {
      next(createHttpError(404, "Please provide valid task and user ids"));
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/user/:taskId/:userId", async (req, res, next) => {
  try {
    const targetUser = await User.findByPk(req.params.userId);
    const targetTask = await Task.findByPk(req.params.taskId);
    if (targetUser && targetTask) {
      await TaskUser.destroy({
        where: {
          userId: req.params.userId,
          taskId: req.params.taskId
        }
      });
      res.status(204).send();
    } else {
      next(createHttpError(404, "Please provide valid task and user ids"));
    }
  } catch (error) {
    next(error);
  }
});

router.post("/:workspaceId", async (req, res, next) => {
  try {
    const targetWorkspace = await Workspace.findByPk(req.params.workspaceId);
    if (targetWorkspace) {
      await Task.create({
        ...req.body,
        workspaceId: req.params.workspaceId
      });
      res.status(201).send();
    } else {
      next(
        createHttpError(
          404,
          "Workspace not found with the id of " + req.params.workspaceId
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:taskId", async (req, res, next) => {
  try {
    const targetTask = await Task.findByPk(req.params.taskId);
    if (!targetTask) {
      next(
        createHttpError(
          404,
          "Task not found with the id of " + req.params.taskId
        )
      );
    } else {
      targetTask.update(req.body);
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:taskId", async (req, res, next) => {
  try {
    const targetTask = await Task.findByPk(req.params.taskId);
    if (!targetTask) {
      next(
        createHttpError(
          404,
          "Task not found with the id of " + req.params.taskId
        )
      );
    } else {
      await targetTask.destroy();
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
