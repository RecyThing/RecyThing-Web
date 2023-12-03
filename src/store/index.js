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
import { fetchDataReportReducer, fetchDataReportsReducer } from "./report";

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

		fetchDataReports:fetchDataReportsReducer,
		fetchDataReport:fetchDataReportReducer,
	},
});
