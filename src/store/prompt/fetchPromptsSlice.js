import { APIPrompt } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ini kalo udah dibenerin response bodynya dari BE sesuaiin lagi ya @Putri-R
const initialState = {
	status: "idle",
	message: "",
	data: {},
	pagination: {},
	count_data: 0,
};

export const fetchPrompts = createAsyncThunk(
	"GET /admins/manage/prompts",
	APIPrompt.getPrompts
);

export const fetchPromptsSlice = createSlice({
	name: "fetchPrompts",
	initialState,
	reducers: {
		clearFetchPromptsState: (state) => {
			state.status = "idle";
			state.message = "";
			state.data = {};
			state.pagination = {};
			state.count_data = 0;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPrompts.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchPrompts.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
			state.data = action.payload.data;
			state.pagination = action.payload.pagination;
			state.count_data = action.payload.count_data;
		});
		builder.addCase(fetchPrompts.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const fetchPromptsSelector = (state) => state.fetchPrompts;
export const { clearFetchPromptsState } = fetchPromptsSlice.actions;
export const fetchPromptsReducer = fetchPromptsSlice.reducer;