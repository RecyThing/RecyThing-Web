import { APIVoucher } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
};

export const updateVoucher = createAsyncThunk(
	"PUT /admins/manage/vouchers/id",
	APIVoucher.updateVoucher
);

export const updateVoucherSlice = createSlice({
	name: "updateVoucher",
	initialState,
	reducers: {
		clearUpdateVoucherState: (state) => {
			state.status = "idle";
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(updateVoucher.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(updateVoucher.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
		});
		builder.addCase(updateVoucher.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const updateVoucherSelector = (state) => state.updateVoucher;
export const { clearUpdateVoucherState } = updateVoucherSlice.actions;
export const updateVoucherReducer = updateVoucherSlice.reducer;
