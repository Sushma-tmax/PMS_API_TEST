import {Router} from 'express'
import {addEmployeestoPrevioisAppraisal} from "../controllers/previousAppraisalController";


const router = Router()

router.post('/get', addEmployeestoPrevioisAppraisal)


export default router