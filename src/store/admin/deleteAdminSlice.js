import { APIAdmin } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  message: "",
};

export const deleteAdmin = createAsyncThunk(
  "DELETE /admins/id",
  APIAdmin.deleteAdmin
);

export const deleteAdminSlice = createSlice({
  name: "deleteAdmin",
  initialState,
  reducers: {
    clearDeleteAdminState: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteAdmin.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteAdmin.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
    });
    builder.addCase(deleteAdmin.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.error.message;
    });
  },
});

export const deleteAdminSelector = (state) => state.deleteAdmin;
export const { clearDeleteAdminState } = deleteAdminSlice.actions;
export const deleteAdminReducer = deleteAdminSlice.reducer;
