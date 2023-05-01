import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { Employee } from "../models";
import { StatusCodes } from "http-status-codes";


// const updateEmployee = asyncHandler(async (req: Request, res: Response) => {

//     const {data} = req.body

//     try {
//         const employees = req.body.data; // assuming the array of employees is provided in the 'employees' property of the request body
//         const bulkWriteOps = employees.map(employee => {
//             return {
//                 updateOne: {
//                     filter: { employee_code: employee.employee_code },
//                     update: employee,
//                     upsert: true // if the record doesn't exist, create a new one
//                 }
//             };
//         });
//         const result = await Employee.bulkWrite(bulkWriteOps, { ordered: false });
//         res.status(200).json({ message: 'Employees updated or added successfully',result });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }


//     //Update Roles
//     const appraiserCodes = data
//         .filter((employee) => employee.appraiser_code)
//         .map((employee) => employee.employee_code);

//     const reviewerCodes = data
//         .filter((employee) => employee.reviewer_code)
//         .map((employee) => employee.employee_code);

//     const normalizerCodes = data
//         .filter((employee) => employee.normalizer_code)
//         .map((employee) => employee.employee_code);

// // Update roles for each employee in bulk
//     Employee.updateMany(
//         { employee_code: { $in: [...appraiserCodes, ...reviewerCodes, ...normalizerCodes] } },
//         {
//             $set: {
//                 roles: {
//                     appraiser: (employee) => appraiserCodes.includes(employee.employee_code),
//                     reviewer: (employee) => reviewerCodes.includes(employee.employee_code),
//                     normalizer: (employee) => normalizerCodes.includes(employee.employee_code),
//                 },
//             },
//         },
//         (err, result) => {
//             if (err) {
//                 console.error(err);
//                 return;
//             }

//             console.log(`${result.nModified} employees updated successfully.`);
//         }
//     );

// })


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


const updateEmployee = asyncHandler(async (req: Request, res: Response) => {
    try {
        
        // Check if required fields are present in the request body

        const { data } = req.body;

        // mapping data to the format required to check if the fields empty
        const mappedFields = data?.map((item) => { 
            return {
                Ecode : item.employee_code,
                'Employee Name': item.legal_full_name,
                Position : item.position_long_description,
                Grade : item.grade,
                'Probation Status' : item.probation_status,
                // 'Supervisory Role' : item.isSupervisor != undefined ? "SP" : "N-SP",
                 Function : item.function,
                'Appraiser Name' : item.appraiser_name,
                'Reviewer Name': item.reviewer_name,
                'Normalizer Name' : item.normalizer_name,
                Section : item.section,
                'Sub-Section' : item.sub_section,
                'Service-Date': item.service_reference_date,
                Division : item.division,
                'Manager Position': item.manager_position,
                'Work Location' : item.work_location,
                'Appraiser Code': item.appraiser_code,
                'Reviewer Code' : item.reviewer_code,
                'Normalizer Code' : item.normalizer_code
            }           
          
        })
 
//  required fields are the mandatory fields 
        const requiredFields = [
            'Ecode',
            'Employee Name',
            'Position',
            'Grade',
            'Probation Status',
            // 'Supervisory Role',
            // 'Function',
            'Appraiser Name',
            'Reviewer Name',
            'Normalizer Name',
            'Section',
            // 'Sub-Section',
            // 'Service-Date',
            'Division',
            // 'Manager Position',
            'Work Location',
            'Appraiser Code',
            'Reviewer Code',
            'Normalizer Code'
        ];
       
        let missingFields = [] ;
        let missingEmployeeCodes = [] ;

        mappedFields?.forEach((item) => {          
            // checking only the required fields from the mappedFields which is having data in same format.
         requiredFields?.forEach((field) => {           
                if (item[field] == undefined || item[field] == null || item[field] == "")
                // adding that field as missing field if value is undefined or empty
                missingFields?.push(field);
                if (field === "Ecode") {
                    missingEmployeeCodes?.push(item.Ecode);
                  }              
                })               
        })      

        const uniqueFields = [...new Set(missingFields)];

     if (missingFields.length > 0) {
     return res.status(400).json({       
     message: `Mandatory fields are missing for the employees : ${missingEmployeeCodes.map(field => `${field}  `)}. 
      Missing fields are  ${uniqueFields.map(field => `${field}`).join(', ')}  `,   
     });    
     }


        const employees = req.body.data;
        const bulkWriteOps = employees.map((employee) => {
            return {
                updateOne: {
                    // filter: { employee_code: employee.Ecode },
                    filter: { employee_code: employee.employee_code },
                    update: employee,
                    upsert: true,
                },
            };
        });



        const result = await Employee.bulkWrite(bulkWriteOps, { ordered: false });
        res
            .status(200)
            .json({ message: 'Employees updated or added successfully', result });



        const appraiserCodes = data
            .filter((employee) => employee.AppraiserCode)
            .map((employee) => employee.Ecode);



        const reviewerCodes = data
            .filter((employee) => employee.ReviewerCode)
            .map((employee) => employee.Ecode);



        const normalizerCodes = data
            .filter((employee) => employee.NormalizerCode)
            .map((employee) => employee.Ecode);


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
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



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