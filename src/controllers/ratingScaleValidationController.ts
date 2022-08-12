import {Request, Response} from "express";
import asyncHandler from "../middleware/asyncHandler";
import {StatusCodes} from "http-status-codes";
import {BadRequestError} from "../errors";
import RatingValidation from "../models/RatingValidation";


const addRatingScale = asyncHandler(async (req: Request, res: Response) => {
    // const result = await objectiveGroupValidation.validateAsync(req.body);
    const newObjectiveGroup = await RatingValidation.create(req.body);
    res.status(StatusCodes.CREATED).json({
        success: true,
        data: newObjectiveGroup
    });
})


export  {
    addRatingScale
}
