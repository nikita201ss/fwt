import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Ipainting } from "../models/IPainting";

interface PaginatedResponse {
    data: Ipainting[];
    totalCount: number;
}

interface QueryParams {
    page: number;
    limit: number;
    searchTerm?: string;
    authorId?: number;
    locationId?: number;
    yearFrom?: string;
    yearTo?: string;
}

export const paintingAPI = createApi({
    reducerPath: 'paintingAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://test-front.framework.team' }),
    endpoints: (build) => ({
        fetchPaintings: build.query<PaginatedResponse, QueryParams>({
            query: ({ page, limit, searchTerm, authorId, locationId, yearFrom, yearTo }) => {
                const params: Record<string, string | number> = {
                    _page: page,
                    _limit: limit
                };
                
                if (searchTerm) {
                    params.q = searchTerm;
                }
                
                if (authorId) {
                    params.authorId = authorId;
                }
                
                if (locationId) {
                    params.locationId = locationId;
                }
                
                if (yearFrom) {
                    params.created_gte = yearFrom;
                }
                
                if (yearTo) {
                    params.created_lte = yearTo;
                }
                
                console.log('Request params:', params);
                
                return {
                    url: '/paintings',
                    params
                };
            },
            transformResponse: (response: Ipainting[], meta) => {
                const totalCount = meta?.response?.headers.get('X-Total-Count');
                console.log('Response data:', response.length, 'Total count:', totalCount); // Для отладки
                return {
                    data: response,
                    totalCount: totalCount ? parseInt(totalCount) : response.length
                };
            }
        })
    })
})

export const { useFetchPaintingsQuery } = paintingAPI;