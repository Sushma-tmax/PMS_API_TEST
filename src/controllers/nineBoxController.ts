import asyncHandler from "../middleware/asyncHandler";
import {Request, Response} from "express"
import NineBox from "../models/NineBox";
import {StatusCodes} from "http-status-codes";

const createNineBox = asyncHandler(async (req: Request, res: Response) => {

    const nineBox = await NineBox.create(req.body);
    res.status(StatusCodes.CREATED).json({
        success: true,
        data:nineBox
    });

})

const updateNineBox = asyncHandler(async (req: Request, res: Response) => {
    const nineBox = await NineBox.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(StatusCodes.OK).json({
        success: true,
        nineBox
    });
})

const getAllNineBox = asyncHandler(async (req: Request, res: Response) => {
    const nineBox = await NineBox.find({}).sort({createdAt: -1})
    res.status(StatusCodes.OK).json({
        data: nineBox
    });

})
export {
    createNineBox,
    updateNineBox,
    getAllNineBox
}
