import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Ipainting } from "../models/IPainting";





export const paintingAPI = createApi({
    reducerPath: 'paintingAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://test-front.framework.team'}),
    endpoints: (build) => ({
        fetchAllPaintings: build.query<Ipainting[], number>({
            query: (limit) => ({
                url: '/paintings',
                params: {
                    _limit: limit
                }
            })
        }),

        searchPaintings: build.query<Ipainting[], string>({
            query: (searchTerm) => ({
                url: '/paintings',
                params: {
                    q: searchTerm
                }
            })
        })
    })
})

export const { useFetchAllPaintingsQuery, useSearchPaintingsQuery, useLazySearchPaintingsQuery } = paintingAPI;