import { APIAdmin} from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  message: "",
  data: [],
  pagination: {},
  count_data: 0,
};

export const fetchAdmins = createAsyncThunk("GET /admins", APIAdmin.getAdmins);

export const fetchAdminsSlice = createSlice({
  name: "fetchAdmins",
  initialState,
  reducers: {
    clearFetchAdminsState: (state) => {
      state.status = "idle";
      state.message = "";
      state.data = [];
      state.pagination = {};
      state.count_data = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAdmins.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAdmins.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
      state.count_data = action.payload.count_data;
    });
    builder.addCase(fetchAdmins.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.error.message;
    });
  },
});

export const fetchAdminsSelector = (state) => state.fetchAdmins;
export const { clearFetchAdminsState } = fetchAdminsSlice.actions;
export const fetchAdminsReducer = fetchAdminsSlice.reducer;
