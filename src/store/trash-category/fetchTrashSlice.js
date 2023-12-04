import { APITrashes } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: {},
};

export const fetchTrash = createAsyncThunk(
	"GET /admins/manage/trashes/id",
	APITrashes.getTrash
);

export const fetchTrashSlice = createSlice({
	name: "fetchTrash",
	initialState,
	reducers: {
		clearFetchTrashState: (state) => {
			state.status = "idle";
			state.message = "";
			state.data = {};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchTrash.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchTrash.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
			state.data = action.payload.data;
		});
		builder.addCase(fetchTrash.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const fetchTrashSelector = (state) => state.fetchTrash;
export const { clearFetchTrashState } = fetchTrashSlice.actions;
export const fetchTrashReducer = fetchTrashSlice.reducer;
