import { APIMission } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
};

export const deleteMission = createAsyncThunk(
	"DELETE /admins/manage/missions/id",
	APIMission.deleteMission
);

export const deleteMissionSlice = createSlice({
	name: "deleteMission",
	initialState,
	reducers: {
		clearDeleteMissionState: (state) => {
			state.status = "idle";
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(deleteMission.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(deleteMission.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
		});
		builder.addCase(deleteMission.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const deleteMissionSelector = (state) => state.deleteMission;
export const { clearDeleteMissionState } = deleteMissionSlice.actions;
export const deleteMissionReducer = deleteMissionSlice.reducer;
