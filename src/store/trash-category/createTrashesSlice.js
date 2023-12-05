import { APITrashes } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  message: "",
};

export const createTrashes = createAsyncThunk(
  "POST /admins/manage/trashes",
  APITrashes.createTrashes
);

export const createTrashesSlice = createSlice({
  name: "createTrashes",
  initialState,
  reducers: {
    clearCreateTrashesState: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTrashes.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createTrashes.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
    });
    builder.addCase(createTrashes.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.error.message;
    });
  },
});

export const createTrashesSelector = (state) => state.createTrashes;
export const { clearCreateTrashesState } = createTrashesSlice.actions;
export const createTrashesReducer = createTrashesSlice.reducer;
