import { Router } from "express";
import {
    ReminderNotificationFunction,
    ReminderNotificationFunctionData
} from "../controllers/remainderNotification/remainderNotificationController";
import {advancedResults} from "../middleware/advancedResults";
import {Employee} from "../models";

const router = Router()
// @ts-ignore
// router.get('/calendarEmployeeEmails/:calendarId', getPAcalendarEmployeeEmails)
// router.get('/lineManagerPlusOneEmployee/:employee_code/:calId', lineManagerPlusOneEmployee)
// router.post('/updateEmployeeRoles',updateEmployeeRoles)
 router.post('/updateReminderNotificationData', ReminderNotificationFunction)
 router.get('/ReminderNotificationFunctionData/:type', ReminderNotificationFunctionData)


export default router
