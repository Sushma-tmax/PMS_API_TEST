import {Router} from "express";
import {
    createRatingScaleDescription, deleteRatingScaleDescription,
    getAllRatingScaleDescription,
    getRatingScaleDescription, updateRatingScaleDescription
} from "../controllers/ratings/ratingsController";

const router = Router();


router.post('/', createRatingScaleDescription)
router.get('/', getAllRatingScaleDescription)
router.get('/:id', getRatingScaleDescription)
router.patch('/:id', updateRatingScaleDescription)
router.delete('/:id', deleteRatingScaleDescription)

export default router
