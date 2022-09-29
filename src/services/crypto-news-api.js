import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '1e4a5a653fmshbeb1f1704b32db8p105c5bjsn8c26bef97e7e',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders })

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ search, count }) => createRequest(`news/search?q=${search}&count=${count}&freshness=day&textFormat=raw&safeSearch=off&sortBy=date`)
        }),
    })
})

export const {
    useGetCryptoNewsQuery
} = cryptoNewsApi