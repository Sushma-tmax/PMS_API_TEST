import {Request, Response} from "express";
import asyncHandler from "../middleware/asyncHandler";
import {Employee} from "../models";
import {StatusCodes} from "http-status-codes";


const updateEmployee = asyncHandler(async (req: Request, res: Response) => {

    const {data} = req.body

    try {
        const employees = req.body.data; // assuming the array of employees is provided in the 'employees' property of the request body
        const bulkWriteOps = employees.map(employee => {
            return {
                updateOne: {
                    filter: { employee_code: employee.employee_code },
                    update: employee,
                    upsert: true // if the record doesn't exist, create a new one
                }
            };
        });
        const result = await Employee.bulkWrite(bulkWriteOps, { ordered: false });
        res.status(200).json({ message: 'Employees updated or added successfully',result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }


    const [employee_code, legal_full_name, gender] = data

    // const {employee_code, appraiser_code,reviewer_code,normalizer_code} = data
    //
    // const appraiser_code_array = [... new Set([...appraiser_code])]
    // const reviewer_code_array = [... new Set([...reviewer_code])]
    // const normalizer_code_array = [... new Set([...normalizer_code])]


    // const employee = await Employee.updateMany({ employee_code:  employee_code  },
    //     {
    //         "employee_code": employee_code,
    //         "legal_full_name": legal_full_name,
    //         "gender": gender
    //
    //     },
    //     { upsert: true }
    // )

    // const employee = await Employee.create(req.body)

    // res.status(StatusCodes.OK).json({
    //     // success: true,
    //     // data: position,
    //     // appraisal,
    //     // position,
    //     data: employee
    // })

})


const updateEmployees = asyncHandler(async (req: Request, res: Response) => {


    const {data} = req.body
    console.log(data, "data")

    const employee = await Employee.bulkWrite([
        data.map((employee: any) => {
            return ({
                updateOne: {
                    filter: {employee_code: employee.Ecode},
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