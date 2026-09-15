import { Router } from "express";
import { createUser, login } from "../controllers/user.controller";
import { Auth } from '../middlewares/auth.middleware'

const userRouter = Router();

userRouter.post("/create-user", createUser);
userRouter.post("/login", login)

export default userRouter;