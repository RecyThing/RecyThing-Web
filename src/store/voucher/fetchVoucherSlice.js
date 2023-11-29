import { APIVoucher } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: [],
};

export const fetchVoucher = createAsyncThunk(
	"GET /admins/manage/vouchers/id",
	APIVoucher.getVoucher
);

export const fetchVoucherSlice = createSlice({
	name: "fetchVoucher",
	initialState,
	reducers: {
		clearFetchVoucherState: (state) => {
			state.status = "idle";
			state.message = "";
			state.data = {};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchVoucher.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchVoucher.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
			state.data = action.payload.data;
		});
		builder.addCase(fetchVoucher.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const fetchVoucherSelector = (state) => state.fetchVoucher;
export const { clearFetchVoucherState } = fetchVoucherSlice.actions;
export const fetchVoucherReducer = fetchVoucherSlice.reducer;
