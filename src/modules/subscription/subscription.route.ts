import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { subscriptionController } from "./subscription.controller";

const router = Router();

router.post("/checkout", auth(Role.USER, Role.ADMIN, Role.AUTHOR), subscriptionController.createCheckOutSession)

export const SubscriptionRouter = router;