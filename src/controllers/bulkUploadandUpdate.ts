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


    //Update Roles
    const appraiserCodes = data
        .filter((employee) => employee.appraiser_code)
        .map((employee) => employee.employee_code);

    const reviewerCodes = data
        .filter((employee) => employee.reviewer_code)
        .map((employee) => employee.employee_code);

    const normalizerCodes = data
        .filter((employee) => employee.normalizer_code)
        .map((employee) => employee.employee_code);

// Update roles for each employee in bulk
    Employee.updateMany(
        { employee_code: { $in: [...appraiserCodes, ...reviewerCodes, ...normalizerCodes] } },
        {
            $set: {
                roles: {
                    appraiser: (employee) => appraiserCodes.includes(employee.employee_code),
                    reviewer: (employee) => reviewerCodes.includes(employee.employee_code),
                    normalizer: (employee) => normalizerCodes.includes(employee.employee_code),
                },
            },
        },
        (err, result) => {
            if (err) {
                console.error(err);
                return;
            }

            console.log(`${result.nModified} employees updated successfully.`);
        }
    );

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
There are three roles appraiser, reviewer and normalizer in the collection of employees. Every employee has a unique employee code. In every employee appraiser_code, reviewer_code, normalizer_code is there.
we need to get the employee code of these roles and then set roles: {
appraiser: true or false,
reviewer: true or false,
normalizer: true or false
}
getting data of employees in json format and it's in the node and mongoose


 */