import {pmsApi} from "../root";

const PREVIOUS_URL = `/api/v1/previous-appraisal`

const apiWithTag = pmsApi.enhanceEndpoints({addTagTypes: ['PreviousAppraisal']})
const previousApi = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        // Create Template
       
        getPreviousAppraisalEmployeeByFilter: builder.query<any, any>({
            query: (query) => ({
                url: `${PREVIOUS_URL}/filter/${query}`,
                method: 'GET',
            }),
            providesTags : ['PreviousAppraisal'],
        }),
        addEmployeestoPreviousAppraisal: builder.mutation<any, any>({
            query: (data) => ({
                url: `${PREVIOUS_URL}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags : ['PreviousAppraisal'],
        }),
        getpastAppraisalDetailsofEmployee: builder.query<any, any>({
            query: (id) => ({
                url: `${PREVIOUS_URL}/pastappraisalemployee/${id}`,
                method: 'GET',
            }),
            providesTags : ['PreviousAppraisal'],
        }),

        // based on employee code and calendarId
        getPreviousAppraisalEmployee: builder.query<any, any>({
            query: (args) => {
                const { employeeCode, calendarId } = args;
                return {
                    url: `${PREVIOUS_URL}/previousAppraisalEmployee/${employeeCode}/${calendarId}`,                                        
                }},
                providesTags: ['PreviousAppraisal']
                }),

        // get employee details of previous calendar based on calendarId
        getEmployeeDetailsPrevious: builder.query<any, any>({
            query: (args) => {
                const {calendarId} = args;
                return {
                    url: `${PREVIOUS_URL}/employeeDetails/${calendarId}`,                                        
                }},
                providesTags: ['PreviousAppraisal']
                }),

          // get employee details of previous calendar based on employe ecode       
        getEmployeeDetailsWithEmpCode: builder.query<any, any>({
            query: (args) => {
                const {employeeCode} = args;
                return {
                    url: `${PREVIOUS_URL}/PA_details_employee_code/${employeeCode}`,                                        
                }},
                providesTags: ['PreviousAppraisal']
                }),
    })
})

export const {
    useGetPreviousAppraisalEmployeeByFilterQuery,
    useAddEmployeestoPreviousAppraisalMutation,
    useGetpastAppraisalDetailsofEmployeeQuery,
    useGetPreviousAppraisalEmployeeQuery,
    useGetEmployeeDetailsPreviousQuery,
    useGetEmployeeDetailsWithEmpCodeQuery
} = previousApi