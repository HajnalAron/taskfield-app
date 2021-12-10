import { Router } from "express";
import createHttpError from "http-errors";
import { generateTokens } from "../../auth/jwt";
import User from "../user/schema";

const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const newUserData = req.body;
    const newUser = await User.create({ ...newUserData });
    if (newUser) {
      res.status(201).send();
    } else next(createHttpError(400, "error"));
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      next(createHttpError(404, "User not found"));
    } else {
      const isValid = await user.checkValidity(password);
      if (!isValid)
        next(createHttpError(400, "Please provide valid user credentials"));
      const tokens = await generateTokens(user);
      res.send(tokens);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
