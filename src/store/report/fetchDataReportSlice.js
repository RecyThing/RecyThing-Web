import { APIDataReporting } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: {},
};

export const fetchDataReport = createAsyncThunk("GET /admins/manage/reports/id", APIDataReporting.getDataReporting);

export const fetchDataReportSlice = createSlice({
	name: "fetchDataReport",
	initialState,
	reducers: {
		clearDataReportState: (state) => {
			state.status = "idle";
			state.message = "";
			state.data = {};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchDataReport.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchDataReport.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
			state.data = action.payload.data;
		});
		builder.addCase(fetchDataReport.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const fetchDataReportSelector = (state) => state.fetchDataReport;
export const { clearDataReportState } = fetchDataReportSlice.actions;
export const fetchDataReportReducer = fetchDataReportSlice.reducer;
