import {Router} from 'express'
import {addEmployeestoPrevioisAppraisal} from "../controllers/previousAppraisalController";


const router = Router()

router.post('/', addEmployeestoPrevioisAppraisal)


export default router