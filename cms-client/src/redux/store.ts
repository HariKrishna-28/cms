import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice";
import tokenReducer from "./features/tokenSlice";
import userReducer from "./features/userSlice";
import { useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    defaultThemePreference: themeReducer,
    authToken: tokenReducer,
    userStatus: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
