import { pmsApi } from "../root";

const EMPLOYEE_URL = `/api/v1/employee`

const apiWithTag = pmsApi.enhanceEndpoints({ addTagTypes: ['Employee'] })
const employeeApi = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        // Create Template
        getEmployee: builder.query<any, any>({
            query: (status) => ({
                url: `${EMPLOYEE_URL}/filter/${status}`,
                method: 'GET',
            }),
            providesTags: ['Employee'],
        }),

        getAllNormalizerStatus: builder.query<any, any>({
            query: (status) => ({
                url: `${EMPLOYEE_URL}/normalizer-status/${status}`,
                method: 'GET',
            }),
            providesTags: ['Employee'],
        }),

        getAllAppraiserStatus: builder.query<any, any>({
            query: (status) => ({
                url: `${EMPLOYEE_URL}/appraiser-status/${status}`,
                method: 'GET',
                // body:{status:"submitted"},
            }),
            providesTags: ['Employee'],
        }),

        getAllReviewerStatus: builder.query<any, any>({
            query: (status) => ({
                url: `${EMPLOYEE_URL}/reviewer-status/${status}`,
                method: 'GET',
            }),
            providesTags: ['Employee'],
        }),

        getEmployeeByStatus: builder.query<any, any>({
            query: (status) => ({
                url: `${EMPLOYEE_URL}filter/${status}`,
                method: 'GET',
            }),
        }),
        getAllPAEmployees: builder.query<any, any>({
            query: (status) => ({
                url: `${EMPLOYEE_URL}/allpaemployees/${status}`,
                method: 'GET',
            }),
        }),
        getEmployeeByFilter: builder.query<any, any>({
            query: (query) => ({
                url: `${EMPLOYEE_URL}/employee-filter/${query}`,
                method: 'GET',
            }),
            providesTags: ['Employee'],
        }),
        getAppraiserDetails: builder.query<any, any>({
            query: () => ({
                url: `${EMPLOYEE_URL}/totalAppraiserDetails`,
                method: 'GET',
                //body: data
            }),
            providesTags: ['Employee'],
        }),
        getReviewerDetails: builder.query<any, any>({
            query: () => ({
                url: `${EMPLOYEE_URL}/totalReviewerDetails`,
                method: 'GET',
                //body: data
            }),
            providesTags: ['Employee'],
        }),
        getNormalizerDetails: builder.query<any, any>({
            query: () => ({
                url: `${EMPLOYEE_URL}/totalNormalizerDetails`,
                method: 'GET',
                //body: data
            }),
            providesTags: ['Employee'],
        }),
        getEmployeeUnmapped: builder.query<any, any>({
            query: (id) => ({
                url: `${EMPLOYEE_URL}/unmapped-data/${id}`,
                method: 'GET',
            }),
            providesTags: ['Employee'],
        }),
        getEmployeeMapped: builder.query<any, any>({
            query: (id) => ({
                url: `${EMPLOYEE_URL}/mappedEmployees`,
                method: 'GET',
            }),
            providesTags: ['Employee'],
        }),
        addEmployeestoPrevioisAppraisal: builder.mutation<any, any>({
            query: (data) => ({
                url: `${EMPLOYEE_URL}/prevvvvv`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Employee'],
        }),
        getReviewerEmployeeByFilter: builder.query<any, any>({
            query: (id) => ({
                url: `${EMPLOYEE_URL}/reviewer-employee/${id}`,
                method: 'GET',
            }),
        }),
        getEmployeeEmails: builder.query<any, any>({
            query: (id) => ({
                url: `${EMPLOYEE_URL}/calendarEmployeeEmails/${id}`,
                method: 'GET',
            }),
        }),
        checkRoleLogs: builder.mutation<any, any>({
            // query: (data) => ({                
            query: (data) => ({                
                url: `${EMPLOYEE_URL}/logged-by/details/${data.id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Employee'],
        }),
    })
})


export const { useGetEmployeeQuery,
    useGetEmployeeByStatusQuery,
    useGetAllAppraiserStatusQuery,
    useGetAllNormalizerStatusQuery,
    useGetAllReviewerStatusQuery,
    useGetEmployeeByFilterQuery,
    useGetEmployeeUnmappedQuery,
    useGetReviewerEmployeeByFilterQuery,
    useGetEmployeeMappedQuery,
    useGetAllPAEmployeesQuery,
    useAddEmployeestoPrevioisAppraisalMutation,
    useGetEmployeeEmailsQuery,
    useGetAppraiserDetailsQuery,
    useGetReviewerDetailsQuery,
    useGetNormalizerDetailsQuery,
    useCheckRoleLogsMutation
} = employeeApi
