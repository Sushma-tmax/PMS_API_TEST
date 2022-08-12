import {Router} from "express";
import {
    createRatings,
    getAllRatings,
    createRatingScaleDescription,
    getAllRatingScaleDescription,
    getRatingScaleDescription,
    updateRatingScaleDescription,
    getRating,
    deleteRatingScaleDescription,
    deleteRatings,
    updateRatings
} from "../controllers/ratings/ratingsController";

const router = Router();

router.post('/', createRatings)
router.get('/', getAllRatings)
router.get('/:id', getRating)
router.delete('/:id', deleteRatings)
router.patch('/:id', updateRatings)



export default router;