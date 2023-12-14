import { APIEventCommunity } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: {},
};

export const fetchEvent = createAsyncThunk("GET /admins/manage/event/id/idevent", APIEventCommunity.getEventCommunity);
export const fetchEventSlice = createSlice({
	name: "fetchEvent",
	initialState,
	reducers: {
		clearFetchEventState: (state) => {
			state.status = "idle";
			state.message = "";
			state.data = {};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchEvent.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchEvent.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
			state.data = action.payload.data;
		});
		builder.addCase(fetchEvent.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const fetchEventSelector = (state) => state.fetchEvent;
export const { clearFetchEventState } = fetchEventSlice.actions;
export const fetchEventReducer = fetchEventSlice.reducer;
