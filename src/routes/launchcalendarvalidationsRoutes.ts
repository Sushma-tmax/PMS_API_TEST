import {Router} from "express";
import dashboardColor from "../models/DashboardColor";
import {validations,confirmEmployeeMasterList,reminderNotificationStatus,reminderNotificationStatusUpdate} from "../controllers/launchcalendarvalidationsController";

const router = Router()


router.get('/ConfirmValidations',validations )
router.post('/updateValidations/:id',confirmEmployeeMasterList )
router.get('/reminderNotificationStatus',reminderNotificationStatus )
router.post('/reminderNotificationStatusUpdate/:id',reminderNotificationStatusUpdate )
export default router