import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { httpClient } from "../../utils/httpclient";
import { loginResult } from "../../type/auth.type";
import { OK, server } from "../../Constants/Constants";
import { User } from "../../type/user.type";
import { toast } from "react-toastify";

type LoginState = {
    result: loginResult | null
    loading: boolean
}

const initiaValues: LoginState = {
    result: null,
    loading: false,
}

export const loginAsync = createAsyncThunk(
    'login/loginAsync',
    async ({ values, navigate }: { values: User, navigate: any }, { dispatch }) => {
        try {
            const result = await httpClient.post<loginResult>(server.LOGIN_URL, values);
            if (result.data.message === OK) {
                localStorage.setItem('token', result.data.token);
                dispatch(setTokens({ message: OK, token: result.data.token }));
            }
            navigate('/home');
            return result.data;
        } catch (error: any) {
            if (error.response && error.response.status === 401) toast("🦄 The password is incorrect.", {
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

export const restoreLogin = () => {
    return (dispatch: any) => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(setTokens({ message: OK, token }));
        }
    };
}

export const logout = () => {
    return (dispatch: any) => {
        localStorage.removeItem('token');
        toast('🦄 Logout!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        dispatch(setRemoveToken());
    };
};

const loginSlice = createSlice({
    name: 'login',
    initialState: initiaValues,
    reducers: {
        setTokens: (state: LoginState, action: PayloadAction<any>) => {
            state.result = action.payload;
        },
        setRemoveToken(state: LoginState) {
            state.loading = false
            state.result = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.fulfilled, (state: LoginState, action: PayloadAction<loginResult>) => {
            state.result = action.payload;
            state.loading = false;
        });

        builder.addCase(loginAsync.rejected, (state: LoginState) => {
            state.result = null;
            state.loading = false;
        });

        builder.addCase(loginAsync.pending, (state: LoginState) => {
            state.loading = true;
        });
    },
})

export const { setTokens, setRemoveToken } = loginSlice.actions
export const loginSelector = (store: RootState) => store.loginReducer;
export default loginSlice.reducer;