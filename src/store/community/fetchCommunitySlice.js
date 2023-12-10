import { APICommunity } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: {},
	pagination: {},
	count_data: 0,
};

export const fetchCommunity = createAsyncThunk(
	"GET /admins/manage/community/id",
	APICommunity.getCommunity
);

export const fetchCommunitySlice = createSlice({
	name: "fetchCommunity",
	initialState,
	reducers: {
		clearFetchCommunityState: (state) => {
			state.status = "idle";
			state.message = "";
			state.data = {};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCommunity.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchCommunity.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
			state.data = action.payload.data;
		});
		builder.addCase(fetchCommunity.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const fetchCommunitySelector = (state) => state.fetchCommunity;
export const { clearFetchCommunityState } = fetchCommunitySlice.actions;
export const fetchCommunityReducer = fetchCommunitySlice.reducer;
