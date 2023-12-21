import {pmsApi} from "../root";

const TRAINING_RECOMMENDATION_URL = `api/v1/training/training-recommendation`
const OTHER_RECOMMENDATION_URL = `api/v1/training/other-recommendation`

const apiWithTag = pmsApi.enhanceEndpoints({addTagTypes: ['TrainingRecommendation','OtherRecommendation']})


const recommendationApi = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({

        getTrainingRecommendation: builder.query<any, any>({
            query: () => ({
                url: TRAINING_RECOMMENDATION_URL
            }),
            providesTags : ['TrainingRecommendation'],
        }),

        createTrainingRecommendation: builder.mutation<any, any>({
            query: (data) => ({
                url: TRAINING_RECOMMENDATION_URL,
                method: "POST",
                body: data
            }),
            invalidatesTags : ['TrainingRecommendation'],
        }),

        deleteTrainingRecommendation: builder.mutation<any, any>({
            query: (id) => ({
                url: `${TRAINING_RECOMMENDATION_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags : ['TrainingRecommendation']
        }),

        updateTrainingRecommendation: builder.mutation<any, any>({
            query: (data) => ({
                url: `${TRAINING_RECOMMENDATION_URL}/${data.id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags : ['TrainingRecommendation']
        }),

        getSingleTrainingRecommendation: builder.query<any, any>({
            query: (id) => ({
                url: `${TRAINING_RECOMMENDATION_URL}/${id}`
            }),
            providesTags : ['TrainingRecommendation'],
        }),


        getOtherRecommendation: builder.query<any, any>({
            query: () => ({
                url: OTHER_RECOMMENDATION_URL
            }),
            providesTags : ['OtherRecommendation']
        }),

        getSingleOtherRecommendation: builder.query<any, any>({
            query: (id) => ({
                url: `${OTHER_RECOMMENDATION_URL}/${id}`
            }),
            providesTags : ['OtherRecommendation']
        }),

        createOtherRecommendation: builder.mutation<any, any>({
            query: (data) => ({
                url: OTHER_RECOMMENDATION_URL,
                method: "POST",
                body: data
            }),
             invalidatesTags : ['OtherRecommendation']
        }),

        deleteOtherRecommendation: builder.mutation<any, any>({
            query: (id) => ({
                url: `${OTHER_RECOMMENDATION_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags : ['OtherRecommendation']
        }),

        editOtherRecommendation: builder.mutation<any, any>({
            query: (data) => ({
                url: `${OTHER_RECOMMENDATION_URL}/${data.id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags : ['OtherRecommendation']
        }),


    })
})

export const {
    useGetOtherRecommendationQuery,
    useCreateOtherRecommendationMutation,
    useDeleteOtherRecommendationMutation,
    useEditOtherRecommendationMutation,
    useCreateTrainingRecommendationMutation,
    useDeleteTrainingRecommendationMutation,
    useGetTrainingRecommendationQuery,
    useGetSingleOtherRecommendationQuery,
    useUpdateTrainingRecommendationMutation,
    useGetSingleTrainingRecommendationQuery
} = recommendationApi