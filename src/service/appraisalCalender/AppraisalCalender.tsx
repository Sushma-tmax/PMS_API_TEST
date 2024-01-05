import {pmsApi} from "../root";

const APPRAISAL_CALENDER_URL = `/api/v1/appraisal-calender`

const apiWithTag = pmsApi.enhanceEndpoints({addTagTypes: ['AppraisalCalender']})
const calenderApi = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({


        getAppraisalCalender: builder.query<any, any>({
            query: () => ({
                url: `${APPRAISAL_CALENDER_URL}`,
                method: 'GET',
            }),
            providesTags: ['AppraisalCalender'],
        }),
        getRecentAppraisalCalender: builder.query<any, any>({
            query: () => ({
                url: `${APPRAISAL_CALENDER_URL}/recent`,
                method: 'GET',
            }),
            providesTags: ['AppraisalCalender'],
        }),
        getCurrentAppraisalCalender: builder.query<any, any>({
            query: () => ({
                url: `${APPRAISAL_CALENDER_URL}/current-year-calendar`,
                method: 'GET',
            }),
            providesTags: ['AppraisalCalender'],
        }),
        appraisalCalenderFilters: builder.query<any, any>({
            query: (query) => ({
                url: `${APPRAISAL_CALENDER_URL}/filter/${query}`,
                method: 'GET',
            }),
            providesTags: ['AppraisalCalender'],
        }),
        getSiAppraisalCalender: builder.query<any, any>({
            query: (id) => ({
                url: `${APPRAISAL_CALENDER_URL}/${id}`,

            }),
            providesTags: ['AppraisalCalender'],
        }),
        createAppraisalCalender: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_CALENDER_URL}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['AppraisalCalender'],
        }),
        deleteAppraisalCalender: builder.mutation<any, any>({
            query: (id) => ({
                url: `${APPRAISAL_CALENDER_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['AppraisalCalender'],
        }),
        startAppraisalCalender: builder.mutation<any, any>({
            query: (id) => ({
                url: `${APPRAISAL_CALENDER_URL}/start/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['AppraisalCalender'],
        }),
        updateAppraisalCalender: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_CALENDER_URL}/${data.id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ['AppraisalCalender']
        }),
        addEmpolyeAppraisalCalender: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_CALENDER_URL}/employee/${data.id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ['AppraisalCalender']
        }),
        removeEmpolyeAppraisalCalender: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_CALENDER_URL}/remove-employee/${data.id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ['AppraisalCalender']
        }),
        appraisalCalendarLaunchValidation: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_CALENDER_URL}/remove-employee/${data.id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ['AppraisalCalender']
        }),
        appraisalCalendarEmployeeValidation: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_CALENDER_URL}/validation/${data.id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ['AppraisalCalender']
        }),
        appraisalCalendarByTemplate: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_CALENDER_URL}/calendar-by-template`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['AppraisalCalender']
        }),
        appraisalCalendarClose: builder.mutation<any, any>({
            query: (data) => ({
                url: `${APPRAISAL_CALENDER_URL}/close`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ['AppraisalCalender']
        })
        
    })

})

export const {
    useGetAppraisalCalenderQuery,
    useGetSiAppraisalCalenderQuery,
    useGetCurrentAppraisalCalenderQuery,
    useGetRecentAppraisalCalenderQuery,
    useCreateAppraisalCalenderMutation,
    useDeleteAppraisalCalenderMutation,
    useUpdateAppraisalCalenderMutation,
    useStartAppraisalCalenderMutation,
    useAddEmpolyeAppraisalCalenderMutation,
    useRemoveEmpolyeAppraisalCalenderMutation,
    useAppraisalCalenderFiltersQuery,
    useAppraisalCalendarLaunchValidationMutation,
    useAppraisalCalendarEmployeeValidationMutation,
    useAppraisalCalendarByTemplateMutation,
    useAppraisalCalendarCloseMutation
} = calenderApi