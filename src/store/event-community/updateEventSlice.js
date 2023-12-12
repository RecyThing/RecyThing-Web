import { APIEventCommunity } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  message: "",
};

export const updateEvent = createAsyncThunk(
  "PUT /admins/manage/event/id/communityId",
  APIEventCommunity.updateEvent
);

export const updateEventSlice = createSlice({
  name: "updateEvent",
  initialState,
  reducers: {
    clearUpdateEventState: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateEvent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateEvent.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
    });
    builder.addCase(updateEvent.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.error.message;
    });
  },
});

export const updateEventSelector = (state) => state.updateEvent;
export const { clearUpdateEventState } = updateEventSlice.actions;
export const updateEventReducer = updateEventSlice.reducer;
