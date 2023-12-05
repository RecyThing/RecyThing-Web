import { APIDataReporting } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
};

export const patchDataReport = createAsyncThunk(
	"PATCH /admins/manage/vouchers/id",
	APIDataReporting.patchDataReporting
);

export const patchDataReportSlice = createSlice({
	name: "patchDataReport",
	initialState,
	reducers: {
		clearPatchDataReportState: (state) => {
			state.status = "idle";
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(patchDataReport.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(patchDataReport.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
		});
		builder.addCase(patchDataReport.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const patchDataReportSelector = (state) => state.patchDataReport;
export const { clearPatchDataReportState } = patchDataReportSlice.actions;
export const patchDataReportReducer = patchDataReportSlice.reducer;