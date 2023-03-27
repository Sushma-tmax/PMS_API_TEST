import {Router} from "express";
import {deleteCalender,getCalenderById,updateCalender,getAllCalenders,createCalender,getAllActiveCalenders,getDraftCalenders, getAllPACalenders,getAllClosedCalenders} from "../controllers/calenderController";

const router = Router()

router.get('/draftCalendar',getDraftCalenders)
router.get('/pacalendars',getAllPACalenders)
router.get('/active',getAllActiveCalenders)
router.get('/closed',getAllClosedCalenders)
router.get('/',getAllCalenders)
router.get('/:id',getCalenderById)
router.post('/',createCalender)
router.patch('/:id',updateCalender)
router.delete('/:id',deleteCalender)



export default router
