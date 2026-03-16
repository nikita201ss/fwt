import axios from "axios";
import type { AppDispatch } from "../store";
import type { IAuthor } from "../../models/IAuthor";
import { authorSlice } from "./AuthorsSlice";




export const fetchAuthors = () => async (dispatch: AppDispatch) => {

    function getErrorMessage(error: unknown) {
        if (error instanceof Error) return error.message
        return String(error)
    }

    try {
        dispatch(authorSlice.actions.authorsFetching())
        const response = await axios.get<IAuthor[]>('https://test-front.framework.team/authors')
        dispatch(authorSlice.actions.authorsFetchingSuccess(response.data))
    } catch (e) {
        dispatch(authorSlice.actions.authorsFetchingError(getErrorMessage(e)))
    }
}

