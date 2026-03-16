import axios from "axios";
import type { IAuthor } from "../../models/IAuthor";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAuthors = createAsyncThunk<
    IAuthor[],
    void,
    { rejectValue: string }
>(
    'author/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<IAuthor[]>('https://test-front.framework.team/authors');
            return response.data;
        } catch (error) {

            return thunkAPI.rejectWithValue('Не удалось загрузить авторов');
        }
    }
);