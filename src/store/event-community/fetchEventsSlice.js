import { APIEventCommunity } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  message: "",
  data: {},
  pagination: {},
  count_data: 0,
};

export const fetchEvents = createAsyncThunk(
  "GET /admins/manage/event/id",
  APIEventCommunity.getEventCommunities
);

export const fetchEventsSlice = createSlice({
  name: "fetchEvents",
  initialState,
  reducers: {
    clearFetchEventsState: (state) => {
      state.status = "idle";
      state.message = "";
      state.data = {};
      state.pagination = {};
      state.count_data = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
      state.count_data = action.payload.count_data;
    });
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.error.message;
    });
  },
});

export const fetchEventsSelector = (state) => state.fetchEvents;
export const { clearFetchEventsState } = fetchEventsSlice.actions;
export const fetchEventsReducer = fetchEventsSlice.reducer;
