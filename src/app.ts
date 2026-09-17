import express from "express";
import cors from 'cors'
import userRouter from "./routes/user.routes";
import goalRouter from "./routes/goal.routes";

const app = express();

app.use(express.json())
app.use(cors())

app.use("/users", userRouter)
app.use("/goals", goalRouter)

export default app;