import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { subscriptionController } from "./subscription.controller";

const router = Router();

router.post("/checkout", auth(Role.USER, Role.ADMIN, Role.AUTHOR), subscriptionController.createCheckOutSession)
router.post("/webhook", subscriptionController.handleWebhook)
router.get("/status", 
    auth(Role.USER, Role.AUTHOR, Role.ADMIN),
    subscriptionController.getSubscriptionStatus)

export const SubscriptionRouter = router;