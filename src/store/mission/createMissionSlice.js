import { APIMission } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
};

export const createMission = createAsyncThunk(
	"POST /admins/manage/missions",
	APIMission.createMission
);

export const createMissionSlice = createSlice({
	name: "createMission",
	initialState,
	reducers: {
		clearCreateMissionState: (state) => {
			state.status = "idle";
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(createMission.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(createMission.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
		});
		builder.addCase(createMission.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const createMissionSelector = (state) => state.createMission;
export const { clearCreateMissionState } = createMissionSlice.actions;
export const createMissionReducer = createMissionSlice.reducer;
