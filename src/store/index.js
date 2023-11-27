import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./auth";

export const store = configureStore({
	reducer: {
		auth: loginReducer,
	},
});
