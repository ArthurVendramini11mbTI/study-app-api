import { Router } from "express";
import { createGoal, getGoals, updateGoal, deleteGoal } from "../controllers/goal.controller";
import { Auth } from '../middlewares/auth.middleware'

const goalRouter = Router();

goalRouter.post("/create-goal", Auth.private, createGoal);
goalRouter.get("/get-goals", Auth.private, getGoals);
goalRouter.put("/update-goal/:goalId", Auth.private, updateGoal);
goalRouter.delete("/delete-goal/:goalId", Auth.private, deleteGoal);

export default goalRouter;
