import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Ipainting } from "../models/IPainting";

interface PaginatedResponse {
    data: Ipainting[];
    totalCount: number;
}

export const paintingAPI = createApi({
    reducerPath: 'paintingAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://test-front.framework.team'}),
    endpoints: (build) => ({
        fetchAllPaintings: build.query<PaginatedResponse, { page: number; limit: number }>({
            query: ({ page, limit }) => ({
                url: '/paintings',
                params: {
                    _page: page,
                    _limit: limit
                }
            }),
            transformResponse: (response: Ipainting[], meta) => {
                
                const totalCount = meta?.response?.headers.get('X-Total-Count');
                return {
                    data: response,
                    totalCount: totalCount ? parseInt(totalCount) : response.length
                };
            }
        }),

        searchPaintings: build.query<PaginatedResponse, { searchTerm: string; page: number; limit: number }>({
            query: ({ searchTerm, page, limit }) => ({
                url: '/paintings',
                params: {
                    q: searchTerm,
                    _page: page,
                    _limit: limit
                }
            }),
            transformResponse: (response: Ipainting[], meta) => {
                const totalCount = meta?.response?.headers.get('X-Total-Count');
                return {
                    data: response,
                    totalCount: totalCount ? parseInt(totalCount) : response.length
                };
            }
        })
    })
})

export const { 
    useFetchAllPaintingsQuery, 
    useSearchPaintingsQuery, 
    useLazySearchPaintingsQuery 
} = paintingAPI;