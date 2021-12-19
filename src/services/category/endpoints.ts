import { Router } from "express";
import createHttpError from "http-errors";
import Task from "../task/schema";
import Category from "./schema";

const router = Router();

router.get("/:taskId", async (req, res, next) => {
  try {
    const targetTask = await Task.findByPk(req.params.taskId);
    if (targetTask) {
      const categories = await Category.findAll({
        where: {
          taskId: req.params.taskId
        }
      });
      if (categories) {
        res.send(categories);
      } else {
        next(createHttpError(404, "No categories for this task"));
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
    const targetTask = await Task.findByPk(req.params.taskId);
    if (targetTask) {
      await Category.create({ ...req.body, taskId: req.params.taskId });
      res.send(201);
    } else
      next(
        createHttpError(
          404,
          "Task not found with the id of " + req.params.taskId
        )
      );
  } catch (error) {
    next(error);
  }
});

router.put("/:taskId/:categoryId", async (req, res, next) => {
  try {
    const { text, color } = req.body;
    const targetTask = await Task.findByPk(req.params.taskId);
    if (targetTask && (text || color)) {
      const targetCategory = await Category.findByPk(req.params.categoryId);
      if (targetCategory) {
        targetCategory.update(req.body);
        res.send(targetCategory);
      } else {
        {
          next(
            createHttpError(
              404,
              "Category not found with the id of " + req.params.categoryId
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

router.delete("/:taskId/:categoryId", async (req, res, next) => {
  try {
    const targetTask = await Task.findByPk(req.params.taskId);
    if (targetTask) {
      const targetCategory = await Category.findByPk(req.params.categoryId);
      if (targetCategory) {
        targetCategory.destroy;
        res.status(204).send();
      } else {
        next(
          createHttpError(
            404,
            "Category not found with the id of " + req.params.categoryId
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
