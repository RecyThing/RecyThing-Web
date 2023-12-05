import { APITrashes } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  message: "",
};

export const updateTrashes = createAsyncThunk(
  "PUT /admins/manage/trashes/id",
  APITrashes.updateTrashes
);

export const updateTrashesSlice = createSlice({
  name: "updateTrashes",
  initialState,
  reducers: {
    clearUpdateTrashesState: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateTrashes.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateTrashes.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
    });
    builder.addCase(updateTrashes.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.error.message;
    });
  },
});

export const updateTrashesSelector = (state) => state.updateTrashes;
export const { clearUpdateTrashesState } = updateTrashesSlice.actions;
export const updateTrashesReducer = updateTrashesSlice.reducer;
