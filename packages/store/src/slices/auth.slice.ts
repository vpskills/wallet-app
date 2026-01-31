import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: string;
  name?: string | null;
  number?: string | null;
  email?: string | null;
  image?: string | null;
};

type AuthState = {
  isAuthenticated: boolean;
  user?: User;
};

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = undefined;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
