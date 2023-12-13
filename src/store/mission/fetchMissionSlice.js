import { APIMission } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: [],
};

export const fetchMission = createAsyncThunk(
	"GET /admins/manage/missions/id",
	APIMission.getMission
);

export const fetchMissionSlice = createSlice({
	name: "fetchMission",
	initialState,
	reducers: {
		clearFetchMissionState: (state) => {
			state.status = "idle";
			state.message = "";
			state.data = {};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMission.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchMission.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
			state.data = action.payload.data;
		});
		builder.addCase(fetchMission.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const fetchMissionSelector = (state) => state.fetchMission;
export const { clearFetchMissionState } = fetchMissionSlice.actions;
export const fetchMissionReducer = fetchMissionSlice.reducer;
