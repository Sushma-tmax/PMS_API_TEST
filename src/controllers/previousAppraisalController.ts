import {Request, Response} from "express";
import asyncHandler from "../middleware/asyncHandler";
import Calender from "../models/Calender";
import {Employee} from "../models";
import mongoose from "mongoose";
import PreviousAppraisal from "../models/PreviousAppraisal";
import {StatusCodes} from "http-status-codes";


const addEmployeestoPrevioisAppraisal = asyncHandler(async (req: Request, res: Response) => {

    const {id} = req.body

    const getEmployeesinAppraisal = await Employee.find({first_name:  "Kokab Hussain"})

    // const  previousAppraisal = await PreviousAppraisal.insertMany({getEmployeesinAppraisal})

    res.status(StatusCodes.CREATED).json({
        success: true,
        getEmployeesinAppraisal,
        // previousAppraisal
    })

})


export {addEmployeestoPrevioisAppraisal}