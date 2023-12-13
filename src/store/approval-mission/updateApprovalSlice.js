import { APIApprovalMission } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
};

export const updateApproval = createAsyncThunk(
	"PUT /admins/manage/missions/approvals/id",
	APIApprovalMission.updateApproval
);

export const updateApprovalSlice = createSlice({
	name: "updateApproval",
	initialState,
	reducers: {
		clearUpdateApprovalState: (state) => {
			state.status = "idle";
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(updateApproval.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(updateApproval.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
		});
		builder.addCase(updateApproval.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const updateApprovalSelector = (state) => state.updateApproval;
export const { clearUpdateApprovalState } = updateApprovalSlice.actions;
export const updateApprovalReducer = updateApprovalSlice.reducer;
