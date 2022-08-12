import {Router} from "express";
import {
    createTrainingRecommendation,
    createOtherRecommendation,
    getAllOtherRecommendation,
    getAllTrainingRecommendation,
    updateTrainingRecommendation,
    updateOtherRecommendation,
    getOtherRecommendaion,
    getTrainingRecommendation,
    deleteTrainingRecommendation,
    deleteOtherRecommendation
} from "../controllers/recommendations/recommendationsController";

const router = Router()

router.post('/training-recommendation', createTrainingRecommendation)
router.get('/training-recommendation', getAllTrainingRecommendation)
router.get('/training-recommendation/:id', getTrainingRecommendation)
router.patch('/training-recommendation/:id', updateTrainingRecommendation)
router.delete('/training-recommendation/:id', deleteTrainingRecommendation)

router.post('/other-recommendation', createOtherRecommendation)
router.get('/other-recommendation', getAllOtherRecommendation)
router.get('/other-recommendation/:id', getOtherRecommendaion)
router.patch('/other-recommendation/:id', updateOtherRecommendation)
router.delete('/other-recommendation/:id', deleteOtherRecommendation)


export default router

