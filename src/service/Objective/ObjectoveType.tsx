import {pmsApi} from "../root";

const OBJECTIVE_TYPE_URL = `/api/v1/objective/objective-type`


const apiWithTag = pmsApi.enhanceEndpoints({addTagTypes: ['ObjectiveType']})
const objectiveTypeApi = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        getObjectiveType: builder.query<any, any>({
            query: () => ({
            url:    OBJECTIVE_TYPE_URL
            }),
            providesTags : ['ObjectiveType']
        }), 
       
        createObjectiveType: builder.mutation<any, any>({
            query: (objectiveType) => ({
                url: OBJECTIVE_TYPE_URL,
                method: 'POST',
                body: objectiveType
            }),
            invalidatesTags : ['ObjectiveType']
        }),
        updateObjectiveType: builder.mutation<any, any>({
            query: (objectiveType) => ({
                url: `${OBJECTIVE_TYPE_URL}/${objectiveType.id}`,
                method: 'PATCH',
                body: objectiveType
            }),
            invalidatesTags : ['ObjectiveType']
        }),
        deleteObjectiveType: builder.mutation<any, any>({
            query: (objectiveTypeId) => ({
                url: `${OBJECTIVE_TYPE_URL}/${objectiveTypeId}`,
                method: 'DELETE',
            }),
            invalidatesTags : ['ObjectiveType']
        }),
        editObjectiveType: builder.mutation<any, any>({
            query: (data) => ({
                url: `${OBJECTIVE_TYPE_URL}/edit`,
                method: 'POST',
                body: data
            }),
            invalidatesTags : ['ObjectiveType']
        })
    })
})


export const {
    useCreateObjectiveTypeMutation,
    useGetObjectiveTypeQuery,
    useDeleteObjectiveTypeMutation,
    useUpdateObjectiveTypeMutation,
    useEditObjectiveTypeMutation
} = objectiveTypeApi
