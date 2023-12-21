import {pmsApi} from "../root";

const OBJECTIVE_TYPE_URL = `/api/v1/objective/objective-title`


const apiWithTag = pmsApi.enhanceEndpoints({addTagTypes: ['ObjectiveTitle']})
const objectiveTypeApi = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        getObjectiveTitle: builder.query<any, any>({
            query: () => ({
                url:    OBJECTIVE_TYPE_URL
            }),
            providesTags : ['ObjectiveTitle']
        }),

        createObjectiveTitle: builder.mutation<any, any>({
            query: (objectiveType) => ({
                url: OBJECTIVE_TYPE_URL,
                method: 'POST',
                body: objectiveType
            }),
            invalidatesTags : ['ObjectiveTitle']
        }),
        updateObjectiveTitle: builder.mutation<any, any>({
            query: (objectiveType) => ({
                url: `${OBJECTIVE_TYPE_URL}/${objectiveType.id}`,
                method: 'PATCH',
                body: objectiveType
            }),
            invalidatesTags : ['ObjectiveTitle']
        }),
        deleteObjectiveTitle: builder.mutation<any, any>({
            query: (objectiveTypeId) => ({
                url: `${OBJECTIVE_TYPE_URL}/${objectiveTypeId}`,
                method: 'DELETE',
            }),
            invalidatesTags : ['ObjectiveTitle']
        })
    })
})


export const {
    useGetObjectiveTitleQuery,
    useCreateObjectiveTitleMutation,
    useUpdateObjectiveTitleMutation,
    useDeleteObjectiveTitleMutation
} = objectiveTypeApi
