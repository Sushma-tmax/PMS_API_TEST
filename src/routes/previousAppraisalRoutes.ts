import {Router} from 'express'
import {addEmployeestoPrevioisAppraisal} from "../controllers/previousAppraisalController";
import {advancedResults} from "../middleware/advancedResults";
import PreviousAppraisal from "../models/PreviousAppraisal";


const router = Router()


router.route('/filter').get(advancedResults(PreviousAppraisal, "calendar"))

router.post('/', addEmployeestoPrevioisAppraisal)



export default router