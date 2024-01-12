import { Router } from "express";
import { getAllperformanceGoals } from "../controllers/performanceGoalsController";
const router = Router()



router.get('/',getAllperformanceGoals)

export default router
