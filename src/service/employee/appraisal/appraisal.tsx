import {pmsApi} from "../../root";

const APPRAISAL_URL = `/api/v1/employee`


const apiWithTag = pmsApi.enhanceEndpoints({addTagTypes: ['Employee']})

const appraisalApi = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        // Create Template

        getEmployeeAppraisal: builder.query<any, any>({
            query: (id) => ({
                url: `${APPRAISAL_URL}/${id}`,
                method: 'GET',
            }),
            providesTags: ['Employee'],
        }),

        getEmployeeAppraisalForViewPA: builder.query<any, any>({
            query: (id) => ({
                url: `${APPRAISAL_URL}/view-PA/${id}`,
                method: 'GET',
            }),
            providesTags: ['Employee'],
        }),
        getEmployeeDetails: builder.query<any, any>({
            query: (id) => ({
                url: `${APPRAISAL_URL}/user/${id}`,
                method: 'GET',
            }),
            providesTags: ['Employee'],
        }),

        createEmployeeAppraisal: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/appraisal/${data.id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Employee'],
        }),
        updateEmployeeAppraisal: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/${data.id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Employee'],
        }),
       
        startEmployeeAppraisal: builder.mutation<any, any>({
            query: (id) => ({
                url: `${APPRAISAL_URL}/template/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Employee'],
        }),
        acceptReviewer: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/accept-reviewer`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Employee'],
        }),

        acceptReviewerRatings: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/accept-reviewer-rating`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Employee'],
        }),
        acceptNormalizer: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/accept-normalizer`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Employee'],
        }),
       
        acceptNormalizerGradeException: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/accept-normalizer-grade-exception`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Employee'],
        }),

        acceptNormalizerGradeExceptionBulk: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/accept-normalizer-grade-exception-bulk`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Employee'],
        }),
      
        acceptAppraisalEmployee: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/accept-appraisal/${data}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Employee'],
        }),
        rejectReviewerAppraisalEmployee: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/reject-reviewer-values/${data.id}`,
                body: data,
                method: 'PATCH',
            }),
            invalidatesTags: ['Employee'],
        }),

        rejectNormalizerAppraisalEmployee: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/reject-normalizer-values/${data.id}`,
                body: data,
                method: 'PATCH',
            }),
            invalidatesTags: ['Employee'],
        }),


        reviewerRejection: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/reviewer-rejection/${data.employee_id}`,
                body: data,
                method: 'PATCH',
            }),
            invalidatesTags: ['Employee'],
        }),
        normalizerRejection: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/normalizer-rejection/${data.employee_id}`,

                body: data,
                method: 'PATCH',
            }),
            invalidatesTags: ['Employee'],
        }),
        employeeRejection: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/employee-rejection/${data.employee_id}`,
                body: data,
                method: 'PATCH',
            }),
            invalidatesTags: ['Employee'],
        }),
        appraiserAcceptReviewer: builder.mutation<any, any>({
            query: (id) => ({
                url: `${APPRAISAL_URL}/appraiser-accept-reviewer/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Employee'],
        }),

        appraiserAcceptNormalizer: builder.mutation<any, any>({
            query: (id) => ({
                url: `${APPRAISAL_URL}/appraiser-accept-normalizer/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Employee'],
        }),
        normalizerAcceptEmployee: builder.mutation<any, any>({
            query: (id) => ({
                url: `${APPRAISAL_URL}/normalizer-accept-employee/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Employee'],
        }),

        normalizerRejectEmployee: builder.mutation<any, any>({
            query: (id) => ({
                url: `${APPRAISAL_URL}/normalizer-reject-employee/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Employee'],
        }),

        employeeRejectSave: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/employee-reject-save/${data.id}`,
                body: data,
                method: 'PATCH',
            }),
            invalidatesTags: ['Employee'],
        }),

        appraiserAcceptsEmployee: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/appraiser-accept-employee/${data.id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),

        appraiserRejectsEmployee: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/appraiser-reject-employee/${data.id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Employee'],
        }),

        normalizerSubmitEmployeeRejection: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/normalizer-submit-employee-rejection/${data.id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),
        attachmentsAppraiser: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/appraiser-attachments/${data.id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),
        attachmentsAppraiserOverview: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/appraiser-attachments-overview/${data.id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),

        attachmentsRejectionAppraiser : builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/appraiser-attachments-rejection/${data.id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),

      attachmentsRejectionAppraiserDelete : builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/delete/appraiser-attachments-rejection/${data.id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),

        attachmentsAppraiserDelete: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/delete/appraiser-attachments/${data.employee_id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),
        attachmentsAppraiserOverviewDelete: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/delete/appraiser-attachments-overview/${data.employee_id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),
        attachmentsReviewerDelete: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/delete/reviewer-attachments/${data.employee_id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),
        attachmentsNormalizerDelete: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/delete/normalizer-attachments/${data.employee_id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),
        attachmentsEmployeeDelete: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/delete/employee-attachments/${data.employee_id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),
        attachmentsReviewer: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/reviewer-attachments/${data.id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),
        attachmentsNormalizer: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/normalizer-attachments/${data.id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),
        meetingNotesAttachmentsNormalizer: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/upload/meeting-notes-attachments-normalizer/${data.id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),
        meetingNotesDeleteAttachmentsNormalizer: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/delete/meeting-notes-attachments-normalizer/${data.id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),
        attachmentsEmployee: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/employee-attachments/${data.id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),

        calculateRatings: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/calculate/ratings`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),

        getEmployeeByManagerCode: builder.query<any, any>({
            query: (code) => ({
                url: `${APPRAISAL_URL}/employee-manager-code/${code}`,
                method: 'GET',
                // body: data
            }),
            providesTags: ['Employee'],
        }),

        acceptEmployeeGradeException: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/accept-employee-gradeException`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),
        
        acceptEmployeeRoleExceptions: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/accept-employee-roleExceptions`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),
        acceptEmployeeRoleExceptionsDraft: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/accept-employee-roleExceptions-Draft`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),
        acceptEmployeeCEORole: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/accept-employee-CEORole`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),
        acceptEmployeeLeavers: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/accept-employee-Leavers`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),
        acceptEmployeeLeaversDraft: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/accept-employee-Leavers-Draft`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),
        acceptEmployeeExcluded: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/accept-employee-Excluded`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),  
        acceptEmployeeNamesChange: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/accept-Employee-Names-Change`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),  
        acceptEmployeeNamesChangeDraft: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/accept-Employee-Names-Change-Draft`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),  
        removesMultipleEmployeeFromRoleException: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/remove-BulkEmployee-Roleexception`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),  
        appraiserAcceptsReviewerRating: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/appraiser-accept-reviewer-rating/${data.id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Employee'],
        }),

        reviewerAcceptsAppraiserRating: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/reviewer-accept-appraiser-rating/${data.id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Employee'],
        }),

        appraiserAcceptsEmployeeRating: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/appraiser-accept-employee-rating/${data.id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Employee'],
        }),

        employeeAcceptsAppraiserRating: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/employee-accept-appraiser-rating/${data.id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Employee'],
        }),
       
        getlineManagerEmployee: builder.query<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/lineManagerEmployee/${data}`,
                method: 'GET',
                //body: data
            }),
            providesTags: ['Employee'],
        }),
        getlineManagerPlusOneEmployee: builder.query<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/lineManagerPlusOneEmployee/${data.employee_code}/${data.calendar_id}`,
                method: 'GET',
                //body: data
            }),
            providesTags: ['Employee'],
        }),
        
        // reviewer accepts appraiser after employee rejection
        acceptReviewerEmployeeRejection: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/accept-reviewer-employeeRejection`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Employee'],
        }),
        getEmployeeUnmappedLength: builder.mutation<any, any>({
            query: (id) => ({
              url: `${APPRAISAL_URL}/unmapped-data-length/${id}`,
              method: 'GET',
              //body: id,
             
            }),
            invalidatesTags : ['Employee'],
        }),
        updateEmployeeRoles: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_URL}/updateEmployeeRoles`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),
    })
})


export const {
    useGetEmployeeAppraisalQuery,
    useGetEmployeeDetailsQuery,
    useCreateEmployeeAppraisalMutation,
    useUpdateEmployeeAppraisalMutation,
    useStartEmployeeAppraisalMutation,
    useAcceptReviewerMutation,
    useAcceptReviewerRatingsMutation,
    useAcceptNormalizerMutation,
    useAcceptAppraisalEmployeeMutation,
    useRejectReviewerAppraisalEmployeeMutation,
    useRejectNormalizerAppraisalEmployeeMutation,
    useReviewerRejectionMutation,
    useNormalizerRejectionMutation,
    useAppraiserAcceptReviewerMutation,
    useAppraiserAcceptNormalizerMutation,
    useEmployeeRejectionMutation,
    useNormalizerAcceptEmployeeMutation,
    useNormalizerRejectEmployeeMutation,
    useEmployeeRejectSaveMutation,
    useAppraiserAcceptsEmployeeMutation,
    useAppraiserRejectsEmployeeMutation,
    useNormalizerSubmitEmployeeRejectionMutation,
    useAttachmentsAppraiserMutation,
    useAttachmentsAppraiserOverviewMutation,
    useCalculateRatingsMutation,
    useAttachmentsReviewerMutation,
    useAttachmentsNormalizerMutation,
    useAttachmentsEmployeeMutation,
    useGetEmployeeByManagerCodeQuery,
    useAttachmentsAppraiserDeleteMutation,
    useAttachmentsAppraiserOverviewDeleteMutation,
    useAttachmentsReviewerDeleteMutation,
    useAttachmentsNormalizerDeleteMutation,
    useAttachmentsEmployeeDeleteMutation,
    useMeetingNotesAttachmentsNormalizerMutation,
    useAcceptNormalizerGradeExceptionMutation,
    useAcceptEmployeeGradeExceptionMutation,
    useAttachmentsRejectionAppraiserMutation,
    useAttachmentsRejectionAppraiserDeleteMutation,
    useAppraiserAcceptsReviewerRatingMutation,
    useReviewerAcceptsAppraiserRatingMutation,
    useAppraiserAcceptsEmployeeRatingMutation,
    useEmployeeAcceptsAppraiserRatingMutation,
    useAcceptEmployeeRoleExceptionsMutation,
    useAcceptEmployeeRoleExceptionsDraftMutation,
    useGetlineManagerEmployeeQuery,
    useGetlineManagerPlusOneEmployeeQuery,
    useAcceptReviewerEmployeeRejectionMutation,
    useAcceptEmployeeCEORoleMutation,
    useAcceptEmployeeExcludedMutation,
    useAcceptEmployeeLeaversMutation,
    useAcceptEmployeeLeaversDraftMutation,
    useGetEmployeeUnmappedLengthMutation,
    useAcceptEmployeeNamesChangeMutation,
    useAcceptEmployeeNamesChangeDraftMutation,
    useRemovesMultipleEmployeeFromRoleExceptionMutation,
    useUpdateEmployeeRolesMutation,   
    useGetEmployeeAppraisalForViewPAQuery,
    useAcceptNormalizerGradeExceptionBulkMutation,
    useMeetingNotesDeleteAttachmentsNormalizerMutation
} = appraisalApi
