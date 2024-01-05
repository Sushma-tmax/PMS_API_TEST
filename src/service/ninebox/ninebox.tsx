import { pmsApi } from "../root";

const NINEBOX_URL = `/api/v1/ninebox`

const apiWithTag = pmsApi.enhanceEndpoints({ addTagTypes: ['NineBox'] })


const nineboxAPI = apiWithTag.injectEndpoints({

    endpoints: (builder) => ({

        getNinebox: builder.query<any, any>({
            query: () => ({
                url: `${NINEBOX_URL}`,
                method: 'GET',
            }),
            providesTags: ['NineBox'],
        }),

        updateNineBox: builder.mutation<any, any>({
            query: (data) => ({
                url: `${NINEBOX_URL}/${data.id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ['NineBox']
        }),

        getTalentCategory: builder.query<any,any>({
            
            query: (args) => {
                const { overall_rating, potential } = args;
                return {
                    url: `${NINEBOX_URL}/talent-category/${overall_rating}/${potential}`,
                                        
                }},
                providesTags: ['NineBox']
                }),
        
 


})
    })

export const {
    useGetNineboxQuery,
    useUpdateNineBoxMutation,
    useGetTalentCategoryQuery

} = nineboxAPI

