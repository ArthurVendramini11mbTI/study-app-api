import { Router } from "express";
import { createGoal } from "../controllers/goal.controller";
import { Auth } from '../middlewares/auth.middleware'

const goalRouter = Router();

goalRouter.post("/create-goal", createGoal);

export default goalRouter;