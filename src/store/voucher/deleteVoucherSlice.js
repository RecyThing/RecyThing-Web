import { APIVoucher } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
};

export const deleteVoucher = createAsyncThunk(
	"DELETE /admins/manage/vouchers/id",
	APIVoucher.deleteVoucher
);

export const deleteVoucherSlice = createSlice({
	name: "deleteVoucher",
	initialState,
	reducers: {
		clearDeleteVoucherState: (state) => {
			state.status = "idle";
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(deleteVoucher.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(deleteVoucher.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
		});
		builder.addCase(deleteVoucher.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const deleteVoucherSelector = (state) => state.deleteVoucher;
export const { clearDeleteVoucherState } = deleteVoucherSlice.actions;
export const deleteVoucherReducer = deleteVoucherSlice.reducer;
