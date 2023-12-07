// createPromptSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIPrompt } from "@/apis";

const initialState = {
  status: "idle",
  message: "",
};

export const createPrompt = createAsyncThunk(
  "POST /admins/manage/prompts",
  async (promptData) => {
    const response = await APIPrompt.createPrompt(promptData);
    return response;
  }
);

export const createPromptSlice = createSlice({
  name: "createPrompt",
  initialState,
  reducers: {
    clearCreatePromptState: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPrompt.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createPrompt.fulfilled, (state, action) => {
      console.log(action.payload);
      const { data, message } = action.payload;
      state.status = "success";
      state.message = message;
    });
    builder.addCase(createPrompt.rejected, (state, action) => {
      console.error(action.error);
      state.status = "failed";
      state.message = action.error.message;
    });
  },
});

export const createPromptSelector = (state) => state.createPrompt;
export const { clearCreatePromptState } = createPromptSlice.actions;
export const createPromptReducer = createPromptSlice.reducer;
