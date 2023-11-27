import { APIAuth } from "@/apis/APILogin";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: {},
};

export const adminLogin = createAsyncThunk("/admins/login", APIAuth.login);

export const loginSlice = createSlice({
	name: "adminLogin",
	initialState,
	reducers: {
		clearAuthState: (state) => {
			state.status = "idle";
			state.message = "";
			state.data = {};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(adminLogin.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(adminLogin.fulfilled, (state, action) => {
			state.status = "success";
			state.message = action.payload.message;
			state.data = action.payload.data;
		});
		builder.addCase(adminLogin.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
	},
});

export const adminLoginSelector = (state) => state.auth;
export const { clearAuthState } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
