import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APITransaksiReward } from "../../apis/APITransaksiReward";

export const fetchGetDaftarTransaksis = createAsyncThunk(
    "fetch/getDaftarTransaksis",
    APITransaksiReward.getTransaksis
);

const initialState = {
    message :"",
    status: "idle",
	data: null,
};

const daftarTransaksis = createSlice({
    name:"daftartransaksis",
    initialState,
    extraReducers: (builder) => {
		builder.addCase("fetch/getDaftarTransaksis/pending", (state) => {
			state.status = "loading";
			state.message = "";
		});

		builder.addCase("fetch/getDaftarTransaksis/fulfilled", (state, { payload }) => {
			state.status = "success";
			state.data = payload;
		});

		builder.addCase("fetch/getDaftarTransaksis/rejected", (state, { error }) => {
			state.status = "failed";
			state.message = error.stack;
		});
	},
})