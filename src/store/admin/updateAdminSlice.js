import { APIVoucher } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  message: "",
};

export const updateAdmin = createAsyncThunk(
  "PUT /admins/id",
  APIVoucher.updateAdmin
);

export const updateAdminSlice = createSlice({
  name: "updateAdmin",
  initialState,
  reducers: {
    clearUpdateAdminState: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateAdmin.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateAdmin.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
    });
    builder.addCase(updateAdmin.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.error.message;
    });
  },
});

export const updateAdminSelector = (state) => state.updateAdmin;
export const { clearUpdateAdminState } = updateAdminSlice.actions;
export const updateAdminReducer = updateAdminSlice.reducer;
