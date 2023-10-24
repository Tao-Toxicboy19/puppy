import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { httpClient } from "../../../utils/httpclient";
import { server } from "../../../Constants/Constants";
import { CreatePuppy } from "../../../type/puppy.type";
import { puppyAsync } from "./puppySlice";
import { toast } from "react-toastify";

type PuppyState = {
    result: any;
    loading: boolean;
}

const initiaValues: PuppyState = {
    result: null,
    loading: false,
}

export const createPuppyAsync = createAsyncThunk(
    'createPuppy/createPuppyAsync',
    async (formData: FormData, { dispatch }) => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    authorization: token
                }
            };
            const result = await httpClient.post<CreatePuppy>(server.PUPPY_URL, formData, config);
            toast('🦄 Created!', {
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


const createPuppySlice = createSlice({
    name: 'createPuppy',
    initialState: initiaValues,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createPuppyAsync.fulfilled, (state: PuppyState, action: PayloadAction<CreatePuppy>) => {
            state.result = action.payload;
            state.loading = false;
        });

        builder.addCase(createPuppyAsync.rejected, (state: PuppyState) => {
            state.result = [];
            state.loading = false;
        });

        builder.addCase(createPuppyAsync.pending, (state: PuppyState) => {
            state.loading = true;
        });
    },
})

export const { } = createPuppySlice.actions
export const createPuppySelector = (store: RootState) => store.createPuppyReducer;
export default createPuppySlice.reducer;