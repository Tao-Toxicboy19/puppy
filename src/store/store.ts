import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import loginReducer from './slices/loginSlice'
import registerReducer from './slices/registerSlice'
import puppyReducer from './slices/PuppySlices/puppySlice'
import createPuppyReducer from './slices/PuppySlices/createPuppySlice'
import puppyByIdReducer from './slices/PuppySlices/puppyByIdSlice'
import updatedPuppyReducer from './slices/PuppySlices/updatePuppySlice'
import deletePuppyReducer from './slices/PuppySlices/deletePupySlice'

const reducer = {
    loginReducer,
    registerReducer,
    puppyReducer,
    deletePuppyReducer,
    createPuppyReducer,
    puppyByIdReducer,
    updatedPuppyReducer,
};

export const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV === "development",
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();