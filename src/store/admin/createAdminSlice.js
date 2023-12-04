import { APIAdmin } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  message: "",
};

export const createAdmins = createAsyncThunk(
  "POST /admins",
  APIAdmin.createAdmins
);

export const createAdminSlice = createSlice({
  name: "createAdmin",
  initialState,
  reducers: {
    clearCreateAdminState: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAdmins.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createAdmins.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
    });
    builder.addCase(createAdmins.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.error.message;
    });
  },
});

export const createAdminSelector = (state) => state.createAdmins;
export const { clearcreateAdminState } = createAdminSlice.actions;
export const createAdminReducer = createAdminSlice.reducer;
