import {pmsApi} from "../root";

const CONFIRMVAL_URL = '/api/v1/validations'

const apiWithTag = pmsApi.enhanceEndpoints({addTagTypes: ['confirmValidation']})
const employeeApi = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        // Create Template
        getConfirmValidation: builder.query<any, any>({
            query: () => ({
                url: `${CONFIRMVAL_URL}/ConfirmValidations`,
                method: 'GET',
            }),
            providesTags : ['confirmValidation'],
        }),
        updateConfirmValidation: builder.mutation<any, any>({
            query: (data) => ({
                url: `${CONFIRMVAL_URL}/updateValidations/${data.id}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags : ['confirmValidation'],
        }),
        getReminderActiveValue: builder.query<any, any>({
            query: () => ({
                url: `${CONFIRMVAL_URL}/reminderNotificationStatus`,
                method: 'GET',
            }),
            providesTags : ['confirmValidation'],
        }),
        updateReminderActiveValue: builder.mutation<any, any>({
            query: (data) => ({
                url: `${CONFIRMVAL_URL}/reminderNotificationStatusUpdate/${data.id}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags : ['confirmValidation'],
        }),
     
    })
})


export const {
    useGetConfirmValidationQuery,
    useUpdateConfirmValidationMutation,
    useGetReminderActiveValueQuery,
    useUpdateReminderActiveValueMutation
} = employeeApi
