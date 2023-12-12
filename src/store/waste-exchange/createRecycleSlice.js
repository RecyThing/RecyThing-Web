import { APIRecycles } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  message: "",
};

export const createRecycles = createAsyncThunk(
  "POST /admins/manage/recycles",
  async (data) => {
    try {
      const response = await APIRecycles.createRecycles(data);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error creating recycles:", error);
      throw error;
    }
  }
);

export const createRecyclesSlice = createSlice({
  name: "createRecycles",
  initialState,
  reducers: {
    clearCreateRecyclesState: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createRecycles.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createRecycles.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
    });
    builder.addCase(createRecycles.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.error.message;
    });
  },
});

export const createRecyclesSelector = (state) => state.createRecycles;
export const { clearCreateRecyclesState } = createRecyclesSlice.actions;
export const createRecyclesReducer = createRecyclesSlice.reducer;
