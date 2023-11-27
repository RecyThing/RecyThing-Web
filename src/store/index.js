import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./auth";
import { deleteUserReducer, fetchUserReducer, fetchUsersReducer } from "./user";
import {
	fetchVoucherReducer,
	fetchVouchersReducer,
	updateVoucherReducer,
} from "./voucher";

export const store = configureStore({
	reducer: {
		auth: loginReducer,

		fetchUsers: fetchUsersReducer,
		fetchUser: fetchUserReducer,
		deleteUser: deleteUserReducer,

		fetchVouchers: fetchVouchersReducer,
		fetchVoucher: fetchVoucherReducer,
		updateVoucher: updateVoucherReducer,
	},
});
