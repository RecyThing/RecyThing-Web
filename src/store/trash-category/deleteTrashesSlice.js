import { APITrashes } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  message: "",
};

export const deleteTrashes = createAsyncThunk(
  "DELETE /admins/manage/trashes/id",
  APITrashes.deleteTrashes
);

export const deleteTrashesSlice = createSlice({
  name: "deleteTrashes",
  initialState,
  reducers: {
    clearDeleteTrashesState: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteTrashes.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteTrashes.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
    });
    builder.addCase(deleteTrashes.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.error.message;
    });
  },
});

export const deleteTrashesSelector = (state) => state.deleteTrashes;
export const { clearDeleteTrashesState } = deleteTrashesSlice.actions;
export const deleteTrashesReducer = deleteTrashesSlice.reducer;
