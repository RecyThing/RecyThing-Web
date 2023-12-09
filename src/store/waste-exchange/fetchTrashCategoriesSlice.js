// fetchCategoriesSlice.js

import { APIRecycles } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  status: "idle",
  message: "",
  categories: [],
};

export const fetchCategories = createAsyncThunk(
  "GET /admins/manage/trashes/categories",
  APIRecycles.getCategories
);

export const fetchCategoriesSlice = createSlice({
  name: "fetchCategories",
  initialState,
  reducers: {
    clearFetchCategoriesState: (state) => {
      state.status = "idle";
      state.message = "";
      state.categories = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.categories = action.payload.categories;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.error.message;
    });
  },
});

export const selectFetchCategories = (state) => state.fetchCategories;

// Memoized selector using reselect
export const selectFetchCategoriesState = createSelector(
  [selectFetchCategories],
  (fetchCategoriesState) => fetchCategoriesState || { status: 'idle', categories: [] }
);

export const { clearFetchCategoriesState } = fetchCategoriesSlice.actions;
export const fetchCategoriesReducer = fetchCategoriesSlice.reducer;