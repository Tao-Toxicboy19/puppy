import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { httpClient } from "../../../utils/httpclient";
import { server } from "../../../Constants/Constants";
import { Puppy } from "../../../type/puppy.type";
import { puppyAsync } from "./puppySlice";
import { toast } from "react-toastify";

type PuppyState = {
    result: Puppy[]
    loading: boolean
}

const initiaValues: PuppyState = {
    result: [],
    loading: false,
}

export const deletePuppyAsync = createAsyncThunk(
    'deletePuppy/deletePuppyAsync',
    async (id: number, { dispatch }) => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    authorization: token
                }
            };
            const result = await httpClient.delete<Puppy[]>(`${server.PUPPY_URL}/${id}`, config);
            if (result.data) toast("🦄 Delete successfuly.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(puppyAsync())
            return result.data;
        } catch (error) {
            throw error;
        }
    }
);


const deletePuppySlice = createSlice({
    name: 'deletePuppy',
    initialState: initiaValues,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(deletePuppyAsync.fulfilled, (state: PuppyState, action: PayloadAction<Puppy[]>) => {
            state.result = action.payload;
            state.loading = false;
        });

        builder.addCase(deletePuppyAsync.rejected, (state: PuppyState) => {
            state.result = [];
            state.loading = false;
        });

        builder.addCase(deletePuppyAsync.pending, (state: PuppyState) => {
            state.loading = true;
        });
    },
})

export const { } = deletePuppySlice.actions
export const deletePuppySelector = (store: RootState) => store.deletePuppyReducer;
export default deletePuppySlice.reducer;