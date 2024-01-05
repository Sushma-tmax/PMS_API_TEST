import {pmsApi} from "../root";


const ReminderNotification_URL = `/api/v1/reminderNotification`


const apiWithTag = pmsApi.enhanceEndpoints({addTagTypes: ['reminderNotification']})

const reminderNotificationApi = apiWithTag.injectEndpoints({
    endpoints: (builder:any) => ({
        //@ts-ignore
        getReminderNotificationData: builder.query<any, any>({
            query: (data:any) => ({
                url: `${ReminderNotification_URL}/ReminderNotificationFunctionData/${data}`,
                method: 'GET',
                //body: data
            }),
            providesTags: ['reminderNotification'],
        }), 
         //@ts-ignore
        updateReminderNotificationData: builder.mutation<any, any>({
            query: (data:any) => ({
                url: `${ReminderNotification_URL}/updateReminderNotificationData`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['reminderNotification'],
        }), 
    })
})


export const {
   useUpdateReminderNotificationDataMutation,
   useGetReminderNotificationDataQuery
} = reminderNotificationApi
