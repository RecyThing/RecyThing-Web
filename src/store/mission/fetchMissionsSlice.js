import { APIMission } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: {},
	pagination: {},
	count: {},
};

export const fetchMissions = createAsyncThunk(
	"GET /admins/manage/missions",
	APIMission.getMissions
);

export const fetchMissionsSlice = createSlice({
	name: "fetchMissions",
	initialState,
	reducers: {
		clearFetchMissionsState: (state) => {
			state.status = "idle";
			state.message = "";
			state.data = {};
			state.pagination = {};
			state.count = {};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMissions.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchMissions.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
			state.data = action.payload.data;
			state.pagination = action.payload.pagination;
			state.count = action.payload.count;
		});
		builder.addCase(fetchMissions.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const fetchMissionsSelector = (state) => state.fetchMissions;
export const { clearFetchMissionsState } = fetchMissionsSlice.actions;
export const fetchMissionsReducer = fetchMissionsSlice.reducer;
