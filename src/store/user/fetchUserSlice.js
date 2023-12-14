import { APIUser } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: {},
};
export const fetchUser = createAsyncThunk("GET /admins/manage/users/id", APIUser.getUser);
export const fetchUserSlice = createSlice({
	name: "fetchUser",
	initialState,
	reducers: {
		clearFetchUserState: (state) => {
			state.status = "idle";
			state.message = "";
			state.data = {};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUser.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
			state.data = action.payload.data;
		});
		builder.addCase(fetchUser.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const fetchUserSelector = (state) => state.fetchUser;
export const { clearFetchUserState } = fetchUserSlice.actions;
export const fetchUserReducer = fetchUserSlice.reducer;
