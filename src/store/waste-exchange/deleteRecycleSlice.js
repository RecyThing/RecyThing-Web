import { APIRecycles } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  message: "",
};

export const deleteRecycles = createAsyncThunk(
  "DELETE /admins/manage/recycles/id",
  APIRecycles.deleteRecycles
);

export const deleteRecyclesSlice = createSlice({
  name: "deleteRecycles",
  initialState,
  reducers: {
    clearDeleteRecyclesState: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteRecycles.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteRecycles.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
    });
    builder.addCase(deleteRecycles.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.error.message;
    });
  },
});

export const deleteRecyclesSelector = (state) => state.deleteRecycles;
export const { clearDeleteRecyclesState } = deleteRecyclesSlice.actions;
export const deleteRecyclesReducer = deleteRecyclesSlice.reducer;
