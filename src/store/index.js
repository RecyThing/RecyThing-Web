import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./auth";
import { deleteUserReducer, fetchUserReducer, fetchUsersReducer } from "./user";

export const store = configureStore({
	reducer: {
		auth: loginReducer,
		fetchUsers: fetchUsersReducer,
		fetchUser: fetchUserReducer,
		deleteUser: deleteUserReducer,
	},
});
