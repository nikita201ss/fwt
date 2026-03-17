import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authorReducer from './reducers/AuthorsSlice'
import { paintingAPI } from "../services/PaintingService";


const rootReducer = combineReducers({
    authorReducer,
    [paintingAPI.reducerPath]: paintingAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(paintingAPI.middleware)
    })
}


export type AppStore = ReturnType<typeof setupStore>

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']