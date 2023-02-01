import { Router } from "express";
import {createNineBox, updateNineBox,getAllNineBox, getTalentCategory} from "../controllers/nineBoxController";
const router = Router()



router.get('/',getAllNineBox)
router.post("/", createNineBox);
router.patch('/:id', updateNineBox);
router.get('/talent-category/:overall_rating/:potential',getTalentCategory);

export default router
