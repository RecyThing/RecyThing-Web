import { APICommunity } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
};

export const deleteCommunity = createAsyncThunk(
	"DELETE /admins/manage/community/id",
	APICommunity.deleteCommunity
);

export const deleteCommunitySlice = createSlice({
	name: "deleteCommunity",
	initialState,
	reducers: {
		clearDeleteCommunityState: (state) => {
			state.status = "idle";
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(deleteCommunity.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(deleteCommunity.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
		});
		builder.addCase(deleteCommunity.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const deleteCommunitySelector = (state) => state.deleteCommunity;
export const { clearDeleteCommunityState } = deleteCommunitySlice.actions;
export const deleteCommunityReducer = deleteCommunitySlice.reducer;
