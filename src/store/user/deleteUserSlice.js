import { APIUser } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: {},
};

export const deleteUser = createAsyncThunk(
	"DELETE /admins/manage/users/id",
	APIUser.deleteUser
);

export const deleteUserSlice = createSlice({
	name: "deleteUser",
	initialState,
	reducers: {
		clearDeleteUserState: (state) => {
			state.status = "idle";
			state.message = "";
			state.data = {};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(deleteUser.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(deleteUser.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
			state.data = action.payload.data;
		});
		builder.addCase(deleteUser.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const deleteUserSelector = (state) => state.deleteUser;
export const { clearDeleteUserState } = deleteUserSlice.actions;
export const deleteUserReducer = deleteUserSlice.reducer;
