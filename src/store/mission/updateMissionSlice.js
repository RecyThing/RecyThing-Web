import { APIMission } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
};

export const updateMission = createAsyncThunk(
	"PUT /admins/manage/missions/id",
	APIMission.updateMission
);

export const updateMissionSlice = createSlice({
	name: "updateMission",
	initialState,
	reducers: {
		clearUpdateMissionState: (state) => {
			state.status = "idle";
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(updateMission.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(updateMission.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
		});
		builder.addCase(updateMission.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const updateMissionSelector = (state) => state.updateMission;
export const { clearUpdateMissionState } = updateMissionSlice.actions;
export const updateMissionReducer = updateMissionSlice.reducer;
