import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { SubscriptionService } from "./subscription.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createCheckOutSession = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const result = await SubscriptionService.createCheckOutSession(userId as string);

     sendResponse(res, {
            success : true,
            statusCode : httpStatus.OK,
            message : "Checkout completed successfully",
            data : result
        })
})

export const subscriptionController = {
    createCheckOutSession
}