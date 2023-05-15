import { Router } from "express";

import {clearEmployeeMasterUpdate, updateEmployee} from "../controllers/bulkUploadandUpdate";



const router = Router()


router.patch('/update', updateEmployee)
router.patch('/clearEmployeeMaster', clearEmployeeMasterUpdate)


export default router
