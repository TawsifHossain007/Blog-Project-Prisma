import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import httpStatus from "http-status-codes";
import { userRouter } from "./modules/user/user.route";
import { authRouter } from "./modules/auth/auth.route";
import { postRouter } from "./modules/posts/post.route";
import { commentRouter } from "./modules/comment/comment.route";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: config.appUrl,
    credentials: true,
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

export default app;
