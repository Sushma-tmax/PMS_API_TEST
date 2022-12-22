import asyncHandler from "../middleware/asyncHandler";
import {Request, Response} from "express";
import Color from "../models/DashboardColor";
import {StatusCodes} from "http-status-codes";

const changeColor = asyncHandler(async (req: Request, res: Response) => {

    const changedColor = await Color.find()
    res.status(StatusCodes.OK).json({"message": changedColor});


})

export {changeColor}