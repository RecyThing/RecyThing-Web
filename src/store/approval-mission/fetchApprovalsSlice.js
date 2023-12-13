import { APIApprovalMission } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: [],
	pagination: {},
	count: {},
};

export const fetchApprovals = createAsyncThunk(
	"GET /admins/manage/missions/approvals",
	APIApprovalMission.getApprovals
);

export const fetchApprovalsSlice = createSlice({
	name: "fetchCommunities",
	initialState,
	reducers: {
		clearFetchApprovalsState: (state) => {
			state.status = "idle";
			state.message = "";
			state.data = {};
			state.pagination = {};
			state.count = {};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchApprovals.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchApprovals.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
			state.data = action.payload.data;
			state.pagination = action.payload.pagination;
			state.count = action.payload.count;
		});
		builder.addCase(fetchApprovals.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const fetchApprovalsSelector = (state) => state.fetchApprovals;
export const { clearFetchApprovalsState } = fetchApprovalsSlice.actions;
export const fetchApprovalsReducer = fetchApprovalsSlice.reducer;
