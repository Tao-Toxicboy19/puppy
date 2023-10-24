import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { httpClient } from "../../../utils/httpclient";
import { server } from "../../../Constants/Constants";
import { Puppy } from "../../../type/puppy.type";

type PuppyState = {
    result: Puppy | null
    loading: boolean
}

const initiaValues: PuppyState = {
    result: null,
    loading: false,
}

export const puppyByIdAsync = createAsyncThunk(
    'puppyById/puppyByIdAsync',
    async () => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    authorization: token
                }
            };
            const result = await httpClient.get<Puppy>(server.PUPPY_URL, config);
            return result.data;
        } catch (error) {
            throw error;
        }
    }
);

const puppyByIdSlice = createSlice({
    name: 'puppyById',
    initialState: initiaValues,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(puppyByIdAsync.fulfilled, (state: PuppyState, action: PayloadAction<Puppy>) => {
            state.result = action.payload;
            state.loading = false;
        });

        builder.addCase(puppyByIdAsync.rejected, (state: PuppyState) => {
            state.result = null;
            state.loading = false;
        });

        builder.addCase(puppyByIdAsync.pending, (state: PuppyState) => {
            state.loading = true;
        });
    },
})

export const { } = puppyByIdSlice.actions
export const puppyByIdSelector = (store: RootState) => store.puppyByIdReducer;
export default puppyByIdSlice.reducer;