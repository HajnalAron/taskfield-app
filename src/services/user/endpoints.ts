import { Router } from "express";
import createHttpError from "http-errors";
import { UserAuthMiddleWare } from "../../auth/UserAuthMiddleWare";
import User from "./schema";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    if (!req.query.email) res.send(await User.findAll());
    res.send(await User.findAll({ where: { email: req.query.email } }));
  } catch (error) {
    next(error);
  }
});

router.get("/me", UserAuthMiddleWare, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {}
});

router.get("/:userId", async (req, res, next) => {
  try {
    const user = User.findByPk(req.params.userId);
    if (!user)
      next(
        createHttpError(
          404,
          "User not found with the id of " + req.params.userId
        )
      );
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.put("/me", async (req, res, next) => {
  try {
    if (req.user) {
      const user = User.findByPk(req.user.toJSON());
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:userId", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default router;
