import { Request, Response, Router } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import httpStatus from "http-status-codes";
import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/client";

const router = Router();

router.post("/register", userController.registerUser)
router.get("/me", auth(Role.ADMIN, Role.USER, Role.AUTHOR), userController.getMyProfile)
router.put("/my-profile", auth(Role.ADMIN, Role.USER, Role.AUTHOR), userController.updateMyProfile)

export const userRouter = router;