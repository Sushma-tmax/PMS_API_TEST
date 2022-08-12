import { Router } from "express";
import {createNineBox, updateNineBox,getAllNineBox} from "../controllers/nineBoxController";
const router = Router()



router.get('/',getAllNineBox)
router.post("/", createNineBox);
router.patch('/:id', updateNineBox);


export default router
