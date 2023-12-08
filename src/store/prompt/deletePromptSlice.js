import { APIPrompt } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
};

export const deletePrompt = createAsyncThunk(
	"DELETE /admins/manage/Prompts/id",
	APIPrompt.deletePrompt
);

export const deletePromptSlice = createSlice({
	name: "deletePrompt",
	initialState,
	reducers: {
		clearDeletePromptState: (state) => {
			state.status = "idle";
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(deletePrompt.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(deletePrompt.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
		});
		builder.addCase(deletePrompt.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const deletePromptSelector = (state) => state.deletePrompt;
export const { clearDeletePromptState } = deletePromptSlice.actions;
export const deletePromptReducer = deletePromptSlice.reducer;
