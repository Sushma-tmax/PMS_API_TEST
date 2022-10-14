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
    getAppraisalCalendarofCurrentYear
//     checkTemplatesPosition
} from "../controllers/appraisalCalenderController";

const router = Router()

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





export default router
