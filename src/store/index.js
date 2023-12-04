import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./auth";
import { deleteUserReducer, fetchUserReducer, fetchUsersReducer } from "./user";
import {
	createVoucherReducer,
	deleteVoucherReducer,
	fetchVoucherReducer,
	fetchVouchersReducer,
	updateVoucherReducer,
} from "./voucher";
import { fetchAchievementsReducer } from "@/store/achievements";
import { patchAchievementsReducer } from '@/store/achievements';

export const store = configureStore({
	reducer: {
		auth: loginReducer,

		fetchUsers: fetchUsersReducer,
		fetchUser: fetchUserReducer,
		deleteUser: deleteUserReducer,

		fetchAchievements: fetchAchievementsReducer,
		patchAchievements: patchAchievementsReducer,

		fetchVouchers: fetchVouchersReducer,
		fetchVoucher: fetchVoucherReducer,
		updateVoucher: updateVoucherReducer,
		deleteVoucher: deleteVoucherReducer,
		createVoucher: createVoucherReducer,
	},
});
