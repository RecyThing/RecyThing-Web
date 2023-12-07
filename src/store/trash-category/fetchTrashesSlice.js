import { APITrashes } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  message: "",
  data: {},
  pagination: {},
  count_data: 0,
};

export const fetchTrashes = createAsyncThunk(
  "GET /admins/manage/trashes",
  APITrashes.getTrashes
);

export const fetchTrashesSlice = createSlice({
  name: "fetchTrashes",
  initialState,
  reducers: {
    clearFetchTrashesState: (state) => {
      state.status = "idle";
      state.message = "";
      state.data = {};
      state.pagination = {};
      state.count_data = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrashes.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTrashes.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
      state.count_data = action.payload.count_data;
    });
    builder.addCase(fetchTrashes.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.error.message;
    });
  },
});

export const fetchTrashesSelector = (state) => state.fetchTrashes;
export const { clearFetchTrashesState } = fetchTrashesSlice.actions;
export const fetchTrashesReducer = fetchTrashesSlice.reducer;
