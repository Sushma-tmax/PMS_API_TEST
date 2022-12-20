import {pmsApi} from "../root";

const EMPLOYEE_URL = `/api/v1/employee`

const apiWithTag = pmsApi.enhanceEndpoints({addTagTypes: ['Employee']})
const employeeApi = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        // Create Template
        getEmployee: builder.query<any, any>({
            query: (status) => ({
                url: `${EMPLOYEE_URL}/filter/${status}`,
                method: 'GET',
            }),
            providesTags : ['Employee'],
        }),

        getAllNormalizerStatus: builder.query<any, any>({
            query: (status) => ({
                url: `${EMPLOYEE_URL}/normalizer-status/${status}`,
                method: 'GET',
            }),
            providesTags : ['Employee'],
        }),

        getAllAppraiserStatus: builder.query<any, any>({
            query: (status) => ({
                url: `${EMPLOYEE_URL}/appraiser-status/${status}`,
                method: 'GET',
                // body:{status:"submitted"},
            }),
            providesTags : ['Employee'],
        }),

        getAllReviewerStatus: builder.query<any, any>({
            query: (status) => ({
                url: `${EMPLOYEE_URL}/reviewer-status/${status}`,
                method: 'GET',
            }),
            providesTags : ['Employee'],
        }),

        getEmployeeByStatus: builder.query<any, any>({
            query: (status) => ({
                url: `${EMPLOYEE_URL}filter/${status}`,
                method: 'GET',
            }),
        }),
        getEmployeeByFilter: builder.query<any, any>({
            query: (query) => ({
                url: `${EMPLOYEE_URL}/employee-filter/${query}`,
                method: 'GET',
            }),
            providesTags : ['Employee'],
        }),
        getEmployeeUnmapped: builder.query<any, any>({
            query: (id) => ({
                url: `${EMPLOYEE_URL}/unmapped-data/${id}`,
                method: 'GET',
            }),
            providesTags : ['Employee'],
        }),
        getReviewerEmployeeByFilter: builder.query<any, any>({
            query: (id) => ({
                url: `${EMPLOYEE_URL}/reviewer-employee/${id}`,
                method: 'GET',
            }),
        }),
    })
})


export const {useGetEmployeeQuery,
    useGetEmployeeByStatusQuery,
    useGetAllAppraiserStatusQuery,
    useGetAllNormalizerStatusQuery,
    useGetAllReviewerStatusQuery,
    useGetEmployeeByFilterQuery,
    useGetEmployeeUnmappedQuery,
    useGetReviewerEmployeeByFilterQuery
} = employeeApi
