import {Request, Response} from 'express'
import asyncHandler from "../middleware/asyncHandler";
import sendEmail from "../utils/sendEmail";
import {StatusCodes} from "http-status-codes";
import { Employee } from '../models';


const sendEmailController = asyncHandler(async (req: Request, res: Response) => {

const {to,cc,subject, html} = req.body

    console.log(await sendEmail({
        to: to,
        cc:cc,
        subject: subject,
        html: html
    }))
    res.status(StatusCodes.OK).json("df");
})

/* get email id of appraiser, reviewer and normalizer based on the appraiser,
reviewer and normalizer codes */

const getEmailIds = asyncHandler(async (req, res) => {
    const { appraiser_code, reviewer_code, normalizer_code } = req.params;   
    try {
        const employees = await Employee.find({
          employee_code: {
            $in: [appraiser_code, reviewer_code, normalizer_code]
          }
        });
        const employeeData = employees.map((employee : any) => ({
            employee_code: employee.employee_code,
            email: employee.email,
            firstName : employee.first_name         
          }));
        return res.json({ employeeData })

    } catch (error) {
      console.error('Error retrieving emails:', error);
       res.status(500).json({ error: 'Internal server error' });
    }
    })

    const getEmailIdsBulk = asyncHandler(async (req, res) => {
      const { ecodes } = req.body;   
      try {
          const employees = await Employee.find({
            employee_code: {
              $in: ecodes
            }
          });
          const employeeData = employees.map((employee : any) => ({
              employee_code: employee.employee_code,
              email: employee.email,
              firstName : employee.first_name         
            }));
          return res.json({ employeeData })
  
      } catch (error) {
        console.error('Error retrieving emails:', error);
         res.status(500).json({ error: 'Internal server error' });
      }
      })
export {
    sendEmailController,
    getEmailIds,
    getEmailIdsBulk
}