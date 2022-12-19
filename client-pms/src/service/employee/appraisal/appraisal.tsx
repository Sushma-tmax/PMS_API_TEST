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
    })
})


export const {
    useGetEmployeeAppraisalQuery,
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
    useAttachmentsEmployeeDeleteMutation
} = appraisalApi
