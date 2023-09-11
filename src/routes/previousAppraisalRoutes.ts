import {Router} from 'express'
import { testFilter } from '../controllers/employee/employeeController';
import {addEmployeestoPrevioisAppraisal, getEmployeeDetailsPrevious, getEmployeePAWithEmployeeCode, getPreviousAppraisalDetailsofEmployee, getpastAppraisalDetailsofEmployee} from "../controllers/previousAppraisalController";
import {advancedResults} from "../middleware/advancedResults";
import PreviousAppraisal from "../models/PreviousAppraisal";


const router = Router()

router.route('/filter').get(advancedResults(PreviousAppraisal, "calendar"), testFilter)

router.post('/', addEmployeestoPrevioisAppraisal)
router.get('/pastappraisalemployee/:id',getpastAppraisalDetailsofEmployee)
router.get('/previousAppraisalEmployee/:employeeCode/:calendarId',getPreviousAppraisalDetailsofEmployee)
router.get('/employeeDetails/:calendarId',getEmployeeDetailsPrevious)
router.get('/PA_details_employee_code/:employeeCode',getEmployeePAWithEmployeeCode)



export default router