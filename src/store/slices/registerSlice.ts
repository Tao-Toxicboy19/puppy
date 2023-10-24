import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { registerResult } from "../../type/auth.type";
import { httpClient } from "../../utils/httpclient";
import { server } from "../../Constants/Constants";
import { User } from "../../type/user.type";
import { toast } from "react-toastify";

type registerState = {
    result: registerResult | null
    loading: boolean
}

const initiaValues: registerState = {
    result: null,
    loading: false,
}

export const registerAsync = createAsyncThunk(
    'register/registerAsync',
    async ({ values, navigate }: { values: User, navigate: any }) => {
        try {
            const result = await httpClient.post<registerResult>(server.REGISTER_URL, values);
            navigate('/login');
            return result.data;
        } catch (error: any) {
            if (error.response && error.response.status === 409) toast('🦄 Duplicate username!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            if (error.response && error.response.status === 401) toast("🦄 Passwords don't match!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            throw error;
        }
    }
);


const registerSlice = createSlice({
    name: 'login',
    initialState: initiaValues,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerAsync.fulfilled, (state: registerState, action: PayloadAction<registerResult>) => {
            state.result = action.payload;
            state.loading = false;
        });

        builder.addCase(registerAsync.rejected, (state: registerState) => {
            state.result = null;
            state.loading = false;
        });

        builder.addCase(registerAsync.pending, (state: registerState) => {
            state.loading = true;
        });
    },
})

export const { } = registerSlice.actions
export const registerSelector = (store: RootState) => store.registerReducer;
export default registerSlice.reducer;