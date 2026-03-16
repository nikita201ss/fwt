import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IAuthor } from "../../models/IAuthor";


interface AuthorState {
    authors: IAuthor[];
    isLoading: boolean;
    error: string;
}

const initialState: AuthorState = {
    authors: [],
    isLoading: false,
    error: ''
}

export const authorSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authorsFetching(state) {
            state.isLoading = true;
        },
        authorsFetchingSuccess(state, action: PayloadAction<IAuthor[]>) {
            state.isLoading = false;
            state.error = ''
            state.authors = action.payload;
        },
        authorsFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default authorSlice.reducer;