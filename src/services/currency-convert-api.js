import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const currencyConvertApiHeaders = {
    'X-RapidAPI-Key': '1e4a5a653fmshbeb1f1704b32db8p105c5bjsn8c26bef97e7e',
    'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com'
}

const baseUrl = 'https://currency-converter18.p.rapidapi.com/api/v1';

const createRequest = (url) => ({ url, headers: currencyConvertApiHeaders })

export const currencyConvertApi = createApi({
    reducerPath: 'currencyConvertApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getAllCurrency: builder.query({
            query: () => createRequest(`/supportedCurrencies`)
        }),
    })
})

export const {
    useGetAllCurrencyQuery
} = currencyConvertApi