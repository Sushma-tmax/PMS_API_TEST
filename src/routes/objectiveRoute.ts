import {Router} from 'express'

import {
    createObjective,
    createObjectiveDescription,
    createObjectiveGroup,
    createObjectiveType,
    deleteObjectiveGroup,
    getAllObjectiveDescriptions,
    getAllObjectiveGroups,
    getAllObjectiveTypes,
    getObjectiveType,
    updateObjectiveGroup,
    updateObjectiveDescription,
    deleteObjectiveDescription,
    updateObjectiveType,
    deleteObjectiveType,
    getObjectiveDescription,
    getObjectiveGroup,
    getObjectiveTitle,
    getAllObjectiveTitles,
    deleteObjectiveTitle,
    createObjectiveTitle,
    updateObjectiveTitle,

} from "../controllers/objective/objectiveController";


const router = Router()


router.post('/objective-group', createObjectiveGroup)
router.get('/objective-group', getAllObjectiveGroups)
router.patch('/objective-group/:id', updateObjectiveGroup)
router.delete('/objective-group/:id', deleteObjectiveGroup)
router.get('/objective-group/:id', getObjectiveGroup)



router.post('/objective-type', createObjectiveType)
router.get('/objective-type', getAllObjectiveTypes)
router.get('/objective-type/:id', getObjectiveType)
router.patch('/objective-type/:id', updateObjectiveType)
router.delete('/objective-type/:id', deleteObjectiveType)




router.post('/objective-description', createObjectiveDescription)
router.get('/objective-description', getAllObjectiveDescriptions)
router.get('/objective-description/:id', getObjectiveDescription)
router.patch('/objective-description/:id', updateObjectiveDescription)
router.delete('/objective-description/:id', deleteObjectiveDescription)

router.post('/objective-title', createObjectiveTitle)
router.get('/objective-title', getAllObjectiveTitles)
router.get('/objective-title/:id', getObjectiveTitle)
router.delete('/objective-title/:id', deleteObjectiveTitle)
router.patch('/objective-title/:id', updateObjectiveTitle)


router.post('/objective', createObjective)
export default router
