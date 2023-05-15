import asyncHandler from "../middleware/asyncHandler";
import { Request, Response } from "express";
import launchcalendarvalidations from "../models/launchcalendarvalidations";
import { StatusCodes } from "http-status-codes";
import { Employee } from "../models";

const validations = asyncHandler(async (req: Request, res: Response) => {
    //console.log(req,"backend")


    let changedvalidations: any
    changedvalidations = await launchcalendarvalidations.find()

    res.status(StatusCodes.OK).json({
        data: changedvalidations
    });

    console.log(changedvalidations, "changedvalidations")
})
const updateValidations = asyncHandler(async (req: Request, res: Response) => {

    //const { id } = req.params
    const { confirmEmployeeMaster } = req.body
    console.log(confirmEmployeeMaster, "confirmEmployeeMaster1")
    // const employee = await launchcalendarvalidations.findOneAndUpdate({
    //     $set: {
    //         confirmEmployeeMaster: id,
    //     }
    // }
    // )

    /* function to find unmapped employees from the employee master */

    // const unmappedEmployees = await Employee.find({ employee_upload_flag: false, isLeavers: false })

    // if (unmappedEmployees.length > 0) {
    //     return res.status(400).json({
    //         message: `There are ${unmappedEmployees.length} unmapped employees.`,
    //         data: unmappedEmployees
    //     });
    // }

    /* Function to check whether appraiser code , reviewer code and normalizer code exists in the employee master
       and if yes then check whether their respective names matches their respective codes */
    const employeeData = await Employee.find({});

    let errorMessage = "";

    // create a set of unique appraiser, reviewer, and normalizer codes
    const appraiserCodes = new Set(employeeData.map(item => item.appraiser_code));
    const reviewerCodes = new Set(employeeData.map(item => item.reviewer_code));
    const normalizerCodes = new Set(employeeData.map(item => item.normalizer_code));

    // retrieve all employees with these codes
    const employeesWithCodes = await Employee.find({ employee_code: { $in: [...appraiserCodes, ...reviewerCodes, ...normalizerCodes] } });

    employeeData.forEach((item: any) => {
        const employeeCode = item.employee_code;
        const appraiserCode = item.appraiser_code;
        const appraiserName = item.appraiser_name;
        const reviewerCode = item.reviewer_code;
        const reviewerName = item.reviewer_name;
        const normalizerCode = item.normalizer_code;
        const normalizerName = item.normalizer_name;

        // find the employee with the corresponding appraiser code
        const employeeWithAppraiserCode = employeesWithCodes.find(employee => employee.employee_code === appraiserCode);
        if (employeeWithAppraiserCode) {
            const employeeAppraiserName = employeeWithAppraiserCode.legal_full_name;
            if (employeeAppraiserName !== appraiserName) {
                errorMessage += `Appraiser name '${appraiserName}' is not correct for employee code '${employeeCode}'.\n`;
            }
        } else {
            errorMessage += `Appraiser code '${appraiserCode}' does not exist.\n`;
        }

        // find the employee with the corresponding reviewer code
        const employeeWithReviewerCode = employeesWithCodes.find(employee => employee.employee_code === reviewerCode);
        if (employeeWithReviewerCode) {
            const employeeReviewerName = employeeWithReviewerCode.legal_full_name;
            if (employeeReviewerName !== reviewerName) {
                errorMessage += `Reviewer name '${reviewerName}' is not correct for employee code '${employeeCode}'.\n`;
            }
        } else {
            errorMessage += `Reviewer code '${reviewerCode}' does not exist.\n`;
        }

        // find the employee with the corresponding normalizer code
        const employeeWithNormalizerCode = employeesWithCodes.find(employee => employee.employee_code === normalizerCode);
        if (employeeWithNormalizerCode) {
            const employeeNormalizerName = employeeWithNormalizerCode.legal_full_name;
            if (employeeNormalizerName !== normalizerName) {
                errorMessage += `Normalizer name '${normalizerName}' is not correct for employee code '${employeeCode}'.\n`;
            }
        } else {
            errorMessage += `Normalizer code '${normalizerCode}' does not exist.\n`;
        }
    });

    if (errorMessage !== "") {
        /* If any of the codes do not exist in the database, throw an error with the error message */
        return res.status(400).json({
            message: errorMessage,
        });
    }

    if (errorMessage == "") {
        const employeeVal = await launchcalendarvalidations.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            $set: {
                confirmEmployeeMaster: confirmEmployeeMaster,
            }
        });
        res.status(StatusCodes.OK).json({
            //data:employee
            data: employeeVal
        });
    }
   
})
export { validations, updateValidations }