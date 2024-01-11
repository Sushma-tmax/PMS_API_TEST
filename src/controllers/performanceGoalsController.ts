import asyncHandler from "../middleware/asyncHandler";
import { Request, Response } from "express"
import NineBox from "../models/NineBox";
import performanceGoals from "../models/PerformanceGoal/performanceGoals";
import PerformanceDefinition from "../models/PerformanceDefinition";
import { Employee } from "../models";
import { StatusCodes } from "http-status-codes";

const getAllperformanceGoals= asyncHandler(async (req: Request, res: Response) => {
    const PerforanceGoals = await performanceGoals.find({}).sort({ createdAt: -1 })
    res.status(StatusCodes.OK).json({
        data: PerforanceGoals
    });

})

export{
    getAllperformanceGoals
}