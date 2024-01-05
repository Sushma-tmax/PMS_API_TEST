import { pmsApi } from "../root"


const EMAIL_URL = `/api/v1/email`


const apiWithTag = pmsApi.enhanceEndpoints({ addTagTypes: ['Email'] })

const emailApi = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        // Create Template

        sendEmailNotification: builder.mutation<any, any>({
            query: (data) => ({
                url: `${EMAIL_URL}/send-email`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Email'],
        }),

        getEmailIds: builder.query<any, any>({
            query: (args) => {
                const { appraiser_code, reviewer_code, normalizer_code } = args;
                return {
                    url: `${EMAIL_URL}/email/${appraiser_code}/${reviewer_code}/${normalizer_code}`,
                }
            },
            providesTags: ['Email']
        }),

        getEmailIdsBulk: builder.mutation<any, any>({
            query: (data) => ({
                url: `${EMAIL_URL}/email-bulk`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Email'],
        }),
    })
})


export const {
    useSendEmailNotificationMutation,
    useGetEmailIdsQuery,
    useGetEmailIdsBulkMutation
} = emailApi
