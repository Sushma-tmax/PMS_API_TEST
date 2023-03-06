import {Router} from "express";
import {deleteCalender,getCalenderById,updateCalender,getAllCalenders,createCalender,getAllActiveCalenders,getDraftCalenders} from "../controllers/calenderController";

const router = Router()


router.get('/',getAllCalenders)
router.get('/:id',getCalenderById)
router.post('/',createCalender)
router.patch('/:id',updateCalender)
router.delete('/:id',deleteCalender)
router.get('//',getAllActiveCalenders)
router.get('/draftCalendar',getDraftCalenders)

export default router
