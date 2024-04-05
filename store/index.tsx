import { configureStore } from "@reduxjs/toolkit";
import nameSlice from './name'
import { TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        name: nameSlice
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;