import { pmsApi } from "../root";

const OBJECTIVE_DESCRIPTION_URL = `/api/v1/objective/objective-description`

const apiWithTag = pmsApi.enhanceEndpoints({ addTagTypes: ['ObjectiveDescription'] })
const objectiveDescriptionApi = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({

        // Objective Description
        deleteObjectiveDescription: builder.mutation<any, any>({
            query: (objectiveGroup: any) => ({
                url: `${OBJECTIVE_DESCRIPTION_URL}/${objectiveGroup}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ObjectiveDescription']
        }),
        createObjectiveDescription: builder.mutation<any, any>({
            query: (objectiveGroup) => ({
                url: OBJECTIVE_DESCRIPTION_URL,
                method: 'POST',
                body: objectiveGroup
            }),
            invalidatesTags: ['ObjectiveDescription']
        }),
        updateObjectiveDescription: builder.mutation<any, any>({
            query: (id) => ({
                url: `${OBJECTIVE_DESCRIPTION_URL}/${id.id}`,
                method: 'PATCH',
                body: id
            }),
            invalidatesTags: ['ObjectiveDescription']
        }),
        getObjectiveDescription: builder.query<any, any>({
            query: () => ({
                url: OBJECTIVE_DESCRIPTION_URL
            }),
            providesTags: ['ObjectiveDescription'],
        }),
        getSingleObjectiveDescription: builder.query<any, any>({
            query: (id) => ({
                url: `${OBJECTIVE_DESCRIPTION_URL}/${id}`
            }),

            providesTags: ['ObjectiveDescription']
        })
    })

})

export const {
    useDeleteObjectiveDescriptionMutation,
    useCreateObjectiveDescriptionMutation,
    useUpdateObjectiveDescriptionMutation,
    useGetObjectiveDescriptionQuery,
    useGetSingleObjectiveDescriptionQuery


} = objectiveDescriptionApi