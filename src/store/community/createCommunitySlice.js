import { APICommunity } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
};

export const createCommunity = createAsyncThunk(
	"POST /admins/manage/communities",
	APICommunity.createCommunity
);

export const createCommunitySlice = createSlice({
	name: "createCommunity",
	initialState,
	reducers: {
		clearCreateCommunityState: (state) => {
			state.status = "idle";
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(createCommunity.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(createCommunity.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
		});
		builder.addCase(createCommunity.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const createCommunitySelector = (state) => state.createCommunity;
export const { clearCreateCommunityState } = createCommunitySlice.actions;
export const createCommunityReducer = createCommunitySlice.reducer;
