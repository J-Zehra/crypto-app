import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Key': '1e4a5a653fmshbeb1f1704b32db8p105c5bjsn8c26bef97e7e',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: () => createRequest('/coins?limit=100')
        }),
        getCrypto: builder.query({
            query: ({ id }) => createRequest(`/coin/${id}`)
        }),
        getCryptoHistory: builder.query({
            query: ({ id, timePeriod='24h' }) => createRequest(`/coin/${id}/history?timePeriod=${timePeriod}`)
        }),
        getTopCrypto: builder.query({
            query: () => createRequest('/coins?limit=1')
        }),
        getGlobalStats: builder.query({
            query: () => createRequest('/stats')
        }),

    })
})

export const {
    useGetCryptosQuery,
    useGetCryptoHistoryQuery,
    useGetTopCryptoQuery,
    useGetCryptoQuery,
    useGetGlobalStatsQuery
} = cryptoApi