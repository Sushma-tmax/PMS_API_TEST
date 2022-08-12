import {Router} from 'express'


import {
    addRatingScale
} from '../controllers/ratingScaleValidationController'


const router = Router()


router.post('/', addRatingScale)


export default router
