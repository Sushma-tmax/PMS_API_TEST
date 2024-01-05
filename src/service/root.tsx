import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {API_URL} from "../constants/URL";


// Define a service using a base URL and expected endpoints
export const pmsApi = createApi({
    reducerPath: 'pokemonApi',



        baseQuery: fetchBaseQuery({baseUrl: API_URL}),


        //    baseQuery: fetchBaseQuery({baseUrl: 'http://40.114.31.161/'}),






    endpoints: (builder) => ({
        getPokemonByName: builder.query<void, string>({
            query: () => `/hello`,
        }),

        registerUser: builder.mutation<any, any>({
            query: (credentials) => ({
                url: `/api/v1/auth/register`,
                method: 'POST',
                body: credentials
            }),
        }),

        loginUser: builder.mutation<any, any>({
            // query: () => `/api/v1/auth/login`,
            query: (credentials) => ({
                url: `/api/v1/auth/login`,
                method: 'POST',
                body: credentials
            }),
        }),
        logout: builder.query<void, string>({
            query: () => `/api/v1/auth/logout`,
        }),
        verifyEmail: builder.mutation<any, any>({
            query: (email) => ({
                headers: {
                    'Content-Type': 'application/json',
                },
                url: `/api/v1/auth/verify-email`,
                method: 'POST',
                body: email
            })
        }),
        resetPassword: builder.mutation<any, any>({
            query: (data) => ({
                url: `/api/v1/auth/reset-password`,
                method: 'POST',
                body: data
            })
        }),
        forgotPassword: builder.mutation<void, string>({
            query: (email) => ({
                url: `/api/v1/auth/forgot-password`,
                method: 'POST',
                body: email
            }),
        }),



    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetPokemonByNameQuery,
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutQuery,
    useVerifyEmailMutation,
    useResetPasswordMutation,
    useForgotPasswordMutation,
} = pmsApi
