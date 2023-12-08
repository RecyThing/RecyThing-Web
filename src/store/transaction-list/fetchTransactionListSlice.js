import { APITransactionList } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: {},
};

export const fetchDataTransaction = createAsyncThunk(
	"GET /admins/manage/exchange-point/id",
	APITransactionList.getTransactionList
);

export const fetchDataTransactionSlice = createSlice({
	name: "fetchDataTransaction",
	initialState,
	reducers: {
		clearfetchDataTransactionState: (state) => {
			state.status = "idle";
			state.message = "";
			state.data = {};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchDataTransaction.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchDataTransaction.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
			state.data = action.payload.data;
		});
		builder.addCase(fetchDataTransaction.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const fetchDataTransactionSelector = (state) => state.fetchDataTransaction;
export const { clearDataTransactionState } = fetchDataTransactionSlice.actions;
export const fetchDataTransactionReducer = fetchDataTransactionSlice.reducer;
