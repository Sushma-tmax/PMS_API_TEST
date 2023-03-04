import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import {Employee} from "../models";



const updateEmployee = asyncHandler(async (req: Request, res: Response) => {

    const {employee_code,changes} =  req.body

    const employee = await Employee.updateMany({ _id: { $in: employee_code } },
        {
            changes
        },
        {upsert:true}
    )

})


