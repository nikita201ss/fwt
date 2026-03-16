import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IAuthor } from "../../models/IAuthor";
import { fetchAuthors } from "./ActionCreators";


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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthors.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(fetchAuthors.fulfilled, (state, action: PayloadAction<IAuthor[]>) => {
                state.isLoading = false;
                state.error = '';
                state.authors = action.payload;
            })
            .addCase(fetchAuthors.rejected, (state, action) => {
                state.isLoading = false;
                if (action.payload) {
                    state.error = action.payload as string;
                } else {
                    state.error = action.error.message || 'Произошла ошибка';
                }
            });
    }
})

export default authorSlice.reducer;