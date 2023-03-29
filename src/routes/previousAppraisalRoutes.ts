import {Router} from 'express'
import { testFilter } from '../controllers/employee/employeeController';
import {addEmployeestoPrevioisAppraisal, getpastAppraisalDetailsofEmployee} from "../controllers/previousAppraisalController";
import {advancedResults} from "../middleware/advancedResults";
import PreviousAppraisal from "../models/PreviousAppraisal";


const router = Router()

router.route('/filter').get(advancedResults(PreviousAppraisal, "calendar"), testFilter)

router.post('/', addEmployeestoPrevioisAppraisal)
router.get('/pastappraisalemployee/:id',getpastAppraisalDetailsofEmployee)



export default router