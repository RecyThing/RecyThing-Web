import { APIPrompt } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: [],
};

export const fetchPrompt = createAsyncThunk(
	"GET /admins/manage/Prompts/id",
	APIPrompt.getPrompt
);

export const fetchPromptSlice = createSlice({
	name: "fetchPrompt",
	initialState,
	reducers: {
		clearFetchPromptState: (state) => {
			state.status = "idle";
			state.message = "";
			state.data = {};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPrompt.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchPrompt.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
			state.data = action.payload.data;
		});
		builder.addCase(fetchPrompt.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const fetchPromptSelector = (state) => state.fetchPrompt;
export const { clearFetchPromptState } = fetchPromptSlice.actions;
export const fetchPromptReducer = fetchPromptSlice.reducer;
