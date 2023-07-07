import { ThemeType, UserType, userDataType } from "@/types/redux/ReduxType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserType = {
  isAuthenticated: false,
  userData: null,
};

export const userSlice = createSlice({
  name: "userStatus",
  initialState,
  reducers: {
    setUser: (state: UserType, action: PayloadAction<UserType>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userData = action.payload.userData;
    },
  },
});

export const { setUser } = userSlice.actions;
export const getUserData = (state: {
  userStatus: { userData: userDataType };
}) => state.userStatus.userData;
export const isAuthenticated = (state: {
  userStatus: { isAuthenticated: boolean };
}) => state.userStatus.isAuthenticated;

export default userSlice.reducer;
