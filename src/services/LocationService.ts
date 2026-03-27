import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ILocation } from "../models/ILocation";

export const locationAPI = createApi({
    reducerPath: 'locationAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://test-front.framework.team' }),
    endpoints: (build) => ({
        fetchAllLocations: build.query<ILocation[], void>({
            query: () => ({
                url: '/locations'
            })
        })
    })
});

export const { useFetchAllLocationsQuery } = locationAPI;