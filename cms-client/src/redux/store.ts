import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice";
import tokenReducer from "./features/tokenSlice";
import { useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    defaultThemePreference: themeReducer,
    authToken: tokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
