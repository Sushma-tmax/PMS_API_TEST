import {Router} from "express";
import {
    updateAppraisalCalender,
    getAllAppraisalCalender,
    createAppraisalCalender,
    getAppraisalCalenderById,
    deleteAppraisalCalender,
    startAppraisal,
    startProbationAppraisal,
    getRecentAppraisalCalender,
    addPositionsToAppraisalCalendar,
    removePositionsToAppraisalCalendar,
    getAppraisalCalendarofCurrentYear,
    appraisalCalendarEmployeeValidation,
    getAppraisalCalendarForTemplate, appraisalCalendarClose
//     checkTemplatesPosition
} from "../controllers/appraisalCalenderController";
import {advancedResults} from "../middleware/advancedResults";
import AppraisalCalender from "../models/AppraisalCalender";
import {testFilter} from "../controllers/employee/employeeController";

const router = Router()

router.patch('/close', appraisalCalendarClose)
router.route('/filter').get(advancedResults(AppraisalCalender,'calendar'), testFilter)
router.patch('/validation/:id',appraisalCalendarEmployeeValidation )
router.get('/current-year-calendar', getAppraisalCalendarofCurrentYear)
router.patch('/employee/:id', addPositionsToAppraisalCalendar)
router.patch('/remove-employee/:id', removePositionsToAppraisalCalendar)
router.get('/probation', startProbationAppraisal)
router.patch('/start/:id', startAppraisal)
router.patch('/:id', updateAppraisalCalender)
router.get('/', getAllAppraisalCalender)
router.get('/recent', getRecentAppraisalCalender)
router.get('/:id', getAppraisalCalenderById)
router.post('/', createAppraisalCalender)
// router.post('/employee/:id', addPositionsToAppraisalCalendar)
router.delete('/:id', deleteAppraisalCalender)
router.post('/calendar-by-template',getAppraisalCalendarForTemplate)






export default router
