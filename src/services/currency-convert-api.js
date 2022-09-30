import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const currencyConvertApiHeaders = {
    'X-RapidAPI-Key': '1e4a5a653fmshbeb1f1704b32db8p105c5bjsn8c26bef97e7e',
    'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
}

const baseUrl = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: currencyConvertApiHeaders })

export const currencyConvertApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        convertCurrency: builder.query({
            query: ({ to, from, amount }) => createRequest(`/convert?from=${from}&to=${to}&amount=${amount}`)
        }),
    })
})

export const {
    useConvertCurrencyQuery
} = currencyConvertApi