import {Router} from "express";
import { getImage,postImage } from "../controllers/azureImageStorage";
const router = Router();


router.get('/images', getImage)
router.post('/imageblob', postImage)


export default router