import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IAuthor } from "../models/IAuthor";

export const authorAPI = createApi({
    reducerPath: 'authorAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://test-front.framework.team' }),
    endpoints: (build) => ({
        fetchAllAuthors: build.query<IAuthor[], void>({
            query: () => ({
                url: '/authors'
            })
        })
    })
});

export const { useFetchAllAuthorsQuery } = authorAPI;