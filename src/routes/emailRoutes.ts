import { Router } from "express";
import {getEmailIds, getEmailIdsBulk, sendEmailController} from "../controllers/emailNotification";



const router = Router()

router.get('/email/:appraiser_code/:reviewer_code/:normalizer_code', getEmailIds)

router.post('/email-bulk', getEmailIdsBulk)
router.post("/send-email",sendEmailController)



export default router
