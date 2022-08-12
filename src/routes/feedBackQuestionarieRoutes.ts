import {Router} from "express";
import {
    createFeedBackQuestionarie,
    deleteFeedBackQuestionarie,
    getAllFeedBackQuestionarie,
    getFeedBackQuestionarie,
    updateFeedBackQuestionarie
} from '../controllers/feedBackQuestionaireController'

const router = Router()

router.get('/', getAllFeedBackQuestionarie)
router.get('/:id', getFeedBackQuestionarie)
router.post('/', createFeedBackQuestionarie)
router.patch('/:id', updateFeedBackQuestionarie)
router.delete('/:id', deleteFeedBackQuestionarie)

export default router