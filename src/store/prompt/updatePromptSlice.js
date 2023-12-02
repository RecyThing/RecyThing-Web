import { APIPrompt } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
};

export const updatePrompt = createAsyncThunk(
	"PUT /admins/manage/Prompts/id",
	APIPrompt.updatePrompt
);

export const updatePromptSlice = createSlice({
	name: "updatePrompt",
	initialState,
	reducers: {
		clearUpdatePromptState: (state) => {
			state.status = "idle";
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(updatePrompt.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(updatePrompt.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
		});
		builder.addCase(updatePrompt.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const updatePromptSelector = (state) => state.updatePrompt;
export const { clearUpdatePromptState } = updatePromptSlice.actions;
export const updatePromptReducer = updatePromptSlice.reducer;
