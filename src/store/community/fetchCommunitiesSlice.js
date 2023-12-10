import { APICommunity } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: {},
	pagination: {},
	count_data: 0,
};

export const fetchCommunities = createAsyncThunk(
	"GET /admins/manage/community",
	APICommunity.getCommunities
);

export const fetchCommunitiesSlice = createSlice({
	name: "fetchCommunities",
	initialState,
	reducers: {
		clearFetchCommunitiesState: (state) => {
			state.status = "idle";
			state.message = "";
			state.data = {};
			state.pagination = {};
			state.count_data = 0;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCommunities.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchCommunities.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
			state.data = action.payload.data;
			state.pagination = action.payload.pagination;
			state.count_data = action.payload.count_data;
		});
		builder.addCase(fetchCommunities.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const fetchCommunitiesSelector = (state) => state.fetchCommunities;
export const { clearFetchCommunitiesState } = fetchCommunitiesSlice.actions;
export const fetchCommunitiesReducer = fetchCommunitiesSlice.reducer;
