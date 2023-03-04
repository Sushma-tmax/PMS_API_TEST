import { Router } from "express";
import {sendEmailController} from "../controllers/emailNotification";


const router = Router()


router.post("/send-email",sendEmailController)


export default router
