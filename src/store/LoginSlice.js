import { getLoginAPI } from "@/apis/LoginApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
};

export const loginApiEvent = createAsyncThunk(
  "/admins/login/loginApiEvent",
  getLoginAPI.getLogin
);


export const loginSlice = createSlice({
  name: "login",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginApiEvent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginApiEvent.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.user = payload;
    });
    builder.addCase(loginApiEvent.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    });
  },
});

export default loginSlice.reducer