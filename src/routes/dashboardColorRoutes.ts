import {Router} from "express";
import dashboardColor from "../models/DashboardColor";
import {changeColor} from "../controllers/dashboardController";

const router = Router()


router.get('/',changeColor )

export default router