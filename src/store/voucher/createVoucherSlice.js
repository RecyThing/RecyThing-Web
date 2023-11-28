import { APIVoucher } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
};

export const createVoucher = createAsyncThunk(
	"POST /admins/manage/vouchers",
	APIVoucher.createVoucher
);

export const createVoucherSlice = createSlice({
	name: "createVoucher",
	initialState,
	reducers: {
		clearCreateVoucherState: (state) => {
			state.status = "idle";
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(createVoucher.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(createVoucher.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
		});
		builder.addCase(createVoucher.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const createVoucherSelector = (state) => state.createVoucher;
export const { clearCreateVoucherState } = createVoucherSlice.actions;
export const createVoucherReducer = createVoucherSlice.reducer;
