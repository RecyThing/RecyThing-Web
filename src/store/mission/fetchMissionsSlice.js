import { APIMission } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: {},
	pagination: {},
	count_data: 0,
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
			state.count_data = 0;
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
			state.count_data = action.payload.count_data;
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
