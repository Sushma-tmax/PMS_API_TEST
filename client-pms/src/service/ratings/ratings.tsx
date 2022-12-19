// import {pmsApi} from "../root";
//
// const RATINGS = `api/v1/ratings`
// const RATING_SCALE_DESCRIPTION = `api/v1/ratingscale`
//
// const apiWithTag = pmsApi.enhanceEndpoints({addTagTypes: ['Rating','RatingScale']})
//
//
// const ratingsApi = apiWithTag.injectEndpoints({
//     endpoints: (builder) => ({
//
//         getRatings: builder.query<any, any>({
//             query: () => ({
//                 url: RATINGS
//
//             }),
//             providesTags : [ 'Rating'],
//         }),
//
//         createRatings: builder.mutation<any, any>({
//             query: (data) => ({
//                 url: RATINGS,
//                 method: "POST",
//                 body: data
//             }),
//            invalidatesTags : [ 'Rating'],
//         }),
//
//         deleteRatings: builder.mutation<any, any>({
//             query: (id) => ({
//                 url: `${RATINGS}/${id}`,
//                 method: "DELETE"
//             }),
//             invalidatesTags : [ 'Rating'],
//         }),
//
//         updateRating: builder.mutation<any, any>({
//             query: (data) => ({
//                 url: `${RATINGS}/${data.id}`,
//                 method: "PATCH",
//                 body: data
//             }),
//             invalidatesTags : [ 'Rating'],
//         }),
//
//         getSingleRating: builder.query<any, any>({
//             query: (id) => ({
//                 url: `${RATINGS}/${id}`
//             }),
//             providesTags : [ 'Rating'],
//         }),
//
//         getRatingScale: builder.query<any, any>({
//             query: () => ({
//                 url: RATING_SCALE_DESCRIPTION
//             }),
//             providesTags : [ 'RatingScale'],
//         }),
//
//         createRatingScale: builder.mutation<any,any>({
//             query: (data) => ({
//                 url: RATING_SCALE_DESCRIPTION,
//                 method : "POST",
//                 body : data
//             }),
//             invalidatesTags : [ 'RatingScale'],
//         }),
//
//         deleteRatingScale: builder.mutation<any,any>({
//             query: (id) => ({
//                 url: `${RATING_SCALE_DESCRIPTION}/${id}`,
//                 method : "DELETE"
//             }),
//             invalidatesTags : [ 'RatingScale'],
//         }),
//
//         updateRatingScale: builder.mutation<any, any>({
//             query: (data) => ({
//                 url: `${RATING_SCALE_DESCRIPTION}/${data.id}`,
//                 method: "PATCH",
//                 body: data
//             }),
//             invalidatesTags : [ 'RatingScale'],
//         }),
//
//         getSingleRatingScale: builder.mutation<any, any>({
//             query: (id) => ({
//                 url: `${RATING_SCALE_DESCRIPTION}/${id}`,
//             }),
//             providesTags:['RatingScale'],
//         }),
//         addRatingScaleValidation: builder.query<any, any>({
//             query: (id) => ({
//                 url: `/api/v1/rating-validation`,
//                 body: id,
//                 method: "POST"
//
//             }),
//             providesTags : [ 'RatingScale'],
//         }),
//     }),
//
//
//
// })
//
// export const {
//     useCreateRatingsMutation,
//     useDeleteRatingsMutation,
//     useGetRatingsQuery,
//     useGetSingleRatingQuery,
//     useGetRatingScaleQuery,
//     useUpdateRatingMutation,
//     useCreateRatingScaleMutation,
//     useDeleteRatingScaleMutation,
//     useUpdateRatingScaleMutation,
//     useGetSingleRatingScaleQuery,
//     useAddRatingScaleValidationMutation
// } = ratingsApi

import {pmsApi} from "../root";

const RATINGS = `api/v1/ratings`
const RATING_SCALE_DESCRIPTION = `api/v1/ratingscale`

const apiWithTag = pmsApi.enhanceEndpoints({addTagTypes: ['Rating','RatingScale']})


const ratingsApi = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({

        getRatings: builder.query<any, any>({
            query: () => ({
                url: RATINGS

            }),
            providesTags : [ 'Rating'],
        }),

        createRatings: builder.mutation<any, any>({
            query: (data) => ({
                url: RATINGS,
                method: "POST",
                body: data
            }),
            invalidatesTags : [ 'Rating'],
        }),

        deleteRatings: builder.mutation<any, any>({
            query: (id) => ({
                url: `${RATINGS}/${id}`,
                method: "DELETE"
            }),
            invalidatesTags : [ 'Rating'],
        }),

        updateRating: builder.mutation<any, any>({
            query: (data) => ({
                url: `${RATINGS}/${data.id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags : [ 'Rating'],
        }),

        getSingleRating: builder.query<any, any>({
            query: (id) => ({
                url: `${RATINGS}/${id}`
            }),
            providesTags : [ 'Rating'],
        }),

        getRatingScale: builder.query<any, any>({
            query: () => ({
                url: RATING_SCALE_DESCRIPTION
            }),
            providesTags : [ 'RatingScale'],
        }),

        createRatingScale: builder.mutation<any,any>({
            query: (data) => ({
                url: RATING_SCALE_DESCRIPTION,
                method : "POST",
                body : data
            }),
            invalidatesTags : [ 'RatingScale'],
        }),

        deleteRatingScale: builder.mutation<any,any>({
            query: (id) => ({
                url: `${RATING_SCALE_DESCRIPTION}/${id}`,
                method : "DELETE"
            }),
            invalidatesTags : [ 'RatingScale'],
        }),

        updateRatingScale: builder.mutation<any, any>({
            query: (data) => ({
                url: `${RATING_SCALE_DESCRIPTION}/${data.id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags : [ 'RatingScale'],
        }),

        getSingleRatingScale: builder.query<any, any>({
            query: (id) => ({
                url: `${RATING_SCALE_DESCRIPTION}/${id}`
            }),
            providesTags : [ 'RatingScale'],
        }),
        addRatingScaleValidation: builder.mutation<any, any>({
            query: (id) => ({
                url: `/api/v1/rating-validation`,
                body: id,
                method: "POST"

            }),
            invalidatesTags : [ 'RatingScale'],
        }),
    }),



})

export const {
    useCreateRatingsMutation,
    useDeleteRatingsMutation,
    useGetRatingsQuery,
    useGetSingleRatingQuery,
    useGetRatingScaleQuery,
    useUpdateRatingMutation,
    useCreateRatingScaleMutation,
    useDeleteRatingScaleMutation,
    useUpdateRatingScaleMutation,
    useGetSingleRatingScaleQuery,
    useAddRatingScaleValidationMutation
} = ratingsApi
