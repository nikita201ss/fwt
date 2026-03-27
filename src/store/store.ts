import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authorReducer from './reducers/AuthorsSlice';
import { paintingAPI } from '../services/PaintingService';
import { authorAPI } from '../services/AuthorService';
import { locationAPI } from '../services/LocationService';

const rootReducer = combineReducers({
    authorReducer: authorReducer,
    [paintingAPI.reducerPath]: paintingAPI.reducer,
    [authorAPI.reducerPath]: authorAPI.reducer,
    [locationAPI.reducerPath]: locationAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                paintingAPI.middleware,
                authorAPI.middleware,
                locationAPI.middleware
            )
    })
}

export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']