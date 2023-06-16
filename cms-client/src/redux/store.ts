import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice";
// import authReducer from "../features/authSlice";
import { useSelector, TypedUseSelectorHook } from "react-redux";
// import tokenReducer from "../features/tokenSlice";

export const store = configureStore({
  reducer: {
    defaultThemePreference: themeReducer,
    // userStatus: authReducer,
    // authToken: tokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
