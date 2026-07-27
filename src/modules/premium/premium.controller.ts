import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

const getPremiumContent = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

})

export const premiumController = {
    getPremiumContent
}