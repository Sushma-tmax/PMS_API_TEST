import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { Employee } from "../models";
import { StatusCodes } from "http-status-codes";


const updateEmployee = asyncHandler(async (req: Request, res: Response) => {

    const { data } = req.body

    const {employee_code} = data


    const employee = await Employee.updateMany({ _id: { $in: employee_code } },
        {
            data
        },
        { upsert: true }
    )

})




const updateEmployees = asyncHandler(async (req: Request, res: Response) => {


    const { data } = req.body
    console.log(data, "data")

    const employee = await Employee.bulkWrite([
        data.map((employee: any) => {
            return ({
                updateOne: {
                    filter: { employee_code: employee.Ecode },
                    update: {
                        $set: {
                            employee_code: employee.Ecode,
                            legal_full_name: employee["Employee Name"],

                            // position_code: employee.position_code,
                            // grade: employee.grade,
                            // appraiser_name: employee.appraiser_name,
                            // reviewer_name: employee.reviewer_name,
                            // normalizer_name: employee.normalizer_name,
                            // section: employee.section,
                            // sub_section: employee.sub_section,
                            // date_of_joining: employee.date_of_joining,
                            // division: employee.division,
                            // manager_code: employee.manager_code,
                            // manager_position: employee.manager_position,
                            // work_location: employee.work_location
                        }
                    },
                    // upsert: true
                }
            })
        })
    ])
    res.status(StatusCodes.OK).json({
        employee
    });

})

export {
    updateEmployees,
    updateEmployee
}


/*

 */