import asyncHandler from "../middleware/asyncHandler";
import { Request, Response } from "express";
import Calender from "../models/Calender";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
import AppraisalCalender from "../models/AppraisalCalender";
import Template from "../models/Template";

let date = new Date().toISOString();
let isoDate = new Date(date);
function ISODate(end_date: any): any {

}

const createCalender = asyncHandler(async (req: Request, res: Response) => {

    const calender = await Calender.insertMany(req.body);

    res.status(StatusCodes.CREATED).json({
        success: true,
        data: calender,
    });
    const { name } = req.body

    const checkNameExists = await Calender.findOne({

        name

    });

    if (checkNameExists) {

        throw new BadRequestError('Calender Type already exists');

    }

    const { start_date } = req.body
    const { end_date } = req.body
    const checkdatesExists = await Calender.findOne({

        $gte: ISODate(start_date),
        $lt: ISODate(end_date)

    });
    console.log(start_date, 'start date')
    if (checkdatesExists) {
        throw new BadRequestError('Calender date already exists');
    }



})

const getAllCalenders = asyncHandler(async (req: Request, res: Response) => {

    const calenders = await Calender.find().sort({ createdAt: -1 });

    res.status(StatusCodes.OK).json({
        success: true,
        data: calenders,
    });
})

const getCalenderById = asyncHandler(async (req: Request, res: Response) => {

    const calender = await Calender.findById(req.params.id);

    if (!calender) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            error: "No calender found",
        });
    }

    res.status(StatusCodes.OK).json({
        success: true,
        data: calender,
    });
})

const updateCalender = asyncHandler(async (req: Request, res: Response) => {

    const calender = await Calender.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!calender) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            error: "No calender found",
        });
    }

    res.status(StatusCodes.OK).json({
        success: true,
        data: calender,
    });


})

const deleteCalender = asyncHandler(async (req: Request, res: Response) => {



    const ifExist = await AppraisalCalender.exists({calender: req.params.id})

    // if (!calender) {
    //     return res.status(StatusCodes.NOT_FOUND).json({
    //         success: false,
    //         error: "No calender found",
    //     });
    // }

    if(ifExist) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: "Calender  is Used In Appraisal."
        });
    }


    if(!ifExist) {
        const calender = await Calender.findByIdAndDelete(req.params.id);
    }


    res.status(StatusCodes.OK).json({
        success: true,
        // data: calender,
    });
})



export {
    createCalender,
    getAllCalenders,
    getCalenderById,
    updateCalender,
    deleteCalender,
}



