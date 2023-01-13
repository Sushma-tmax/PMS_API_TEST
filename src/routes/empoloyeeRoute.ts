import { Router } from "express";
import {
    createEmployee,
    getAllEmployees,
    addTemplateToEmployee,
    addRating,
    appraisal,
    getEmployeeById,
    appraisalStatusFilter,
    updateEmployee,
    acceptReviewer,
    acceptNormalizer,
    acceptAppraisalEmployee,
    rejectedReviewerValues,
    rejectedNormalizerValues,
    reviewerRejection,
    normalizerRejection,
    acceptReviewerRejectedAppraiser,
    acceptNormalizerRejectedAppraiser,
    appraisalStatusAppraiser,
    appraisalStatusReviewer,
    appraisalStatusNormalizer,
    filterByPotential,
    filterByRatings,
    testFilter,
    employeeRejection,
    normalizerAcceptsEmployee,
    normalizerRejectsEmployee,
    employeeRejectionSave,
    employeeUpdateMany,
    appraiserAcceptsEmployee,
    appraiserRejectsEmployee,
    normalizerSubmitEmployeeRejection, attachmentsAppraiser,
    calculateRatings,
    attachmentsReviewer,
    attachmentsNormalizer,
    attachmentsEmployee,
    filterEmployeeByManagerCode, employeeAppraisalClose,
    statusBasedCount,
    getUnMappedEmployee,
    getEmployeeTemplate, getReviewerEmployee,
    removeAppraiserAttachments,removeAppraiserAttachmentsOverview, removeEmployeeAttachments, removeNormalizerAttachments, removeReviewerAttachments, acceptReviewerRatings,
    appraiserDashboard,
    attachmentsAppraiserOverview,
    meetingNotesAttachmentsNormalizer,
    acceptNormalizerGradeException,
    acceptEmployeeGradeException,
    rejectionAttachmentsAppraiser,
    removeRejectionAppraiserAttachments

} from "../controllers/employee/employeeController";
import {advancedResults} from "../middleware/advancedResults";
import {Employee} from "../models";

const router = Router()
// @ts-ignore
router.get('/unmapped-data/:id', getUnMappedEmployee)
router.get('/filters/employee-with-template', getEmployeeTemplate)
router.get('/status-count', statusBasedCount)
router.route('/employee-filter').get(advancedResults(Employee,"calendar"), testFilter)
router.get('/zzzzzz', employeeUpdateMany)
router.get('/close', employeeAppraisalClose)
router.get('/reviewer-employee/:id',getReviewerEmployee)
router.get('/appraiser-dashboard', appraiserDashboard)

router.get('/appraiser-status/:status', appraisalStatusAppraiser)
router.get('/reviewer-status/:status', appraisalStatusReviewer)
router.get('/normalizer-status/:status', appraisalStatusNormalizer)
router.patch('/reject-normalizer-values/:id',rejectedNormalizerValues )
 router.patch('/accept-reviewer', acceptReviewer)
 router.patch('/accept-reviewer-rating',acceptReviewerRatings)
router.patch('/accept-normalizer', acceptNormalizer)
router.patch('/accept-normalizer-grade-exception', acceptNormalizerGradeException)
router.patch('/accept-employee-gradeException', acceptEmployeeGradeException)
router.patch('/reject-reviewer-values/:id', rejectedReviewerValues)
router.patch('/appraiser-accept-reviewer/:id', acceptReviewerRejectedAppraiser)
router.patch('/appraiser-accept-normalizer/:id', acceptNormalizerRejectedAppraiser)
router.patch('/normalizer-accept-employee/:id', normalizerAcceptsEmployee)
router.patch('/normalizer-reject-employee/:id', normalizerRejectsEmployee)
router.patch('/employee-reject-save/:id', employeeRejectionSave)
router.get('/filter/:status', getAllEmployees)
router.get('/:id', getEmployeeById)
// router.get('/filter/:status', appraisalStatusFilter)
router.post('/', createEmployee)
router.patch('/template/:id', addTemplateToEmployee)
router.get('/rating', addRating)
router.patch('/appraisal/:id', appraisal)
router.patch('/reviewer-rejection/:id', reviewerRejection)
router.patch('/normalizer-rejection/:id', normalizerRejection)
router.patch('/employee-rejection/:id', employeeRejection)
router.patch('/:id', updateEmployee)
router.get('/filter/potential/:status', filterByPotential)
router.get('/filter/:gt/:lt', filterByRatings)
router.patch('/accept-appraisal/:id', acceptAppraisalEmployee)
router.patch('/appraiser-accept-employee/:id', appraiserAcceptsEmployee)
router.patch('/appraiser-reject-employee/:id', appraiserRejectsEmployee)
router.patch('/normalizer-submit-employee-rejection/:id', normalizerSubmitEmployeeRejection)
router.patch('/appraiser-attachments/:id', attachmentsAppraiser)
router.patch('/appraiser-attachments-overview/:id', attachmentsAppraiserOverview)
router.patch('/appraiser-attachments-rejection/:id', rejectionAttachmentsAppraiser)
router.patch('/delete/appraiser-attachments/:id', removeAppraiserAttachments)
router.patch('/delete/appraiser-attachments-rejection/:id', removeRejectionAppraiserAttachments)
router.patch('/delete/appraiser-attachments-overview/:id', removeAppraiserAttachmentsOverview)
router.patch('/delete/employee-attachments/:id', removeEmployeeAttachments)
router.patch('/delete/normalizer-attachments/:id', removeNormalizerAttachments)
router.patch('/delete/normalizer-attachments/:id', removeNormalizerAttachments)
router.patch('/delete/reviewer-attachments/:id', removeReviewerAttachments)


router.patch('/reviewer-attachments/:id', attachmentsReviewer)
router.patch('/upload/meeting-notes-attachments-normalizer/:id',meetingNotesAttachmentsNormalizer)
router.patch('/normalizer-attachments/:id', attachmentsNormalizer)
router.patch('/employee-attachments/:id', attachmentsEmployee)
router.patch('/calculate/ratings', calculateRatings)
router.get('/employee-manager-code/:code', filterEmployeeByManagerCode)






export default router
