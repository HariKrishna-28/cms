export type ThemeType = {
  darkTheme: boolean;
};

export type TokenType = {
  token: string | null;
};

export type userDataType = {
  displayName: string;
  email: string;
  photoURL: string;
};

export type UserType = {
  isAuthenticated: boolean;
  userData: userDataType | null;
};

// export type ThemeAction = {

// }
