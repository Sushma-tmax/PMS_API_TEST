import { pmsApi } from "../root";

const FEEDBACK_QUESTIONNAIRE_URL = `/api/v1/feedback-questionarie`

const apiWithTag = pmsApi.enhanceEndpoints({ addTagTypes: ['FeedBack'] })
const feedbackQuestionnaireApi = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        // Create Template

        getFeedBack: builder.query<any, any>({
            query: () => ({
                url: `${FEEDBACK_QUESTIONNAIRE_URL}`,
                method: 'GET',
            }),
            providesTags: ['FeedBack'],
        }),
        getSingleFeedBack: builder.query<any, any>({
            query: (id) => ({
                url: `${FEEDBACK_QUESTIONNAIRE_URL}/${id}`,
               
            }),
            providesTags: ['FeedBack'],
        }),
        createFeedBack: builder.mutation<any, any>({
            query: (data) => ({
                url: FEEDBACK_QUESTIONNAIRE_URL,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['FeedBack'],
        }),
        deleteFeedBack: builder.mutation<any, any>({
            query: (id) => ({
                url: `${FEEDBACK_QUESTIONNAIRE_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['FeedBack']
        }),

        updateFeedBack: builder.mutation<any, any>({
            query: (data) => ({
                url: `${FEEDBACK_QUESTIONNAIRE_URL}/${data.id}`,
                method: "PATCH",
                body:data
            }),
            invalidatesTags: ['FeedBack']
        }),
    })
})


export const { useGetFeedBackQuery,
    useCreateFeedBackMutation,
    useDeleteFeedBackMutation,
useUpdateFeedBackMutation,
useGetSingleFeedBackQuery } = feedbackQuestionnaireApi