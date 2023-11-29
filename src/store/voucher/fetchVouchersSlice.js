import { APIVoucher } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: {},
	pagination: {},
	count_data: 0,
};

export const fetchVouchers = createAsyncThunk(
	"GET /admins/manage/vouchers",
	APIVoucher.getVouchers
);

export const fetchVouchersSlice = createSlice({
	name: "fetchVouchers",
	initialState,
	reducers: {
		clearFetchVouchersState: (state) => {
			state.status = "idle";
			state.message = "";
			state.data = {};
			state.pagination = {};
			state.count_data = 0;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchVouchers.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchVouchers.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
			state.data = action.payload.data;
			state.pagination = action.payload.pagination;
			state.count_data = action.payload.count_data;
		});
		builder.addCase(fetchVouchers.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const fetchVouchersSelector = (state) => state.fetchVouchers;
export const { clearFetchVouchersState } = fetchVouchersSlice.actions;
export const fetchVouchersReducer = fetchVouchersSlice.reducer;
