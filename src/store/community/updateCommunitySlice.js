import { APICommunity } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
};

export const updateCommunity = createAsyncThunk(
	"PUT /admins/manage/community/id",
	APICommunity.updateCommunity
);

export const updateCommunitySlice = createSlice({
	name: "updateCommunity",
	initialState,
	reducers: {
		clearUpdateCommunityState: (state) => {
			state.status = "idle";
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(updateCommunity.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(updateCommunity.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
		});
		builder.addCase(updateCommunity.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const updateCommunitySelector = (state) => state.updateCommunity;
export const { clearUpdateCommunityState } = updateCommunitySlice.actions;
export const updateCommunityReducer = updateCommunitySlice.reducer;
