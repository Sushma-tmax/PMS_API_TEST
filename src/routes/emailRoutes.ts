import { Router } from "express";
import {getEmailIds, sendEmailController} from "../controllers/emailNotification";



const router = Router()

router.get('/email/:appraiser_code/:reviewer_code/:normalizer_code', getEmailIds)


router.post("/send-email",sendEmailController)



export default router
