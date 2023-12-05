import { APIDataReporting } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: [],
	pagination: {},
	count: {},
};

export const fetchDataReports = createAsyncThunk(
	"GET /admins/manage/reports",
	APIDataReporting.getDatasRepoting
);

export const fetchDataReportsSlice = createSlice({
	name: "fetchDataReports",
	initialState,
	reducers: {
		clearDataReportsState: (state) => {
			state.status = "idle";
			state.message = "";
			state.data = [];
			state.pagination = {};
			state.count = {};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchDataReports.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchDataReports.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
			state.data = action.payload.data;
			state.pagination = action.payload.pagination;
			state.count = action.payload.count;
		});
		builder.addCase(fetchDataReports.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const fetchDataReportsSelector = (state) => state.fetchDataReports;
export const { clearDataReportsState } = fetchDataReportsSlice.actions;
export const fetchDataReportsReducer = fetchDataReportsSlice.reducer;
