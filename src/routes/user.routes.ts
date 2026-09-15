import { Router } from "express";
import { createUser } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/create-user", createUser);

export default userRouter;