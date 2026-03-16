import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authorReducer from './reducers/AuthorsSlice'


const rootReducer = combineReducers({
    authorReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}


export type AppStore = ReturnType<typeof setupStore>

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']