import { APIRecycles } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: {},
};

export const fetchRecycle = createAsyncThunk(
	"GET /admins/manage/recycles/id",
	APIRecycles.getRecycle
);

export const fetchRecycleSlice = createSlice({
	name: "fetchRecycle",
	initialState,
	reducers: {
		clearFetchRecycleState: (state) => {
			state.status = "idle";
			state.message = "";
			state.data = {};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchRecycle.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchRecycle.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
			state.data = action.payload.data;
		});
		builder.addCase(fetchRecycle.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const fetchRecycleSelector = (state) => state.fetchRecycle;
export const { clearFetchRecycleState } = fetchRecycleSlice.actions;
export const fetchRecycleReducer = fetchRecycleSlice.reducer;
