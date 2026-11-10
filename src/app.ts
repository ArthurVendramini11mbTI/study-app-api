import express from "express";
import cors from 'cors'
import userRouter from "./routes/user.routes";
import goalRouter from "./routes/goal.routes";
import { errorMiddleware } from './middlewares/error.middleware'

const app = express();

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))

app.use("/users", userRouter)
app.use("/goals", goalRouter)

app.use(errorMiddleware)

export default app;
