import { ThemeType } from "@/types/redux/ReduxType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// function userThemePreference() {
//   const theme = window.matchMedia("(prefers-color-scheme: dark");
//   if (theme.matches) {
//     return true;
//   } else {
//     return false;
//   }
// }

const initialState: ThemeType = {
  darkTheme: false,
};

export const themeSlice = createSlice({
  name: "defaultThemePreference",
  initialState,
  reducers: {
    setTheme: (state: ThemeType, action: PayloadAction<ThemeType>) => {
      state.darkTheme = action.payload.darkTheme;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const selectTheme = (state: {
  defaultThemePreference: { darkTheme: Boolean };
}) => state.defaultThemePreference.darkTheme;

export default themeSlice.reducer;
