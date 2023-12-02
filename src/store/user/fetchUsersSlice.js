import { APIUser } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: [],
	pagination: {},
	count_data: 0,
};

export const fetchUsers = createAsyncThunk(
	"GET /admins/manage/users",
	APIUser.getUsers
);

export const fetchUsersSlice = createSlice({
	name: "fetchUsers",
	initialState,
	reducers: {
		clearFetchUsersState: (state) => {
			state.status = "idle";
			state.message = "";
			state.data = [];
			state.pagination = {};
			state.count_data = 0;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUsers.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
			state.data = action.payload.data;
			state.pagination = action.payload.pagination;
			state.count_data = action.payload.count_data;
		});
		builder.addCase(fetchUsers.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const fetchUsersSelector = (state) => state.fetchUsers;
export const { clearFetchUsersState } = fetchUsersSlice.actions;
export const fetchUsersReducer = fetchUsersSlice.reducer;
