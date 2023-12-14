import { APIAdmin } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  message: "",
  data: {},
};

export const fetchAdmin = createAsyncThunk("GET /admin/id", APIAdmin.getAdmin);

export const fetchAdminSlice = createSlice({
  name: "fetchAdmin",
  initialState,
  reducers: {
    clearFetchAdminState: (state) => {
      state.status = "idle";
      state.message = "";
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAdmin.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAdmin.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.data = action.payload.data;
    });
    builder.addCase(fetchAdmin.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.error.message;
    });
  },
});

export const fetchAdminSelector = (state) => state.fetchAdmin;
export const { clearFetchAdminState } = fetchAdminSlice.actions;
export const fetchAdminReducer = fetchAdminSlice.reducer;
