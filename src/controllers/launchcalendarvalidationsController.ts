import asyncHandler from "../middleware/asyncHandler";
import {Request, Response} from "express";
import launchcalendarvalidations from "../models/launchcalendarvalidations";
import {StatusCodes} from "http-status-codes";

const validations = asyncHandler(async (req: Request, res: Response) => {
    //console.log(req,"backend")
   

    let changedvalidations : any
     changedvalidations = await launchcalendarvalidations.find()
    res.status(StatusCodes.OK).json({
        data: changedvalidations
    });

    console.log(changedvalidations,"changedvalidations")
})
const updateValidations = asyncHandler(async (req: Request, res: Response) => {
   
    //const { id } = req.params
    const { confirmEmployeeMaster } = req.body
    console.log(confirmEmployeeMaster,"confirmEmployeeMaster1")
    // const employee = await launchcalendarvalidations.findOneAndUpdate({
    //     $set: {
    //         confirmEmployeeMaster: id,
    //     }
    // }
    // )
    const employeeVal = await launchcalendarvalidations.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        $set: {
            confirmEmployeeMaster: confirmEmployeeMaster,
        }
    });
    res.status(StatusCodes.OK).json({
        //data:employee
        data:employeeVal
    });
})
export {validations,updateValidations}