import {pmsApi} from "../root";

const OBJECTIVE_GROUP_URL = `/api/v1/objective/objective-group`

const apiWithTag = pmsApi.enhanceEndpoints({addTagTypes: ['ObjectiveGroup']})
const objectiveGroupApi = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({

        // Objective Group
        deleteObjectiveGroup: builder.mutation<any, any>({
            query: (objectiveGroup: any) => ({
                url: `${OBJECTIVE_GROUP_URL}/${objectiveGroup.id}`,
                method: 'DELETE',
            }),
            invalidatesTags : ['ObjectiveGroup']
        }),
        createObjectiveGroup: builder.mutation<any, any>({
            query: (objectiveGroup) => ({
                url: OBJECTIVE_GROUP_URL,
                method: 'POST',
                body: objectiveGroup
            }),
            invalidatesTags : ['ObjectiveGroup']
        }),
        updateObjectiveGroup: builder.mutation<any, any>({
            query: (data) => ({
                url: `${OBJECTIVE_GROUP_URL}/${data.id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags : ['ObjectiveGroup']
        }),

        getObjectiveGroup: builder.query<any, any>({
            query: () =>({
            url :    `${OBJECTIVE_GROUP_URL}`,
            }) ,
            providesTags : ['ObjectiveGroup']
        }),
             
    })
})

export const { useDeleteObjectiveGroupMutation,useCreateObjectiveGroupMutation, useGetObjectiveGroupQuery,useUpdateObjectiveGroupMutation } = objectiveGroupApi