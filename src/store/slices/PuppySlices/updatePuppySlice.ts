import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { httpClient } from "../../../utils/httpclient";
import { server } from "../../../Constants/Constants";
import { Puppy } from "../../../type/puppy.type";
import { puppyAsync } from "./puppySlice";
import { toast } from "react-toastify";

type PuppyState = {
    result: Puppy | null
    loading: boolean
}

const initiaValues: PuppyState = {
    result: null,
    loading: false,
}

export const updatedPuppyAsync = createAsyncThunk(
    'updatedPuppy/updatedPuppyAsync',
    async ({ id, formData, handleClose }: { id: number, formData: FormData, handleClose: () => void }, { dispatch }) => {
        // async (id: number, formData: FormData, { dispatch }) => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    authorization: token
                }
            };
            const result = await httpClient.put<Puppy>(`${server.PUPPY_URL}/${id}`, formData, config);
            if (result.data) toast("🦄 Updated successfuly.", {
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
            handleClose()
            return result.data;
        } catch (error) {
            throw error;
        }
    }
);


const updatedPuppySlice = createSlice({
    name: 'updatedPuppy',
    initialState: initiaValues,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updatedPuppyAsync.fulfilled, (state: PuppyState, action: PayloadAction<Puppy>) => {
            state.result = action.payload;
            state.loading = false;
        });

        builder.addCase(updatedPuppyAsync.rejected, (state: PuppyState) => {
            state.result = null;
            state.loading = false;
        });

        builder.addCase(updatedPuppyAsync.pending, (state: PuppyState) => {
            state.loading = true;
        });
    },
})

export const { } = updatedPuppySlice.actions
export const updatedPuppySelector = (store: RootState) => store.updatedPuppyReducer;
export default updatedPuppySlice.reducer;