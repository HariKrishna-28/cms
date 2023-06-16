import { TokenType } from "@/types/redux/ReduxType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: TokenType = {
  token: null,
};

export const authSlice = createSlice({
  name: "authToken",
  initialState,
  reducers: {
    setAuthToken: (state: TokenType, action: PayloadAction<TokenType>) => {
      state.token = action.payload.token;
    },
  },
});

export const { setAuthToken } = authSlice.actions;
export const selectToken = (state: { authToken: { token: string } }) =>
  state.authToken.token;

export default authSlice.reducer;
