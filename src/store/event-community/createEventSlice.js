import { APIEventCommunity } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  message: "",
};

export const createEvent = createAsyncThunk(
  "POST /admins/manage/event/id",
  APIEventCommunity.createEventCommunity
);

export const createEventSlice = createSlice({
  name: "createEvent",
  initialState,
  reducers: {
    clearCreateEventState: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createEvent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
    });
    builder.addCase(createEvent.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.error.message;
    });
  },
});

export const createEventSelector = (state) => state.createEvent;
export const { clearCreateEventState } = createEventSlice.actions;
export const createEventReducer = createEventSlice.reducer;
