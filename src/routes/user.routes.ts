import { Router } from "express";
import { createUser, getSession, login, logout } from "../controllers/user.controller";
import { Auth } from '../middlewares/auth.middleware'
const userRouter = Router();

userRouter.post("/create-user", createUser);
userRouter.post("/login", login)
userRouter.get("/session", Auth.private, getSession)
userRouter.post("/logout", logout)

export default userRouter;
