import { APIApprovalMission } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: {},
};

export const fetchApproval = createAsyncThunk(
	"GET /admins/manage/missions/approvals/id",
	APIApprovalMission.getApproval
);

export const fetchApprovalSlice = createSlice({
	name: "fetchApproval",
	initialState,
	reducers: {
		clearFetchApprovalState: (state) => {
			state.status = "idle";
			state.message = "";
			state.data = {};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchApproval.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchApproval.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
			state.data = action.payload.data;
		});
		builder.addCase(fetchApproval.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const fetchApprovalSelector = (state) => state.fetchApproval;
export const { clearFetchApprovalState } = fetchApprovalSlice.actions;
export const fetchApprovalReducer = fetchApprovalSlice.reducer;
