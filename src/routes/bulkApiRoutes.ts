import { Router } from "express";
import {updateEmployees} from "../controllers/bulkUploadandUpdate";

const router = Router()


router.patch('/update', updateEmployees)


export default router
