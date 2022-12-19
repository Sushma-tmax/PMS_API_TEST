import {pmsApi} from "../root";

const CALENDER_URL = `/api/v1/calender`

const apiWithTag = pmsApi.enhanceEndpoints({addTagTypes: ['Calender']})
const calenderApi = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({


        getCalender: builder.query<any, any>({
            query: () => ({
                url: `${CALENDER_URL}`,
                method: 'GET',
            }),
            providesTags: ['Calender'],
        }),
        getSingleCalender: builder.query<any, any>({
            query: (id) => ({
                url: `${CALENDER_URL}/${id}`,

            }),
            providesTags: ['Calender'],
        }),
        createCalender: builder.mutation<any, any>({
            query: (data) => ({
                url: `${CALENDER_URL}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Calender'],
        }),
        deleteCalender: builder.mutation<any, any>({
            query: (id) => ({
                url: `${CALENDER_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Calender'],
        }),
        updateCalendar: builder.mutation<any, any>({
            query: (data) => ({
                url: `${CALENDER_URL}/${data.id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ['Calender']
        }),
    })

})

export const {
    useGetCalenderQuery,
    useCreateCalenderMutation,
    useDeleteCalenderMutation,
    useUpdateCalendarMutation,
    useGetSingleCalenderQuery
} = calenderApi