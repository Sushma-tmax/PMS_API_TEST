import {pmsApi} from "../root";

const BULK_URL = '/api/v1/bulk'

const apiWithTag = pmsApi.enhanceEndpoints({addTagTypes: ['bulkUpload']})
const bulkemployeeApi = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        // Create Template
        updateEmployeeinBulk: builder.mutation<any, any>({
            query: (data) => ({
                url: `${BULK_URL}/update`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags : ['bulkUpload'],
        }),

        updateClearEmployee: builder.mutation<any, any>({
            query: (data) => ({
                url: `${BULK_URL}/clearEmployeeMaster`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags : ['bulkUpload'],
        }),
    })
})

export const {
    useUpdateEmployeeinBulkMutation,
    useUpdateClearEmployeeMutation,
} = bulkemployeeApi