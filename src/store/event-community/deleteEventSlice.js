import { APIEventCommunity } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
};

export const deleteEvent = createAsyncThunk("DELETE /admins/manage/community/id/idevent", APIEventCommunity.deleteEventCommunity);
export const deleteEventSlice = createSlice({
	name: "deleteEvent",
	initialState,
	reducers: {
		clearDeleteEventState: (state) => {
			state.status = "idle";
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(deleteEvent.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(deleteEvent.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
		});
		builder.addCase(deleteEvent.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const deleteEventSelector = (state) => state.deleteEvent;
export const { clearDeleteEventState } = deleteEventSlice.actions;
export const deleteEventReducer = deleteEventSlice.reducer;
