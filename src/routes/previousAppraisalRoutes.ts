import {Router} from 'express'
import { testFilter } from '../controllers/employee/employeeController';
import {addEmployeestoPrevioisAppraisal, getEmployeeDetails, getPreviousAppraisalDetailsofEmployee, getpastAppraisalDetailsofEmployee} from "../controllers/previousAppraisalController";
import {advancedResults} from "../middleware/advancedResults";
import PreviousAppraisal from "../models/PreviousAppraisal";


const router = Router()

router.route('/filter').get(advancedResults(PreviousAppraisal, "calendar"), testFilter)

router.post('/', addEmployeestoPrevioisAppraisal)
router.get('/pastappraisalemployee/:id',getpastAppraisalDetailsofEmployee)
router.get('/previousAppraisalEmployee/:employeeCode/:calendarId',getPreviousAppraisalDetailsofEmployee)
router.get('/employeeDetails/:calendarId',getEmployeeDetails)



export default router