import { APITransactionList } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: [],
	pagination: {},
	count: {},
};

export const fetchDatasTransaction = createAsyncThunk(
	"GET /admins/manage/exchange-point",
	APITransactionList.getTransactionsList
);

export const fetchDatasTransactionSlice = createSlice({
	name: "fetchDatasTransaction",
	initialState,
	reducers: {
		clearDatasTransactionState: (state) => {
			state.status = "idle";
			state.message = "";
			state.data = [];
			state.pagination = {};
			state.count = {};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchDatasTransaction.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchDatasTransaction.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
			state.data = action.payload.data;
			state.pagination = action.payload.pagination;
			state.count = action.payload.count;
		});
		builder.addCase(fetchDatasTransaction.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const fetchDatasTransactionSelector = (state) => state.fetchDatasTransaction;
export const { clearDatasTransactionState } = fetchDatasTransactionSlice.actions;
export const fetchDatasTransactionReducer = fetchDatasTransactionSlice.reducer;
