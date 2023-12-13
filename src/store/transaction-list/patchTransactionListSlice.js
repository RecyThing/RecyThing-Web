import { APITransactionList } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
};

export const patchDataTransaction = createAsyncThunk(
	"PATCH /admins/manage/vouchers/id",
	APITransactionList.patchTransactionList
);

export const patchDataTransactionSlice = createSlice({
	name: "patchDataTransaction",
	initialState,
	reducers: {
		clearPatchDataTransactionState: (state) => {
			state.status = "idle";
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(patchDataTransaction.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(patchDataTransaction.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
		});
		builder.addCase(patchDataTransaction.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const patchDataTransactionSelector = (state) => state.patchDataTransaction;
export const { clearPatchDataTransactionState } = patchDataTransactionSlice.actions;
export const patchDataTransactionReducer = patchDataTransactionSlice.reducer;