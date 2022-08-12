import {Router} from "express";
import {deleteCalender,getCalenderById,updateCalender,getAllCalenders,createCalender} from "../controllers/calenderController";

const router = Router()


router.get('/',getAllCalenders)
router.get('/:id',getCalenderById)
router.post('/',createCalender)
router.patch('/:id',updateCalender)
router.delete('/:id',deleteCalender)


export default router
