import { APIPrompt } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: {},
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
