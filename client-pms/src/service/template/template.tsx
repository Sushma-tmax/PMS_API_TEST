import {pmsApi} from "../root";


const TEMPLATE_URL = `/api/v1/template`

const apiWithTag = pmsApi.enhanceEndpoints({addTagTypes: ['Template']})

const templateApi = apiWithTag.injectEndpoints({

    endpoints: (builder) => ({
        // Create Template
        createTemplate: builder.mutation<any, any>({
            query: (template) => ({
                url: `${TEMPLATE_URL}/add-objective`,
                method: 'POST',
                body: template
            }),
            invalidatesTags: ['Template']

        }),

        getTemplate: builder.query<any, any>({
            query: (id) => ({
                url: `${TEMPLATE_URL}/template`,
                method: 'GET',
            }),
            providesTags: ['Template']
        }),

        filterTemplate: builder.query<any, any>({
            query: (id) => ({
                url: `${TEMPLATE_URL}/filter-template`,
                method: 'GET',
            }),
            providesTags: ['Template']
        }),


        deleteTemplate: builder.mutation<any, any>({
            query: (id) => ({
                url: `${TEMPLATE_URL}/template/${id}`,
                method: "DELETE",
            }),
            invalidatesTags : ['Template']
        }),

        getSingleTemplate: builder.query<any, any>({
            query: (id) => ({
                url: `${TEMPLATE_URL}/template/${id}`,
                method: 'GET',
            }),
            providesTags: ['Template']
        }),

        editTemplate: builder.mutation<any, any>({
            query: (template) => ({
                url: `${TEMPLATE_URL}/template/${template.id}`,
                method: 'PATCH',
                body: template
            }),
            invalidatesTags: ['Template']
        }),
        

        createPositionTemplate: builder.mutation<any, any>({
            query: (data) => ({
                url: `${TEMPLATE_URL}/template/${data.id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Template']
        }),


        addWeightage: builder.mutation<any, any>({
            query: (weightage) => ({
                url: `${TEMPLATE_URL}/template/${weightage.id}`,
                method: 'PATCH',
                body: weightage
            }),
            invalidatesTags: ['Template']
        }),
        addCalendar: builder.mutation<any, any>({
            query: (weightage) => ({
                url: `${TEMPLATE_URL}/add-calendar`,
                method: 'PATCH',
                body: weightage
            }),
            invalidatesTags: ['Template']
        }),
    })
})

export const {
    useCreateTemplateMutation,
    useGetTemplateQuery,
    useFilterTemplateQuery,
    useAddWeightageMutation,
    useGetSingleTemplateQuery,
    useCreatePositionTemplateMutation,
    useDeleteTemplateMutation,
    useEditTemplateMutation,
    useAddCalendarMutation
    
} = templateApi


