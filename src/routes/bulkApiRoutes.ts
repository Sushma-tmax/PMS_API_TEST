import { Router } from "express";
import {updateEmployee, updateEmployees} from "../controllers/bulkUploadandUpdate";

const router = Router()


router.patch('/update', updateEmployee)


export default router
