import { APIRecycles } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  message: "",
  data: {},
  pagination: {},
  count_data: 0,
};

export const fetchRecycles = createAsyncThunk(
  "GET /admins/manage/recycles",
  APIRecycles.getRecycles
);

export const fetchRecyclesSlice = createSlice({
  name: "fetchRecycles",
  initialState,
  reducers: {
    clearFetchRecyclesState: (state) => {
      state.status = "idle";
      state.message = "";
      state.data = {};
      state.pagination = {};
      state.count_data = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecycles.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchRecycles.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
      state.count_data = action.payload.count_data;
    });
    builder.addCase(fetchRecycles.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.error.message;
    });
  },
});

export const fetchRecyclesSelector = (state) => state.fetchRecycles;
export const { clearFetchRecyclesState } = fetchRecyclesSlice.actions;
export const fetchRecyclesReducer = fetchRecyclesSlice.reducer;
