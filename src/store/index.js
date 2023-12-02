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
import {
	createPromptReducer,
	deletePromptReducer,
	fetchPromptReducer,
	fetchPromptsReducer,
	updatePromptReducer,
} from "./prompt";

export const store = configureStore({
	reducer: {
		auth: loginReducer,

		fetchUsers: fetchUsersReducer,
		fetchUser: fetchUserReducer,
		deleteUser: deleteUserReducer,

		fetchVouchers: fetchVouchersReducer,
		fetchVoucher: fetchVoucherReducer,
		updateVoucher: updateVoucherReducer,
		deleteVoucher: deleteVoucherReducer,
		createVoucher: createVoucherReducer,

		fetchPrompts: fetchPromptsReducer,
		fetchPrompt: fetchPromptReducer,
		updatePrompt: updatePromptReducer,
		deletePrompt: deletePromptReducer,
		createPrompt: createPromptReducer,
	},
});
