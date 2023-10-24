import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { httpClient } from "../../../utils/httpclient";
import { server } from "../../../Constants/Constants";
import { Puppy } from "../../../type/puppy.type";

type PuppyState = {
    result: Puppy[]
    loading: boolean
}

const initiaValues: PuppyState = {
    result: [],
    loading: false,
}

export const puppyAsync = createAsyncThunk(
    'puppy/puppyAsync',
    async () => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    authorization: token
                }
            };
            const result = await httpClient.get<Puppy[]>(server.PUPPY_URL, config);
            return result.data;
        } catch (error) {
            throw error;
        }
    }
);

const puppySlice = createSlice({
    name: 'puppy',
    initialState: initiaValues,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(puppyAsync.fulfilled, (state: PuppyState, action: PayloadAction<Puppy[]>) => {
            state.result = action.payload;
            state.loading = false;
        });

        builder.addCase(puppyAsync.rejected, (state: PuppyState) => {
            state.result = [];
            state.loading = false;
        });

        builder.addCase(puppyAsync.pending, (state: PuppyState) => {
            state.loading = true;
        });
    },
})

export const { } = puppySlice.actions
export const puppySelector = (store: RootState) => store.puppyReducer;
export default puppySlice.reducer;